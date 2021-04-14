#!/usr/bin/env bash

if [ -n "$PORT" ]; then
  HTTP_PORT=$PORT
elif [ -n "$BLUEMIX_REGION" ]; then
  HTTP_PORT=8080
elif [ -n "$KUBERNETES_SERVICE_HOST" ]; then
  HTTP_PORT=8080
else
  HTTP_PORT=4000
fi

export HTTP_PORT

NODE_ENV=production node server.js
# heroku config:set NODE_MODULES_CACHE=false
