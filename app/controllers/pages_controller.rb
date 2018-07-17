class PagesController < ApplicationController
  def home
    @decisions = Decision.includes(:user, answers: [:user]).all
  end
end
