require 'rails_helper'
describe Message do
  describe "#create" do
    context 'can save' do
      it "is valid with a body" do
        expect(build(:message, image: nil)).to be_valid
      end

      it "is valid with an image" do
        expect(build(:message, body: nil)).to be_valid
      end

      it "is valid with both body and image" do
        expect(build(:message)).to be_valid
      end
    end

    context 'can save' do
      it "is invalid without both body and image" do
        message = build(:message, body: nil, image: nil)
        message.valid?
        expect(message.errors[:body]).to include("を入力してください")
      end

      it "is invalid without group_id" do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group_id]).to include("を入力してください")
      end

      it "is invalid without user_id" do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user_id]).to include("を入力してください")
      end
    end
  end
end
