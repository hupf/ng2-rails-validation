class CategoriesController < ApplicationController
  def index
    categories = Category.order('created_at DESC')
    render json: categories
  end

  def show
    category = Category.find(params[:id])
    render json: category
  end

  def create
    category = Category.new(category_params)

    if category.save
      render json: category
    else
      render json: category.errors.details, status: :unprocessable_entity
    end
  end

  def update
    category = Category.find(params[:id])

    if category.update(category_params)
      render json: category
    else
      render json: category.errors.details, status: :unprocessable_entity
    end
  end

  def destroy
    category = Category.find(params[:id])
    category.destroy
  end

  private

  def category_params
    params.require(:category).permit(:name, :description)
  end
end
