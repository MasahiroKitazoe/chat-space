class GroupsController < ApplicationController

  def new
    @group = Group.new
    @users = User.all
  end

  def edit
    @group = Group.find(params[:id])
  end
end
