class User < ApplicationRecord
    has_many :reviews
    has_many :destinations, through: :reviews

    validates :username, presence: true
end
