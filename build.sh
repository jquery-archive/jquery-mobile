#!/bin/sh
while inotifywait -re modify $1; do
  DO_CLIENT_ID=x7kgcM36oEcMWEuaO5ySo DO_API_KEY=HqBtp3AQcbgEUkvvaiIcND2zRKpDKyr53dsXL6Vbf vagrant rsync
done
