class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :body, :rating

  belongs_to :user
  belongs_to :destination

  attribute :destination_city, key: :city
  attribute :destination_country, key: :country
  attribute :user_username, key: :user

  def destination_city
    object.destination.city
  end

  def destination_country
    object.destination.country
  end

  def user_username
    object.user.username
  end

end
