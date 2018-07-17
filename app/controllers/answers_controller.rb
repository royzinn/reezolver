class AnswersController < ApplicationController
  def create
    answer = Answer.create user: current_user, decision_id: params[:decision_id], content: params[:content], answer_option: params[:answer_option]
    render json: { answer: answer }
  end
end
