class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :destination_id, :user_id, :body

  belongs_to :user
  belongs_to :destination
end
