require 'bundler/setup'
require 'sinatra'
require 'open-uri'
require 'optparse'

stop_point = ENV.fetch('STOP_POINT')

set :bind, '0.0.0.0'

get '/' do
  erb :index
end

get '/arrivals' do
  open("https://api.tfl.gov.uk/StopPoint/#{stop_point}/Arrivals").read
end
