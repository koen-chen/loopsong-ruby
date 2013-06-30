get '/' do
    puts !!session[:auth]
    @auth = !!session[:auth] 
    @account = session[:account]
    @albums = []
    erb :'base/index'
end
