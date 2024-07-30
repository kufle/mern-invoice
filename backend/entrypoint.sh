#!/bin/sh
chown -R invoice:invoice /app
exec "$@"