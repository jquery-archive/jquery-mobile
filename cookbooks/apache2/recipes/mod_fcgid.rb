#
# Cookbook Name:: apache2
# Recipe:: fcgid 
#
# Copyright 2008-2009, Opscode, Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

if platform?("debian", "ubuntu")
  package "libapache2-mod-fcgid"
elsif platform?("centos", "redhat", "fedora")
  package "mod_fcgid" do
    notifies :run, resources(:execute => "generate-module-list"), :immediately
  end

  file "#{node[:apache][:dir]}/conf.d/fcgid.conf" do
    action :delete
    backup false 
  end
elsif platform?("suse")
  apache_lib_path = node[:architecture] == "i386" ? "/usr/lib/httpd" : "/usr/lib64/httpd"
  package "httpd-devel"
  bash "install-fcgid" do
    code <<-EOH
(cd /tmp; wget http://superb-east.dl.sourceforge.net/sourceforge/mod-fcgid/mod_fcgid.2.2.tgz)
(cd /tmp; tar zxvf mod_fcgid.2.2.tgz)
(cd /tmp; perl -pi -e 's!/usr/local/apache2!#{apache_lib_path}!g' ./mod_fcgid.2.2/Makefile)
(cd /tmp/mod_fcgid.2.2; make install)
EOH
  end
end

apache_module "fcgid" do
  conf true
end
