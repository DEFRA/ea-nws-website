#!/bin/bash

user_name=`whoami`

gnome-terminal --title="API" --tab \
	--working-directory=/home/$user_name/dev/ea_nws_website/api \
	-- bash -c "npm install && npm start; bash -i"
gnome-terminal --title="Backend" --tab \
        --working-directory=/home/$user_name/dev/ea_nws_website/backend \
        -- bash -c "npm install && npm start; bash -i"
gnome-terminal --title="Frontend" --tab \
        --working-directory=/home/$user_name/dev/ea_nws_website/frontend \
        -- bash -c "npm install && npm run start-dev; bash -i"
gnome-terminal --title="QGIS" --tab \
        --working-directory=/home/$user_name/dev/ea_nws_website/qgis \
        -- bash -c "sudo docker compose up"