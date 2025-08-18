#!/bin/bash

# Base directory = location of this script
BASE_DIR="$(cd "$(dirname "$0")" && pwd)"

# Files
SETUP_FILE="$BASE_DIR/up.sql"
SOLUTION_FILE="$BASE_DIR/code.sql"
COMPLETE_FILE="$BASE_DIR/complete.sql"
DB_FILE_USER="$BASE_DIR/test_user.db"
DB_FILE="$BASE_DIR/test.db"

# clean old run files
rm -f "$BASE_DIR/output.txt" "$BASE_DIR/expected.txt" "$DB_FILE"

# Step 1: Run setup file
sqlite3 "$DB_FILE_USER" < "$SETUP_FILE"

# Step 1: Run setup file
sqlite3 "$DB_FILE" < "$SETUP_FILE"

# Step 2: Run student's solution and save output
sqlite3 -cmd ".headers on" -cmd ".mode column" "$DB_FILE_USER" < "$SOLUTION_FILE" > "$BASE_DIR/output.txt"

# Step 3: Run expected solution and save output
sqlite3 -cmd ".headers on" -cmd ".mode column" "$DB_FILE" < "$COMPLETE_FILE" > "$BASE_DIR/expected.txt"


# Step 4: Compare outputs
if diff -q "$BASE_DIR/output.txt" "$BASE_DIR/expected.txt" > /dev/null; then
    echo "Your Output:"
    cat "$BASE_DIR/output.txt"
    echo ""
    echo "✅ Correct solution!"
else
    echo "Your Output:"
    cat "$BASE_DIR/output.txt"
    echo ""
    echo "Expected Output:"
    cat "$BASE_DIR/expected.txt"
    echo ""
    echo ""
    echo "❌ Incorrect solution!"
fi

# clean old db
rm -f "$DB_FILE"
rm -f "$DB_FILE_USER"
