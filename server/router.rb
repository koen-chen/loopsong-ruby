filter = ['/', '/login', '/logout', '/album']

before do
    if !filter.include?(request.path) and session[:loginUser].nil?
        redirect '/'
    end
end

require settings.server_dir + '/controllers/base'
require settings.server_dir + '/controllers/user'
require settings.server_dir + '/controllers/album'



not_found do
    redirect '/'  
end