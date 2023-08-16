class ReviewsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :review_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :invalid_review

    def index
        render json: Review.all, status: :ok
    end

    def show
        review = Review.find(params[:id])
        render json: review, status: :ok
    end

    def create
        existing_review = Review.find_by(user_id: params[:user_id], destination_id: params[:destination_id])
        if existing_review
            render json: { error: "Destination Already Reviewed" }, status: :unauthorized
        else
            review = Review.create!(review_params)
            render json: review, status: :created
        end
    end

    def update
        review = Review.find(params[:id])
        review.update(review_params)
        render json: review, status: :ok
    end

    def destroy
        review = Review.find(params[:id])
        review.destroy
        head :no_content
    end

    private

    def review_params
        params.permit(:body, :rating, :destination_id, :user_id)
    end

    def review_not_found
        render json: { error: "Review not found" }, status: :not_found
    end

    def invalid_review(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

end
