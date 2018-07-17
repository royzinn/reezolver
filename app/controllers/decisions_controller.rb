class DecisionsController < ApplicationController
  def show
    @decision = Decision.friendly.find params[:id]
  end

  def new
  end

  def create
    decision = Decision.new user: current_user, question_html: params[:question_html], options: params[:options], question_text: params[:question_text], deadline: params[:deadline]
    decision.tag_names = params[:tags]
    if decision.save
      render json: { decision: decision }
    else
      render json: { resp: 'something happened' }
    end
  end
end
