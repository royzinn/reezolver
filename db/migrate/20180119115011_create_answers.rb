class CreateAnswers < ActiveRecord::Migration[5.2]
  def change
    create_table :answers do |t|
      t.text :content
      t.references :decision, foreign_key: true, index: true
      t.references :user, foreign_key: true, index: true
      t.string :answer_option

      t.timestamps
    end
    add_index :answers, :answer_option
  end
end
