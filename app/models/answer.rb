class Answer < ApplicationRecord
  belongs_to :decision
  belongs_to :user, optional: true
end
