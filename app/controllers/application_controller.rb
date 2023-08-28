class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :authorized
  
  def authorized
    return render json: { error: "Not Authorized" }, status: :unauthorized unless session.include? :user_id
  end

  def invalid_entity(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

end
