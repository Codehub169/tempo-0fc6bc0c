#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Print commands and their arguments as they are executed.
# set -x 

# Set the port for the application, allowing override from environment
export PORT=${PORT:-9000}

# Navigate to the client directory if it exists and install dependencies
if [ -d "client" ] && [ -f "client/package.json" ]; then
  echo "Client directory and client/package.json found. Installing client dependencies..."
  npm install --prefix client
elif [ -d "client" ]; then
  echo "Warning: Client directory found, but client/package.json is missing. Skipping client dependency installation."
  echo "Make sure client/package.json is included in your deployment if client features are needed."
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
    echo "Client build script not found or failed. Ensure the client's package.json includes a 'build' script."
  fi
elif [ -f "package.json" ]; then
    # Fallback to root build script if client/package.json specific build isn't run
    # This assumes the root 'build' script handles the client build (as per current package.json)
    echo "Attempting to build using root project's build script..."
    if npm run build --if-present; then
        echo "Project built successfully using root build script."
    else
        echo "Root build script not found or failed. Ensure the root package.json includes a 'build' script, or client build is handled."
    fi 
else
  echo "Warning: Client directory or its package.json not found, and no root package.json for fallback build. Skipping client build."
fi

# Start the server application
echo "Starting server on port $PORT..."
node server.js
