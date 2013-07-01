require settings.server_dir + '/controllers/base'
require settings.server_dir + '/controllers/user'

before do
    if !['/', '/login', '/logout', '/album'].include?(request.path)
        if !session[:loginUser]
            redirect '/'
        end
    end
end

not_found do
    puts 'in not found'
    puts request.path
    redirect '/'  
end