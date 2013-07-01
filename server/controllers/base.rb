get '/' do
    @auth = !!session[:auth] 
    @account = session[:account]
    @albums = []
    erb :'base/index'
end
