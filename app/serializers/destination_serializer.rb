class DestinationSerializer < ActiveModel::Serializer
  attributes :id, :city, :country, :image

  has_many :reviews
  has_many :users, through: :reviews
end
