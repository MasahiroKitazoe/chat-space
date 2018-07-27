class MessagesController < ApplicationController
  before_action :set_group

  def index
    @messages = @group.messages.includes(:user)
    if @messages.where('id > ?', params[:last_id]).present?
      @messages = @messages.where('id > ?', params[:last_id])
    elsif params[:last_id].present?
      @messages = []
    end
    @message = Message.new
    gon.group_id = @group.id
    respond_to do |format|
      format.html
      format.json
    end
  end

  def create
    @message = Message.create(message_params)
    respond_to do |format|
      format.html { redirect_to group_messages_path(params[:group_id])  }
      format.json
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
