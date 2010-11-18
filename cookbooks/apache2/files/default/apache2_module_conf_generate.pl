#!/usr/bin/perl

=begin

Generates Ubuntu style module.load files.
 
./apache2_module_conf_generate.pl /usr/lib64/httpd/modules /etc/httpd/mods-available

ARGV[0] is the apache modules directory, ARGV[1] is where you want 'em.

=cut

use File::Find;

use strict;
use warnings;

die "Must have '/path/to/modules' and '/path/to/modules.load'"
  unless $ARGV[0] && $ARGV[1];

find(
  {
    wanted => sub {
      return 1 if $File::Find::name !~ /\.so$/;
      my $modfile = $_;
      $modfile =~ /(lib|mod_)(.+)\.so$/;
      my $modname  = $2;
      my $filename = "$ARGV[1]/$modname.load";
      unless ( -f $filename ) {
        open( FILE, ">", $filename ) or die "Cannot open $filename";
        print FILE "LoadModule " . $modname . "_module $File::Find::name\n";
        close(FILE);
      }
    },
    follow => 1,
  },
  $ARGV[0]
);

exit 0;

