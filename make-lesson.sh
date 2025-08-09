#!/bin/sh

echo  "You passed: $1"
echo  "You passed: 2: $2"
echo "Creating lesson directory structure..."
mkdir "./$1/L$2"
cp "./Lesson tmp/"* "$1/L$2/"
