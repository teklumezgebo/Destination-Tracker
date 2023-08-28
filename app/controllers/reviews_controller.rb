class ReviewsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :review_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :invalid_entity

    def index
        render json: Review.all, status: :ok
    end

    def show
        review = Review.find(params[:id])
        render json: review, status: :ok
    end

    def create
        user = User.find(session[:user_id])
        existing_review = user.reviews.find_by(destination_id: params[:destination_id])
        if existing_review
            render json: { error: "Destination Already Reviewed" }, status: :unauthorized
        else
            review = Review.create!(
                body: params[:body],
                rating: params[:rating],
                user_id: user.id,
                destination_id: params[:destination_id]
            )
            render json: review, status: :created
        end
    end

    def update
        user = User.find(session[:user_id])
        review = user.reviews.find_by(destination_id: params[:destination_id])
        if review.update(review_params)
            render json: review, status: :ok
        else 
            render json: { errors: review.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        user = User.find(session[:user_id])
        review = user.reviews.find(params[:id])
        review.destroy
        head :no_content
    end

    private

    def review_params
        params.permit(:body, :rating, :destination_id)
    end

    def review_not_found
        render json: { error: "Review not found" }, status: :not_found
    end
end
