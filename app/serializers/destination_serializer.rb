class DestinationSerializer < ActiveModel::Serializer
  attributes :id, :city, :country, :image, :rating

  has_many :reviews
  has_many :users, through: :reviews
end
