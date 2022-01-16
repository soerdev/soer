#!/usr/bin/bash
npm install && npm run build
status=$?
if test $status -ne 0
then
	exit $status
fi
cd dist && jar -cvf front.war ./front
