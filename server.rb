require 'sinatra'

configure do
    set :public_folder, './client'
    set :reload_templates, true
    set :logging, false
    set :method_override, true
    set :views, './server/views'
    set :server_dir, './server'

    use Rack::Session::Pool
end


require settings.server_dir + '/db'
require settings.server_dir + '/router'