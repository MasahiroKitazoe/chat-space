class GroupsController < ApplicationController

  def new
    @group = Group.new
    @users = User.all
  end

  def edit
    @group = Group.find(params[:id])
  end

  def create
    Group.create(group_params)
    redirect_to :root
  end

    private
    def group_params
      params.require(:group).permit(
        :name,
        { user_ids: [] }
        )
    end
end
