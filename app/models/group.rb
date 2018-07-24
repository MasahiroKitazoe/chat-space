class Group < ApplicationRecord
  has_many :members
  has_many :users, through: :members
  has_many :messages

  validates :name, presence: true
  # validate :validate_members

  # def validate_members
  #   errors.add(:members, 'を1人以上選択してください') if members.size.zero?
  # end

  def show_last_message
    if (last_message = messages.last).present?
      last_message.body? ? last_message.body : "画像が投稿されています"
    else
      "まだメッセージがありません"
    end
  end

  def show_group_member
    names = users.map { |user| user.name }
    names.join(", ")
  end
end
