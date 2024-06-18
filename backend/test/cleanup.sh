echo "Cleaning up"

echo "Check if port 9000 is in use"
if ! type lsof >/dev/null 2>&1 || ! lsof -Pi :9000 -sTCP:LISTEN -t >/dev/null; then
    echo "Port 9000 is not in use"
else
    echo "Killing every process in port 9000"
    lsof -t -i :9000 | xargs kill
fi

echo "Check if port 5000 is in use"
if ! type lsof >/dev/null 2>&1 || ! lsof -Pi :5000 -sTCP:LISTEN -t >/dev/null; then
    echo "Port 5000 is not in use"
else
    echo "Killing every process in port 5000"
    lsof -t -i :5000 | xargs kill
fi