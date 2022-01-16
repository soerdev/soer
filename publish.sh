#!/usr/bin/bash

cd dist/apps && jar -cvf naris.war ./naris
scp -P $SSH_PORT ./naris.war $SSH_USER@$SSH_HOST:$SSH_WWW_PATH/naris.war
ssh -p $SSH_PORT -l $SSH_USER $SSH_HOST 'cd '$SSH_WWW_PATH'/ && jar -xvf naris.war'

