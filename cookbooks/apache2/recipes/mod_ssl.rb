#
# Cookbook Name:: apache2
# Recipe:: ssl 
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

if platform?("centos", "redhat", "fedora")
  package "mod_ssl" do
    action :install
    notifies :run, resources(:execute => "generate-module-list"), :immediately
  end

  file "#{node[:apache][:dir]}/conf.d/ssl.conf" do
    action :delete
    backup false 
  end
end

ports = node[:apache][:listen_ports].include?("443") ? node[:apache][:listen_ports] : [node[:apache][:listen_ports], "443"].flatten

template "#{node[:apache][:dir]}/ports.conf" do
  source "ports.conf.erb"
  variables :apache_listen_ports => ports
  notifies :restart, resources(:service => "apache2")
end

apache_module "ssl" do
  conf true
end
