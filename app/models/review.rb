class Review < ApplicationRecord
    belongs_to :user
    belongs_to :destination

    validates :body, presence: true
end
