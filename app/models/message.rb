class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group

  mount_uploader :image, ImageUploader

  validates :body, presence: true, unless: :image?
  validates :group_id, :user_id, presence: true

  def self.format_posted_time(time)
    year = time.year
    mon  = time.month
    day  = time.day
    hour = time.hour
    min  = time.min

    bar = '-'

    if mon < 10
      mon = '0' + mon.to_s;
    end
    if day < 10
      day = '0' + day.to_s;
    end
    if hour < 10
      hour = '0' + hour.to_s;
    end
    if min < 10
      min = '0' + min.to_s;
    end

    return year.to_s + bar + mon.to_s + bar + day.to_s + ' ' + hour.to_s + ':' + min.to_s
  end
end
