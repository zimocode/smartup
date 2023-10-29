#!/bin/sh
# Copyright 2013 The Chromium Authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.

set -e

HOST_BIN=""
DIR="$( cd "$( dirname "$0" )" && pwd )"
if [ "$(uname -s)" = "Darwin" ]; then
  SED="/usr/bin/sed -i ''"
  [ "$(/usr/bin/uname -m)" = "arm64" ] && HOST_BIN="$DIR/rightClickHelper/darwin_arm64" || HOST_BIN="$DIR/rightClickHelper/darwin_amd64"
  if [ "$(whoami)" = "root" ]; then
    # Edge use TARGET_DIR="/Library/Microsoft/Edge/NativeMessagingHosts"
    # Chromium use TARGET_DIR="/Library/Chromium/NativeMessagingHosts"
    TARGET_DIR="/Library/Google/Chrome/NativeMessagingHosts"
  else
    # Edge use TARGET_DIR="$HOME/Library/Application Support/Microsoft/Edge/NativeMessagingHosts"
    # Chromium use TARGET_DIR="$HOME/Library/Application Support/Chromium/NativeMessagingHosts"
    TARGET_DIR="$HOME/Library/Application Support/Google/Chrome/NativeMessagingHosts"
  fi
else
  SED="/usr/bin/sed -i"
  [ "$(/usr/bin/uname -m)" = "x86_64" ] && HOST_BIN="$DIR/rightClickHelper/linux_amd64" || HOST_BIN="$DIR/rightClickHelper/linux_arm64"
  if [ "$(whoami)" = "root" ]; then
    # Edge find it out yourself
    # Chromium use TARGET_DIR="/etc/chromium/native-messaging-hosts"
    TARGET_DIR="/etc/opt/chrome/native-messaging-hosts"
  else
    # Edge find it out yourself
    # Chromium use TARGET_DIR="$HOME/.config/chromium/NativeMessagingHosts"
    TARGET_DIR="$HOME/.config/google-chrome/NativeMessagingHosts"
  fi
fi

HOST_NAME=com.smartup.rightclickhelper

# Create directory to store native messaging host.
mkdir -p "$TARGET_DIR"

# create native messaging host manifest.
cat << EOF > "/tmp/$HOST_NAME.json"
{
  "name": "com.smartup.rightclickhelper",
  "description": "Right Click Helper for SmartUp",
  "path": "HOST_PATH",
  "type": "stdio",
  "allowed_origins": [
    "chrome-extension://okhdcmknlkpjecjobpijmniikbieejln/",
    "chrome-extension://bgjfekefhjemchdeigphccilhncnjldn/",
    "chrome-extension://jbfidehpoofganklkddfkcjeeaabimmb/"
  ]
}
EOF

# Update host path in the manifest.
HOST_PATH="$TARGET_DIR/smartUpRightClickHelper"
ESCAPED_HOST_PATH=${HOST_PATH////\\/}

$SED "s/HOST_PATH/$ESCAPED_HOST_PATH/" "/tmp/$HOST_NAME.json"

mv "/tmp/$HOST_NAME.json" "$TARGET_DIR/$HOST_NAME.json"
# Set permissions for the manifest so that all users can read it.
chmod o+r "$TARGET_DIR/$HOST_NAME.json"

[ -f "$HOST_BIN" ] && cp "$HOST_BIN" "$HOST_PATH" && chmod +x "$HOST_PATH" \
&& echo "Native messaging host $HOST_NAME has been installed to $HOST_PATH." \
|| echo "No binary found for $HOST_BIN, please build it yourself."
