class GroupsController < ApplicationController

  def new
    @group = Group.new
    @users = User.all
  end

  def edit
    @group = Group.find(params[:id])
  end

  def create
    if Group.create(group_params)
      flash[:notice] = "グループを作成しました"
      redirect_to :root
    else
      
  end

    private
    def group_params
      params.require(:group).permit(
        :name,
        { user_ids: [] }
        )
    end
end
