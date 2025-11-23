#!/bin/bash
# Ensure correct Node.js version is used
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Change to the directory where this script is located
cd "$(dirname "$0")"

# Use the Node.js version specified in .nvmrc
if [ -f .nvmrc ]; then
    nvm use
    if [ $? -ne 0 ]; then
        echo "❌ Failed to switch to Node.js version specified in .nvmrc"
        echo "Please install Node.js $(cat .nvmrc) using: nvm install $(cat .nvmrc)"
        exit 1
    fi
fi

# Verify Node.js version
NODE_VERSION=$(node --version)
echo "✅ Using Node.js $NODE_VERSION"

# Execute the command passed as arguments
exec "$@"


