#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Print commands and their arguments as they are executed.
# set -x 

# Set the port for the application
export PORT=9000

# Navigate to the client directory if it exists and install dependencies
if [ -d "client" ]; then
  echo "Client directory found. Installing client dependencies..."
  npm install --prefix client
else
  echo "Warning: Client directory not found. Skipping client dependency installation."
  echo "Assuming client setup will be handled separately or is not yet present."
fi

# Install server dependencies
echo "Installing server dependencies..."
npm install

# Build the client application if it exists and has a build script
if [ -d "client" ] && [ -f "client/package.json" ]; then
  echo "Building client application..."
  # Check if build script exists in client's package.json
  if npm run --prefix client build --if-present; then
    echo "Client application built successfully."
  else 
    echo "Client build script not found or failed. Ensure client has a 'build' script in package.json."
  fi
elif [ -f "package.json" ]; then
    # Fallback for a combined package.json if client is not separate
    if npm run build --if-present; then
        echo "Project built successfully."
    else
        echo "Build script not found or failed. Ensure project has a 'build' script."
    fi 
else
  echo "Warning: Client directory or its package.json not found. Skipping client build."
fi

# Start the server application
echo "Starting server on port $PORT..."
node server.js
