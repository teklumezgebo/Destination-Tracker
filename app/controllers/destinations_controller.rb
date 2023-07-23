class DestinationsController < ApplicationController
rescue_from ActiveRecord::RecordNotFound, with: :destination_not_found
rescue_from ActiveRecord::RecordInvalid, with: :invalid_destination

    def index
        render json: Destinations.all, status: :ok
    end

    def show
        destination = Destination.find(params[:id])
        redner json: destination, status: :ok
    end

    def create
        destination = Destination.create!(destination_params)
        render json: destination, status: :created
    end

    private

    def destination_params
        params.permit(:city, :country, :image)
    end

    def destination_not_found
        render json: { error: "Destination not found" }, status: :not_found
    end

    def invalid_destination(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

end
