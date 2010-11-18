#
# Cookbook Name:: apache2
# Recipe:: god_monitor
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

apache_service = service "apache2" do
  action :nothing
end

start_command = apache_service.start_command
stop_command = apache_service.stop_command
restart_command = apache_service.restart_command

god_monitor "apache2" do
  config "apache2.god.erb"
  start (start_command)?start_command : "/etc/init.d/#{apache_service.service_name} start"
  restart (restart_command)?restart_command : "/etc/init.d/#{apache_service.service_name} restart"
  stop (stop_command)?stop_command : "/etc/init.d/#{apache_service.service_name} stop"
end
