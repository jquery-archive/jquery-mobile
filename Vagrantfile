Vagrant.configure('2') do |config|
  config.vm.box = "digital_ocean"
  config.ssh.private_key_path = "test_id_rsa"

  config.vm.provider :digital_ocean do |provider|
    provider.ca_path = "/etc/ssl/certs/ca-certificates.crt"
  end

  # Configure to provision with local cookbooks
  config.vm.provision :chef_solo do |chef|
    chef.cookbooks_path = ["cookbooks"]
    chef.add_recipe "apache2"
    chef.add_recipe "jquery-mobile"
    chef.json = {:vagrant => {:directory => "/vagrant" }}
  end
end
