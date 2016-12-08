Rails.application.routes.draw do
  scope '/api' do
    resources :categories
  end
end
