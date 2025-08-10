#!/bin/sh
echo  "CH: $1"
echo  "lesson: $2"
echo  "arg: $3"
echo ""

if [ -z "$1" ] || [ -z "$2" ]; then
  echo "Usage: $0 <chapter> <lesson>"
  exit 1
fi

if [ "$3" = "1" ] || [ "$3" = "create" ] ; then
    echo "Creating lesson directory structure..."
    echo ""
    #  if mkdir errors (File exists), the cp and rm won’t execute.
    mkdir "./$1/L$2" &&
        cp "./Lesson tmp/"* "$1/L$2/" &&
            rm ./$1/L$2/unit_test.js
elif [ "$3" = "re-init" ]; then
    echo "Re-init lesson directory structure..."
    echo ""
    mkdir -p "./$1/L$2"
    cp "./Lesson tmp/"* "$1/L$2"
elif  [ "$3" = "2" ] || [ "$3" = "run" ] ; then
    echo "running ./$1/L$2/main.js...\n"
    node ./$1/L$2/main.js
else
    echo "running test..."
    echo ""
    cp "./Lesson tmp/unit_test.js" ./$1/L$2/
    node ./$1/L$2/main_test.js --submit
    rm ./$1/L$2/unit_test.js
fi