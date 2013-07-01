require 'sinatra'
require 'sinatra/flash'
require 'sinatra/redirect_with_flash'
require 'sinatra/reloader' if development?

configure do
    set :public_dir, './client'
    set :server_dir, './server'
    set :views, './server/views'
    set :logging, false
    set :method_override, true

    use Rack::Session::Pool
end


require settings.server_dir + '/db'
require settings.server_dir + '/router'