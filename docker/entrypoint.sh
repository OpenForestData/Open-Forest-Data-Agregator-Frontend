#!/bin/sh

for ARGUMENT in "$@"
do

    KEY=$(echo $ARGUMENT | cut -f1 -d=)
    VALUE=$(echo $ARGUMENT | cut -f2 -d=)   

    case "$KEY" in
            HOSTNAME)              HOSTNAME=${VALUE} ;;
            captcha)               captcha=${VALUE} ;;
            siteURL)               siteURL=${VALUE} ;;
            cms)                   cms=${VALUE} ;;
            *)   
    esac    


done

echo "=== Parametry ==="
echo "HOSTNAME = $HOSTNAME"
echo "captcha = $captcha"
echo "siteURL = $siteURL"
echo "cms = $cms"
echo "================="

cd /usr/share/nginx/html
jq  '."api" = "'"$HOSTNAME"'"' config.json | sponge config.json
jq  '."captcha" = "'"$captcha"'"' config.json | sponge config.json
jq  '."siteURL" = "'"$siteURL"'"' config.json | sponge config.json
jq  '."cms" = "'"$cms"'"' config.json | sponge config.json