class AlarmsController < ApplicationController
  before_action :set_alarm, only: [:show, :update, :destroy]
  before_action :set_user, only: [:index]

  # GET /alarms
  def index
    @alarms = @user.alarms
    render json: @alarms
  end

  # GET /alarms/1
  def show
    render json: @alarm
  end

  # POST /alarms
  def create
    @alarm = Alarm.new(alarm_params)

    if @alarm.save
      render json: @alarm, status: :created, location: @alarm
    else
      render json: @alarm.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /alarms/1
  def update
    if @alarm.update(alarmTime: alarm_params[:alarmTime].to_time())
      render json: @alarm, status: :ok
    else
      render json: @alarm.errors, status: :unprocessable_entity
    end
  end

  # DELETE /alarms/1
  def destroy
    @alarm.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_alarm
      @alarm = Alarm.find(params[:id])
    end

    def set_user
      @user = User.find(params[:user_id])
    end

    # Only allow a trusted parameter "white list" through.
    def alarm_params
      params.require(:alarm_params).permit(:id, :title, :user_id, :alarmTime)
    end
end
