class UserSerializer < ActiveModel::Serializer
  attributes :id, :username

  has_many :destinations
  has_many :reviews
end
