#!/bin/bash

REPOSITORY=/home/ubuntu/Balloon_Front/zip
PROJECT_NAME=/home/ubuntu/Real_Balloon_Front

echo "> Build 파일 복사"
mkdir -p $PROJECT_NAME
cp -r $REPOSITORY/build $PROJECT_NAME
sudo systemctl restart nginx
