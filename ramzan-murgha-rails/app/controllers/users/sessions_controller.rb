# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  # before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  def new
    resource = User.find_by(email: sign_in_params[:email])
    if resource
      render json: resource
    else
      render json: {
        resource: nil,
        error: 'You have entered an invalid email or password'
      }
    end
  end

  # POST /resource/sign_in
  # def create
  #   super
  # end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  private
  def sign_in_params
    params.permit(:email, :password)
  end

  protected

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_in_params
    devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  end
end
