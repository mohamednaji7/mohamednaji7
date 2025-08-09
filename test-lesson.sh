#!/bin/sh

echo  "You passed: $1"
echo  "You passed: 2: $2"

echo "running test..."
cp "./Lesson tmp/unit_test.js" ./$1/L$2/
node ./$1/L$2/main_test.js --submit
rm ./$1/L$2/unit_test.js