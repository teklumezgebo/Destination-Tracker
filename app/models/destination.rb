class Destination < ApplicationRecord
    has_many :reviews
    has_many :users, through: :reviews

    validates :city, presence: true
    validates :country, presence: true
    validates :image, presence: true
end
