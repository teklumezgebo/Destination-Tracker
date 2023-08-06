class User < ApplicationRecord
    has_many :reviews
    has_many :destinations, through: :reviews
    has_secure_password

    validates :username, presence: true
end
