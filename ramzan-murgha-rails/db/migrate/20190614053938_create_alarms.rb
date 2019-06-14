class CreateAlarms < ActiveRecord::Migration[5.2]
  def change
    create_table :alarms do |t|
      t.string :title
      t.datetime :alarmTime
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
