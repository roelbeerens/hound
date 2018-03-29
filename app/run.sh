#!/usr/bin/env bash

export DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket

# Is there an active WiFi connection?
iwgetid -r

if [ $? -eq 0 ]; then
    printf 'Already connected. Skipping WiFi Connect\n'
else
    printf 'Not connected. Starting WiFi Connect\n'
    ./wifi-connect --portal-ssid "Hound" --ui-directory "lib/wificonnect/ui"
fi

sleep 1

#node index.js