class User < ApplicationRecord
    has_many :reviews
    has_many :destinations, through: :reviews
end
