class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :user_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :invalid_user
    skip_before_action :authorized, only: :create

    def index
        render json: User.all, status: :ok
    end

    def show
        user = User.find_by(id: session[:user_id])
        if user
            render json: user, status: :ok
        else
            render json: { error: "Not Authorized" }, status: :unauthorized
        end
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    private

    def user_params
        params.permit(:username, :password)
    end

    def user_not_found
        render json: { error: "User not found" }, status: :not_found 
    end

    def invalid_user(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

end
