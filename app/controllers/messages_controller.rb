class MessagesController < ApplicationController
  before_action :set_group

  def index
    @messages = @group.messages.includes(:user)
    if params[:lists_len].present?
      if @messages.length == params[:lists_len].to_i
        return @messages = []
      else
        @messages = select_added_elements(@messages, params[:lists_len].to_i)
      end
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

      def select_added_elements(current_messages, before_len)
        current_len = current_messages.length - 1
        before_len = before_len - 1
        added_amount = current_len - before_len
        if added_amount == 1
          added_messages << current_messages[-1]
        else
          (1..added_amount).each do |index|
            added_messages << current_messages[-index]
          end
        end
        return added_messages
      end
end
