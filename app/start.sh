#!/usr/bin/env bash

export DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket

# Force hound.local
dbus-send \
    --system \
    --print-reply \
    --reply-timeout=2000 \
    --type=method_call \
    --dest=org.freedesktop.Avahi \
    / \
    org.freedesktop.Avahi.Server.SetHostName \
    string:"hound"

# Is there an active WiFi connection?
SSID=`iwgetid -r`

if [ ! "$SSID" ]; then
    printf 'Not connected. Starting WiFi Connect\n'
    ./wifi-connect --portal-ssid "Hound" --ui-directory "lib/wificonnect/ui"
fi

# Start the application
PORT=80 npm start