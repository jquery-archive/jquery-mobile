Vagrant::Config.run do |config|
  config.vm.box = "digital_ocean"
  config.vm.network(:hostonly, "33.33.33.10")
  config.vm.forward_port(80, 8181)

  # Configure to provision with local cookbooks
  config.vm.provision :chef_solo do |chef|
    chef.cookbooks_path = ["cookbooks"]
    chef.add_recipe "jquery-mobile"
    chef.json = {:vagrant => {:directory => "/vagrant" }}
  end
end
