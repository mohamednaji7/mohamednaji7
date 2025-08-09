#!/bin/sh

echo  "You passed: $1"
echo  "You passed: 2: $2"
echo "running test..."

node ./$1/L$2/main_test.js --submit