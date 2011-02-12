require_recipe "apt"
require_recipe "apache2::mod_php5"
require_recipe "apache2::mod_expires"

#--------------------------------------------------------------------------------
# Apache
#--------------------------------------------------------------------------------
# Disable the default site and enable our application
execute "disable-default-site" do
  command "sudo a2dissite default"
  notifies :restart, resources(:service => "apache2")
end

web_app "application" do
  template "application.conf.erb"
  notifies :restart, resources(:service => "apache2")
end
