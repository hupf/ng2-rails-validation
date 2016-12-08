class Category < ApplicationRecord
  validates :name, presence: true,
                   length: { maximum: 10 },
                   uniqueness: true
end
