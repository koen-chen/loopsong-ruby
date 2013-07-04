get '/login' do
    erb :'user/login'
end

post '/login' do
    user = User.where(username: params[:username], password: params[:password]).first
    if user.nil?
        flash[:notice] = '邮箱或密码错误！'
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
        role: 'general',
        create_at: Time.now,
        update_at: Time.now
    ) 
    if user.nil? 
        flash[:notice] = '添加新用户失败！'
        @user = params
        erb :'user/new', :layout => :adminLayout
    else
        flash[:notice] = '添加新用户成功！'
        redirect '/user/all'
    end
end

get '/user/:id' do
    @loginUser = session[:loginUser]
    if params[:id].eql?(@loginUser[:_id].to_s)
        erb :'user/index', :layout => :adminLayout
    else
        redirect '/user/' + @loginUser[:_id]
    end
end

get '/user/:id/edit' do
    @user = User.find(params[:id])
    if @user.nil?
        redirect '/user/all'
    else
        erb :'user/edit', :layout => :adminLayout
    end
    
end

put '/user/:id/edit' do
    status = User.find(params[:id]).update_attributes(
        username: params[:username],
        password: params[:password],
        update_at: Time.now
    ) 
    if status
        flash[:notice] = '修改用户成功'
        redirect '/user/all'
    else
        flash[:notice] = '修改用户失败'
        @user = params
        erb :'user/edit', :layout => :adminLayout
    end
end

get '/user/:id/delete' do
    status = User.find(params[:id]).delete
    flash[:notice] = status ? '删除用户成功' : '删除用户失败'
    redirect '/user/all'  
end

