class Review < ApplicationRecord
    belongs_to :user
    belongs_to :destination

    validate :body, presence: :true
end
