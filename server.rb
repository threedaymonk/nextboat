require 'bundler/setup'
require 'sinatra'
require 'open-uri'

set :bind, '0.0.0.0'

get '/' do
  erb :index
end

get '/stop/:id/arrivals' do
  id = params['id'].gsub(/[^A-Z0-9]/, '')
  puts id
  open("https://api.tfl.gov.uk/StopPoint/#{id}/Arrivals").read
end
