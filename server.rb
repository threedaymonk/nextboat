require 'bundler/setup'
require 'sinatra'
require 'open-uri'
require 'optparse'

stop_point = ENV.fetch('STOP_POINT')
app_key = ENV.fetch('TFL_KEY')
app_id = ENV.fetch('TFL_APP_ID')

set :bind, '0.0.0.0'

get '/' do
  erb :index
end

get '/arrivals' do
  open("https://api.tfl.gov.uk/StopPoint/#{stop_point}/Arrivals?app_id=#{app_id}&app_key=#{app_key}").read
end
