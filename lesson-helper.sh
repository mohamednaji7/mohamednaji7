#!/bin/sh

echo  "You passed: $1"
echo  "You passed: 2: $2"
echo  "You passed: 3: $3"

if [ -z "$1" ] || [ -z "$2" ]; then
  echo "Usage: $0 <chapter> <lesson>"
  exit 1
fi

if [ "$3" = "1" ]; then
    echo "Creating lesson directory structure..."
    mkdir "./$1/L$2"
    cp "./Lesson tmp/"* "$1/L$2/"
elif [ "$3" = "2" ]; then
    echo "running test..."

    node ./$1/L$2/main_test.js --submit

elif [ "$3" = "re-init" ]; then
    echo "Re-init lesson directory structure..."
    mkdir -p "./$1/L$2"
    cp "./Lesson tmp/"* "$1/L$2"
else
    echo "Invalid option. Use 1 to create, 2 to test, or 're-init'."
    exit 1
fi