require 'mongoid'
Mongoid.load!('mongoid.yml')

require settings.server_dir + '/models/user'