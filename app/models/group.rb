class Group < ApplicationRecord
  has_many :members
  has_many :users, through: :members

  validates :name, presence: true
  validate :validate_members

  def validate_members
    errors.add(:members, 'を1人以上選択してください') if members.size.zero?
  end
end
