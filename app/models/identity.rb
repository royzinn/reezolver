class Identity < ApplicationRecord
  belongs_to :user
  validates_presence_of :uid, :provider
  validates_uniqueness_of :uid, scope: :provider

  def self.find_for_oauth(auth)
    create_with(name: auth.extra.raw_info.name).find_or_create_by(uid: auth.uid, provider: auth.provider)
  end
end
