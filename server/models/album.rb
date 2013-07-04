class Album
    include Mongoid::Document

    field :type, type: String
    field :subType, type: String
    field :title, type: String
    field :published, type: String
    field :company, type: String
    field :author, type: String
    field :detail, type: String
    field :trackList, type: Array
    field :cover, type: String
    field :tags, type: Array
    field :likes, type: Array
    field :collects, type: Array
    field :shares, type: Array
    field :comments, type: Array
    field :links, type: Hash
    field :creater, type: String
    field :create_at, type: Date, default: Time.now 
    field :update_at, type: Date, default: Time.now 
end
