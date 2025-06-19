#!/bin/bash
unset GTK_PATH

gnome-terminal --title="API" -- bash -c "cd ~/dev/ea_nws_website/api && npm start; exec bash"

gnome-terminal --title="Backend" -- bash -c "cd ~/dev/ea_nws_website/backend && npm start; exec bash"

gnome-terminal --title="Frontend" -- bash -c "cd ~/dev/ea_nws_website/frontend && npm run start-dev; exec bash"

gnome-terminal --title="QGIS" --tab \
        --working-directory=/home/johnyfarrar/dev/ea_nws_website/qgis \
        -- bash -c "sudo docker compose up"