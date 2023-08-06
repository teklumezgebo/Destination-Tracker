class Destination < ApplicationRecord
    has_many :reviews
    has_many :users, through: :reviews

    validate :city, presence: true
    validate :country, presence: true
    validate :image, presence: true
end
