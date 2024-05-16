#!/usr/bin/env bash
cd /srv/www/node/serialyz
sleep 20
nc -zv 127.0.0.1 3001
