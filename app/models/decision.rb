class Decision < ApplicationRecord
  enum type: { anonymous_question: 0, public_question: 1 }

  Gutentag::ActiveRecord.call self

  extend FriendlyId
  friendly_id :question_text, use: :slugged

  belongs_to :user, optional: true
  has_many :answers

end
