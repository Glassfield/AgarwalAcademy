# Agarwal Academy - Backend Deployment

## 📦 Setup Instructions

### 1. Install Dependencies on Lightsail

```bash
cd /home/admin/agarwal-academy
mkdir backend
cd backend

# Copy backend files here (server.js, database.js, package.json, .env)

# Install dependencies
npm install
```

### 2. Configure Environment

Edit `.env` file:
```bash
nano .env
```

Update with production values:
```
PORT=3000
NODE_ENV=production
DATABASE_PATH=./database.db
```

### 3. Test the API

```bash
# Start server
npm start

# Test in another terminal
curl http://localhost:3000/api/health
```

### 4. Install PM2 (Process Manager)

```bash
sudo npm install -g pm2

# Start API server with PM2
pm2 start server.js --name agarwal-api

# Make it start on boot
pm2 startup
pm2 save
```

### 5. Configure Nginx as Reverse Proxy

```bash
sudo nano /etc/nginx/nginx.conf
```

Add this location block inside your existing server block:

```nginx
server {
    listen 80;
    root /home/admin/agarwal-academy/dist;
    index index.html;
    
    # Serve React app
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Proxy API requests to Node.js backend
    location /api/ {
        proxy_pass http://localhost:3000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 6. Restart Services

```bash
# Test nginx config
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx

# Check PM2 status
pm2 status

# View logs
pm2 logs agarwal-api
```

### 7. Update Frontend Build

Edit frontend `.env` file for production:
```
VITE_API_BASE_URL=/api
```

Rebuild and deploy:
```bash
# On Windows
npm run build

# Upload new dist folder via WinSCP
# Restart nginx on server
```

## 🔧 Useful PM2 Commands

```bash
pm2 list                 # List all processes
pm2 logs agarwal-api     # View logs
pm2 restart agarwal-api  # Restart API
pm2 stop agarwal-api     # Stop API
pm2 delete agarwal-api   # Remove from PM2
```

## 🗄️ Database Management

```bash
# Backup database
cp backend/database.db backend/database.backup.db

# View database
sqlite3 backend/database.db
.tables
SELECT * FROM inquiries;
.quit
```

## 📊 API Endpoints

- `GET /api/health` - Health check
- `GET /api/inquiries` - Get all inquiries
- `POST /api/inquiries` - Create inquiry
- `PATCH /api/inquiries/:id` - Update inquiry status
- `DELETE /api/inquiries/:id` - Delete inquiry
- `GET /api/tutors` - Get all tutors
- `GET /api/tutors/approved` - Get approved tutors only
- `POST /api/tutors` - Create tutor
- `PUT /api/tutors/:id` - Update tutor
- `DELETE /api/tutors/:id` - Delete tutor
- `GET /api/options` - Get form options
- `POST /api/options` - Add option
- `DELETE /api/options/:category/:optionId` - Delete option
