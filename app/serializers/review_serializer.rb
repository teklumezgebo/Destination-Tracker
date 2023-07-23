class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :destination_id, :user_id, :body
end
