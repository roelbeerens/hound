#!/usr/bin/env bash

export DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket

# Is there an active WiFi connection?
SSID=`iwgetid -r`

if [ ! "$SSID" ]; then
    printf 'Not connected. Starting WiFi Connect\n'
    ./wifi-connect --portal-ssid "Hound" --ui-directory "lib/wificonnect/ui"
fi

# Start the application
npm start