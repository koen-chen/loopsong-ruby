get '/login' do
    erb :'user/login'
end

post '/login' do
    user = User.where(username: params[:username], password: params[:password]).first
    if user.nil?
        erb :'user/login'
    else
        session[:auth] = true
        session[:account] = user
        redirect to('/')
    end
end

get '/logout' do
    session.clear
    redirect to('/')
end 

get '/user' do
    @account = session[:account]
    @users = User.where(role: 'general')

    erb :'user/index', :layout => :adminLayout
end

post '/user' do
    User.create(
        username: params[:username],
        password: params[:password],
        role: 'general'
    ) do |user|
        puts user
    end
end

get '/user/new' do
    erb :'user/new', :layout => :adminLayout
end

get '/user/:id' do
    @account = session[:account]
    erb :'user/show', :layout => :adminLayout
end

put '/user/:id' do
    User.update_attributes(
        username: params[:username],
        password: params[:password]

    )
    erb :'user/edit', :layout => :adminLayout
end

get '/user/:id/edit' do
    @account = User.find(params[:id])

    erb :'user/edit', :layout => :adminLayout
end

get '/user/:id/delete' do
    Person.delete_all(_id: params[:id])
    
    redirect to('/user') 
end