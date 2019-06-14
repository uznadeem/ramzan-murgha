require 'test_helper'

class AlarmsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @alarm = alarms(:one)
  end

  test "should get index" do
    get alarms_url, as: :json
    assert_response :success
  end

  test "should create alarm" do
    assert_difference('Alarm.count') do
      post alarms_url, params: { alarm: {  } }, as: :json
    end

    assert_response 201
  end

  test "should show alarm" do
    get alarm_url(@alarm), as: :json
    assert_response :success
  end

  test "should update alarm" do
    patch alarm_url(@alarm), params: { alarm: {  } }, as: :json
    assert_response 200
  end

  test "should destroy alarm" do
    assert_difference('Alarm.count', -1) do
      delete alarm_url(@alarm), as: :json
    end

    assert_response 204
  end
end
