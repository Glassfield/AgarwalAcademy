#!/bin/bash

# Quick Update Script - Use this to deploy updates after initial setup

set -e

echo "🔄 Updating Agarwal Academy..."

cd /home/ubuntu/agarwal-academy

# Pull latest changes (if using Git)
if [ -d ".git" ]; then
    echo "📥 Pulling latest changes..."
    git pull origin main
fi

# Install any new dependencies
echo "📦 Installing dependencies..."
npm install

# Build new version
echo "🏗️ Building production build..."
npm run build

# Restart Nginx
echo "🔄 Restarting web server..."
sudo systemctl restart nginx

echo "✅ Update complete!"
echo "🌐 Website updated successfully!"
