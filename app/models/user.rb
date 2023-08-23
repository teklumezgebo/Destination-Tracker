class User < ApplicationRecord
    has_secure_password
    has_many :reviews
    has_many :destinations, through: :reviews

    validates :username, presence: true
    validates :username, uniqueness: true
end
