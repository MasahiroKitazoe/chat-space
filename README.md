# README

## テーブル設計

### usersテーブル

|Column|Type|Options|
|------|----|-------|
|email|string|null: false, unique: true|
|name|string|null: false, unique: true|

#### Association
- has_many :groups, through: :members
- has_many :members
- has_many :messages

### gropusテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

#### Association
- has_many :users, through: :members
- has_many :members
- has_many :messages

### membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

#### Association
- belongs_to :group
- belongs_to :user

### messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

#### Association
- belongs_to :user
- belongs_tp: group
