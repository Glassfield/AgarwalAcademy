# AWS Lightsail Deployment Guide

## Prerequisites
- AWS Account
- Domain name (optional but recommended)
- Firebase project with authorized domains configured

## Step 1: Create Lightsail Instance

1. **Login to AWS Console**
   - Go to https://lightsail.aws.amazon.com/

2. **Create Instance**
   - Click "Create instance"
   - Choose region: **Asia Pacific (Mumbai)** or closest to you
   - Select platform: **Linux/Unix**
   - Select blueprint: **OS Only** → **Ubuntu 22.04 LTS**
   - Choose instance plan: **$5/month** (1 GB RAM, 1 vCPU) is sufficient to start
   - Name your instance: `agarwal-academy`
   - Click "Create instance"

3. **Wait for Instance to Start**
   - Wait 2-3 minutes for instance to be "Running"

## Step 2: Connect to Instance

1. **Using SSH in Browser**
   - Click on your instance name
   - Click "Connect using SSH" button
   - A terminal window will open

2. **Or Using SSH Client (Optional)**
   - Download SSH key from Lightsail console
   - Connect: `ssh -i LightsailDefaultKey.pem ubuntu@YOUR_INSTANCE_IP`

## Step 3: Upload Project Files

### Option A: Using Git (Recommended)

```bash
# On your Lightsail instance
cd /home/ubuntu
git clone https://github.com/YOUR_USERNAME/agarwal-academy.git
cd agarwal-academy
```

### Option B: Using SCP (Manual Upload)

```bash
# On your local machine (PowerShell)
# First, download SSH key from Lightsail console
cd "C:\Projects\Agarwal academy"

# Compress project
Compress-Archive -Path * -DestinationPath agarwal-academy.zip

# Upload using SSH
scp -i path\to\LightsailDefaultKey.pem agarwal-academy.zip ubuntu@YOUR_INSTANCE_IP:/home/ubuntu/

# On Lightsail instance
cd /home/ubuntu
unzip agarwal-academy.zip -d agarwal-academy
```

### Option C: Using Lightsail File Upload

1. In Lightsail console, click your instance
2. Go to "Networking" tab
3. Under "IPv4 Firewall", ensure port 80 (HTTP) and 443 (HTTPS) are open
4. Use SFTP client like FileZilla to upload files

## Step 4: Create Environment File

```bash
# On Lightsail instance
cd /home/ubuntu/agarwal-academy
nano .env
```

Add your environment variables:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_BASE_URL=https://api.agarwalacademy.in
```

Save and exit (Ctrl+X, then Y, then Enter)

## Step 5: Run Deployment Script

```bash
cd /home/ubuntu/agarwal-academy
chmod +x .lightsail/lightsail-deploy.sh
sudo ./.lightsail/lightsail-deploy.sh
```

This script will:
- Install Node.js 20.x
- Install Nginx web server
- Install project dependencies
- Build production version
- Configure Nginx
- Start the web server

## Step 6: Configure Firewall

1. **In Lightsail Console**
   - Go to your instance → "Networking" tab
   - Under "IPv4 Firewall", ensure these ports are open:
     - HTTP: Port 80
     - HTTPS: Port 443 (for SSL later)

## Step 7: Test Your Website

1. **Get your IP address**
   - In Lightsail console, copy your instance's public IP
   - Example: `13.232.xxx.xxx`

2. **Open in browser**
   - Go to `http://YOUR_INSTANCE_IP`
   - You should see your website!

## Step 8: Configure Domain (Optional)

### 8.1 Create Static IP
1. In Lightsail, go to "Networking" tab
2. Click "Create static IP"
3. Attach to your instance
4. Note the static IP address

### 8.2 Configure DNS
1. Go to your domain registrar (GoDaddy, Namecheap, etc.)
2. Add DNS records:
   ```
   Type: A Record
   Name: @ (or www)
   Value: YOUR_STATIC_IP
   TTL: 3600
   ```

### 8.3 Wait for DNS Propagation
- Usually takes 5-60 minutes

## Step 9: Setup SSL Certificate (Optional but Recommended)

```bash
# On Lightsail instance
sudo apt-get install -y certbot python3-certbot-nginx

# Replace with your domain
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow prompts
# Choose option 2 to redirect HTTP to HTTPS

# Test auto-renewal
sudo certbot renew --dry-run
```

## Step 10: Configure Firebase Authorized Domains

1. Go to Firebase Console
2. Select your project
3. Go to **Authentication** → **Settings** → **Authorized domains**
4. Add:
   - Your domain: `yourdomain.com`
   - Your static IP: `13.232.xxx.xxx`

## Post-Deployment Tasks

### Monitor Logs
```bash
# Nginx access logs
sudo tail -f /var/log/nginx/access.log

# Nginx error logs
sudo tail -f /var/log/nginx/error.log
```

### Update Website
```bash
cd /home/ubuntu/agarwal-academy

# Pull latest changes (if using Git)
git pull origin main

# Or upload new files via SFTP

# Rebuild
npm install
npm run build

# Restart Nginx
sudo systemctl restart nginx
```

### Backup
```bash
# Create backup
cd /home/ubuntu
tar -czf agarwal-academy-backup-$(date +%Y%m%d).tar.gz agarwal-academy/

# Download backup
# Use SFTP or AWS console to download
```

## Troubleshooting

### Website not loading
```bash
# Check Nginx status
sudo systemctl status nginx

# Restart Nginx
sudo systemctl restart nginx

# Check Nginx configuration
sudo nginx -t
```

### Build fails
```bash
# Check Node.js version
node -v  # Should be 20.x

# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

### OTP not working
- Add your domain/IP to Firebase Authorized Domains
- Check browser console for errors
- Verify .env file has correct Firebase credentials

## Cost Estimation

- **Lightsail Instance**: $5/month (512 MB RAM) or $10/month (1 GB RAM)
- **Static IP**: Free (while attached to instance)
- **Data Transfer**: 1-2 TB included
- **Domain**: $10-15/year (from registrar)
- **SSL Certificate**: Free (Let's Encrypt)

**Total Monthly Cost**: ~$5-10 USD

## Support

For issues:
1. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
2. Check Firebase Console for authentication errors
3. Verify .env file has all required variables
4. Ensure ports 80 and 443 are open in Lightsail firewall

---

**Note**: This guide assumes you're deploying a static React site. For backend API integration, you'll need additional setup for Node.js/Express server, database, etc.
