#!/bin/sh
echo  "CH: $1"
echo  "lesson: $2"
echo  "arg: $3"
echo ""


if [ -z "$1" ] && [ -z "$2" ]; then
  echo "Running all tests..."
  echo ""
  
  # Table header
  printf "%-22s | %-25s | %s\n" "Status (All passed?)" "Lesson" "Results (tests passed)"
  printf -- "-------------------------------------------------------------------------------\n"
  find . -type f -path "./CH*/L*/main_test.js" | sort -V | while read testfile; do
#   find . -type f -path "./CH*/L*/main_test.js" | while read testfile; do
    dir=$(dirname "$testfile")
    
    cp "./Lesson tmp/unit_test.js" "$dir/"
    
    output=$(node "$dir/main_test.js" --submit 2>&1)
    
    # Extract only the numbers like 3/3 or 4/7
    result=$(echo "$output" | grep "Results:" | sed -E 's/^Results: ([0-9]+\/[0-9]+).*/\1/')
    
    if echo "$output" | grep -q "✅"; then
      printf "%-22s | %-25s | %s\n" "✅" "$dir" "$result"
    elif echo "$output" | grep -q "❌"; then
      printf "%-22s | %-25s | %s\n" "❌" "$dir" "$result"
    fi
    
    rm "$dir/unit_test.js"
  done
  exit 0
fi


if [ "$3" = "c" ] || [ "$3" = "create" ] ; then
    echo "Creating lesson directory structure..."
    echo ""
    #  if mkdir errors (File exists), the cp and rm won’t execute.
    mkdir "./$1/L$2" &&
        cp "./Lesson tmp/"* "$1/L$2/" &&
            rm ./$1/L$2/unit_test.js
elif [ "$3" = "ri" ] || [ "$3" = "re-init" ]; then
    echo "Re-init lesson directory structure..."
    echo ""
    mkdir -p "./$1/L$2"
    cp "./Lesson tmp/"* "$1/L$2"
elif  [ "$3" = "r" ] || [ "$3" = "run" ] ; then
    echo "running ./$1/L$2/main.js...\n"
    node ./$1/L$2/main.js
else
  if [ -f "./$1/L$2/main_test.js" ]; then
    echo "running test..."
    echo ""
    cp "./Lesson tmp/unit_test.js" ./$1/L$2/
    node ./$1/L$2/main_test.js --submit
    rm ./$1/L$2/unit_test.js
  else
    echo "No test file found for $1/L$2"
  fi
    
fi