#!/usr/bin/env bash

export DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket

printf 'Shairport Sync started\n'
printf 'Raspotify started\n'

# Is there an active WiFi connection?
iwgetid -r

if [ $? -eq 0 ]; then
    printf 'Already connected. Skipping WiFi Connect\n'
else
    printf 'Not connected. Starting WiFi Connect\n'
    ./wifi-connect --portal-ssid "Hound" --ui-directory "wifi"
fi