class DestinationSerializer < ActiveModel::Serializer
  attributes :id, :city, :country, :image, :rating

  has_many :users
end
