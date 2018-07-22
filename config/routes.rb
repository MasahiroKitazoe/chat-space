Rails.application.routes.draw do
  devise_for :users
  resources :users, only: [:edit, :update]
  resources :groups, except: [:show, :destroy] do
    resources :messages, only: [:index, :create]
  end
  root 'messages#index'
end
