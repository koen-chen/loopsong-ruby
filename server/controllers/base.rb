get '/' do
    @loginUser = session[:loginUser]
    erb :'base/index'
end
