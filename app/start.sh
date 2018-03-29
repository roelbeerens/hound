#!/usr/bin/env bash

export DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket

# Is there an active WiFi connection?
SSID=`iwgetid -r`

if [ ! "$SSID" ]; then
    printf 'Already connected. Skipping WiFi Connect\n'
    ./wifi-connect --portal-ssid "Hound" --ui-directory "lib/wificonnect/ui"
else
    printf 'Not connected. Starting WiFi Connect\n'
fi

sleep 1

#npm start