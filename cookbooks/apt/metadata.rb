maintainer        "Opscode, Inc."
maintainer_email  "cookbooks@opscode.com"
license           "Apache 2.0"
description       "Configures apt and apt services"
version           "0.8"
recipe            "apt::cacher", "Set up an APT cache"
recipe            "apt::proxy", "Set up an APT proxy"

%w{ ubuntu debian }.each do |os|
  supports os
end
