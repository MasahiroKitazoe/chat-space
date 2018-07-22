class AddIndexToGroup < ActiveRecord::Migration[5.1]
  def change
    add_index :groups, :name
  end
end
