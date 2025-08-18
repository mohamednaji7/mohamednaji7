#!/bin/sh
echo "CH: $1"
echo "lesson: $2"
echo ""

TARGET=$(echo ./fcc-learn-sql-assets/course/$1-*/exercises/$2*)

if [ -f "$TARGET/code.sql" ]; then
    echo "running test..."
    echo ""
    cp ./check.sh "$TARGET"
    chmod +x "$TARGET/check.sh"
    "$TARGET/check.sh"
    rm -f "$TARGET/check.sh"
else
    echo "❌ No code.sql found in $TARGET"
fi
