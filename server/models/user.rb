class User
    include Mongoid::Document

    field :username, type: String
    field :email, type: String
    field :password, type: String
    field :role, type: String
    field :create_at, type: Date, default: Time.now 
    field :update_at, type: Date, default: Time.now
end