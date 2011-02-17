Vagrant::Config.run do |config|
  config.vm.box = "base"
  config.vm.network("33.33.33.10")
  config.vm.forward_port("web", 80, 4567)
  config.vm.boot_mode = :gui
  config.vm.customize do |vm|
    vm.name = "jQuery Mobile Web"
    vm.memory_size = 768
  end

  # Share the WWW folder as the main folder for the web VM using NFS
  config.vm.share_folder("v-root", "/vagrant", ".", :nfs => true)

  # Configure to provision with local cookbooks
  config.vm.provision :chef_solo do |chef|
    chef.cookbooks_path = "cookbooks"
    chef.add_recipe "jquery-mobile"
  end
end
