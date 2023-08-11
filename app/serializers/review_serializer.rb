class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :body, :rating

  belongs_to :user
  belongs_to :destination
end
