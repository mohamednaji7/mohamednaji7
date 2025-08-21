#!/bin/sh
echo  "CH: $1"
echo  "lesson: $2"
echo  "arg: $3"
echo ""


if [ "$3" = "c" ] || [ "$3" = "create" ] ; then
    echo "Creating lesson directory structure..."
    echo ""
    #  if mkdir errors (File exists), the cp and rm won’t execute.
    mkdir "./CH$1/L$2" &&
        cp "./template/"* "CH$1/L$2/" 
elif [ "$3" = "ri" ] || [ "$3" = "re-init" ]; then
    echo "Re-init lesson directory structure..."
    echo ""
    mkdir -p "./CH$1/L$2"
    cp "./template/"* "CH$1/L$2"
elif  [ "$3" = "r" ] || [ "$3" = "run" ] ; then
    echo "running ./CH$1/L$2/main.go...\n"
    echo "Not implemented"
else
  if [ -f "./CH$1/L$2/main_test.go" ]; then
    echo "running test..."
    echo ""
    go test -v ./CH$1/L$2 
  else
    echo "No test file found for CH$1/L$2"
  fi
    
fi