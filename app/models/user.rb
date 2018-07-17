class User < ApplicationRecord
  TEMP_EMAIL_PREFIX = 'change@me'
  TEMP_EMAIL_REGEX = /\Achange@me/

  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable

  has_many :identities, dependent: :destroy
  has_many :decisions, dependent: :nullify
  has_many :answers, dependent: :nullify

  validates_format_of :email, without: TEMP_EMAIL_REGEX, on: :update

  def self.find_for_oauth(auth, signed_in_resource = nil)
    identity = Identity.find_for_oauth(auth)
    user = signed_in_resource || identity.user || User.where(email: auth.info.email).first || create_from_oauth(auth)

    # for already logged-in users, adding an identity
    if identity.user != user
      identity.user = user
      identity.save!
    end
    user
  end

  def self.create_from_oauth(auth)
    byebug
    user = new(
      email: auth.info.email || "#{TEMP_EMAIL_PREFIX}-#{auth.uid}-#{auth.provider}.com",
      password: Devise.friendly_token[0,20],
      image_url: oauth_image(auth),
      first_name: oauth_first_name(auth),
      last_name: oauth_last_name(auth),
      nick_name: auth.info.name,
    )
    user.skip_confirmation!
    user.save!
    user
  end

  def self.oauth_image(auth)
    case auth.provider
    when 'facebook' then auth.info.image.gsub('http', 'https')
    when 'twitter' then auth.info.profile_image_url_https
    else '/assets/avatar'
    end
  end

  def self.oauth_first_name(auth)
    auth.info.name.split(' ').first
  end

  def self.oauth_last_name(auth)
    auth.info.name.split(' ').drop(1).join(' ')
  end

  def email_verified?
    self.email && self.email !~ TEMP_EMAIL_REGEX
  end
end
