class GroupsController < ApplicationController

  def index
  end

  def new
    @group = Group.new
    @users = User.all
  end

  def edit
    @group = Group.find(params[:id])
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      save_success("グループを作成しました")
    else
      render action: :new
    end
  end

  def update
    @group = Group.find(params[:id])
    binding.pry
    if @group.update_attributes(group_params)
      save_success("グループ情報を更新しました")
    else
      render action: :edit
    end
  end

    private
      def group_params
        params.require(:group).permit(
          :name,
          { user_ids: [] }
          )
      end

      def save_success(message)
        flash[:notice] = message
        redirect_to :root
      end
end
