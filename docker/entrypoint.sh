#!/bin/sh

for ARGUMENT in "$@"
do

    KEY=$(echo $ARGUMENT | cut -f1 -d=)
    VALUE=$(echo $ARGUMENT | cut -f2 -d=)   

    case "$KEY" in
            HOSTNAME)              HOSTNAME=${VALUE} ;;
            *)   
    esac    


done

echo "=== Parametry ==="
echo "HOSTNAME = $HOSTNAME"
echo "================="

cd /usr/share/nginx/html
jq  '."api" = "'"$HOSTNAME"'"' config.json | sponge config.json