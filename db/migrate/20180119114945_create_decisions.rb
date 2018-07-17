class CreateDecisions < ActiveRecord::Migration[5.2]
  def change
    create_table :decisions do |t|
      t.text :question_html
      t.text :question_text
      t.string :options, array: true
      t.integer :question_type
      t.references :user, foreign_key: true, index: true
      t.date :deadline
      t.string :slug

      t.timestamps
    end
    add_index :decisions, :options, using: 'gin'
    add_index :decisions, :slug, unique: true
  end
end
