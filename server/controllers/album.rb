require 'net/http'
require 'nokogiri'
require 'open-uri'

get '/album/all' do
    @loginUser = session[:loginUser]
    @albums = Album.all
    erb :'album/all', :layout => :adminLayout
end

get '/album/new' do
    erb :'album/new', :layout => :adminLayout
end

post '/album/new' do
   page = getAlbumInfo(params[:albumUrl]);
   resolveAlbumInfo(params[:albumUrl], page);
end

get '/album/:id' do
end

get '/album/:id/edit' do
    @album = Album.find(params[:id]);

    if @album.nil?
        redirect '/album/all'
    else
        erb :'album/edit', :layout => :adminLayout
    end
end

put '/album/:id/edit' do
    status = Album.find(params[:id]).update_attributes(
        type: params[:type],
        subType: params[:subType],
        title: params[:title],
        published: params[:published],
        company: params[:company],
        author: params[:author],
        detail: params[:detail],
        links: {
            taobao: params[:taobaoLink],
            douban: params[:doubanLink],
            xiami: params[:xiamiLink],
            lastfm: params[:kuwoLink]
        },
        update_at: Date.now()
    ) 
    if status
        flash[:notice] = '修改专辑成功'
        redirect '/album/all'
    else
        flash[:notice] = '修改专辑失败'
        @album = params
        erb :'album/edit', :layout => :adminLayout
    end
end

get '/album/:id/delete' do
    status = Album.find(params[:id]).delete
    flash[:notice] = status ? '删除专辑成功' : '删除专辑失败'
    redirect '/album/all'  
end

 
def getAlbumInfo(albumUrl) 
    uri = URI(albumUrl)
    response = Net::HTTP.get_response(uri)
end

def resolveAlbumInfo(xiamiLink, page) 
    doc = Nokogiri::HTML(page)

    album = {};
    album[:cover] = doc.at_css('#albumCover').href;
    album[:title] = doc.at_css('#title h1').to_html.gsub(/<span>.*<\/span>/, '');
    album[:detail] = doc.at_css('#album_intro .album_intro_brief').text;
    
    doc.css('#album_info table td.item').each do |item|
        itemValue = item.next_element.next_element.text.strip;
        itemName = item.text.scan(/([\u4e00-\u9fa5]+)/g)[0];
        case itemName 
        when '艺人' 
            album[:author] = itemValue
        when '唱片公司' 
            album[:company] = itemValue
        when '发行时间' 
            album[:published] = itemValue;
        end
    end

    album[:xiamiLink] = xiamiLink
    album[:taobaoLink] = 'http://s.taobao.com/search?q=' + album[:title] + ' ' + album[:author]
    album[:trackList] = []

    doc('#track .song_name a').each do |item|
        album[:trackList].push(item.text);
    end
end

def getDoubanLink 
end

def getKuwoLink
end

def getAlbumCover 
end

def saveAlbum

end


