#!/bin/sh

echo  "You passed: $1"
echo  "You passed: 2: $2"
echo "Creating lesson directory structure..."
#  if mkdir errors (File exists), the cp and rm won’t execute.
mkdir "./$1/L$2" &&
    cp "./Lesson tmp/"* "$1/L$2/" &&
        rm ./$1/L$2/unit_test.js
