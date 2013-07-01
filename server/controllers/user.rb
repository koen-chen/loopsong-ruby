get '/login' do
    erb :'user/login'
end

post '/login' do
    user = User.where(username: params[:username], password: params[:password]).first
    if user.nil?
        @message = '邮箱或密码错误！'
        @user = params
        erb :'user/login'
    else
        session[:loginUser] = user
        redirect to('/')
    end
end

get '/logout' do
    session.clear
    redirect to('/')
end 

get '/user/all' do
    @loginUser = session[:loginUser]
    @users = User.where(role: 'general')

    erb :'user/all', :layout => :adminLayout
end

get '/user/new' do
    erb :'user/new', :layout => :adminLayout
end

post '/user/new' do
    user = User.create(
        username: params[:username],
        password: params[:password],
        role: 'general'
    ) 
    puts 'ddddd'
    puts user
    if user.nil? 
        @message = '添加新用户失败，请重试！'
        @user = params
        erb :'user/new', :layout => :adminLayout
    else
        redirect to('/user/all')
    end
end

get '/user/:id' do
    @loginUser = session[:loginUser]
    erb :'user/index', :layout => :adminLayout
end

get '/user/:id/edit' do
    @user = User.find(params[:id])

    erb :'user/edit', :layout => :adminLayout
end

put '/user/:id/edit' do
    user = User.new(
        username: params[:username],
        password: params[:password]
    ) 
    user.save
    puts 'update _______________!!!!!!!!!!'
    puts user
    erb :'user/edit', :layout => :adminLayout
end

get '/user/:id/delete' do
    user = User.delete_all(_id: params[:id])
    puts 'ddeeeeeeee'
    puts user
    redirect to('/user/all') 
end