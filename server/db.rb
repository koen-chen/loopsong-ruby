require 'mongoid'
Mongoid.load!('mongoid.yml')

require settings.server_dir + '/models/user'
require settings.server_dir + '/models/album'

if !User.where(username: 'admin', password: 'admin').exists?
    User.create(
        username: 'admin',
        password: 'admin',
        role: 'super',
        create_at: Time.now,
        update_at: Time.now
    ) 
end