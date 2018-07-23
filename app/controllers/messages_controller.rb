class MessagesController < ApplicationController
  before_action :set_group

  def index
    @messages = @group.messages.includes(:user)
    @message = Message.new
    @users = @group.users
  end

  def create
    @message = Message.new(message_params)
    if @message.save
      redirect_to :group_messages
    else
      flash[:alert] = "メッセージを入力してください"
      render action: :index
    end
  end

    private
      def message_params
        params.require(:message).permit(
          :body,
          :image,
          ).merge(user_id: current_user.id, group_id: params[:group_id])
      end

      def set_group
        @group = Group.find(params[:group_id])
      end
end
