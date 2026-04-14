#!/bin/bash

# AWS Lightsail Deployment Script for Agarwal Academy
# This script sets up Node.js, installs dependencies, and starts the app

set -e

echo "🚀 Starting Agarwal Academy Deployment..."

# Update system
echo "📦 Updating system packages..."
sudo apt-get update
sudo apt-get upgrade -y

# Install Node.js 20.x
echo "📦 Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Nginx
echo "📦 Installing Nginx..."
sudo apt-get install -y nginx

# Navigate to project directory
cd /home/ubuntu/agarwal-academy

# Install dependencies
echo "📦 Installing project dependencies..."
npm install

# Build production version
echo "🏗️ Building production build..."
npm run build

# Setup Nginx configuration
echo "⚙️ Configuring Nginx..."
sudo tee /etc/nginx/sites-available/agarwal-academy > /dev/null <<EOF
server {
    listen 80;
    server_name _;
    
    root /home/ubuntu/agarwal-academy/dist;
    index index.html;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Handle React Router
    location / {
        try_files \$uri \$uri/ /index.html;
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
EOF

# Enable site
sudo ln -sf /etc/nginx/sites-available/agarwal-academy /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
echo "🔄 Restarting Nginx..."
sudo systemctl restart nginx
sudo systemctl enable nginx

echo "✅ Deployment complete!"
echo "🌐 Your website is now live!"
echo ""
echo "Next steps:"
echo "1. Point your domain to this Lightsail instance IP"
echo "2. Setup SSL certificate with certbot (optional)"
echo "3. Configure Firebase authorized domains in Firebase Console"
