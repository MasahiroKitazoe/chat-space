FactoryGirl.define do
  factory :message do
    body Faker::Lorem.sentence
    image File.open("#{Rails.root}/public/images/groot.jpg")
    user_id 1
    group_id 1
  end
end
