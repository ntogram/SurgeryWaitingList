@echo off
echo Installing dependencies...

docker load -i mysql-8.0.39.tar
docker load -i python-3-12-slim.tar
docker load -i node-20.17.0.tar
docker load -i nginx-stable-alpine.tar

echo Dependencies installed.
pause