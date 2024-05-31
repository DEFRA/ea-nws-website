#!/bin/sh

# Start the all processes
(cd /usr/src/app/backend; node index.js) &
(cd /usr/src/app/api; npx ts-node index.ts) &
(cd /usr/src/app/frontend; npm start) &

# Wait for any process to exit
wait -n

# Exit with status of process that exited first
exit $?
