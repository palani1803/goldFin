# 🚀 GoldFin VPS Hosting & Deployment Guide

- **Domain**: `mahesgoldfinance.com` & `www.mahesgoldfinance.com`
- **Backend Port**: `5007` (Node.js / Express API)
- **Frontend**: React + Vite SPA (Static Nginx bundle)
- **Database**: MongoDB Atlas

---

## 📌 Step 1: DNS Configuration (In your Domain Provider - GoDaddy/Namecheap/Cloudflare)

Add two **A Records** pointing to your VPS Public IP Address:

| Type | Name / Host | Value / Points to | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` | `YOUR_VPS_PUBLIC_IP` | Automatic / 300 |
| **A** | `www` | `YOUR_VPS_PUBLIC_IP` | Automatic / 300 |

---

## 📌 Step 2: Clone or Copy Project to your VPS

On your VPS terminal (e.g. `/var/www` or `~/goldFin`):

```bash
cd /var/www
git clone <YOUR_GIT_REPO_URL> goldFin
cd /var/www/goldFin
```

Ensure your `server/.env` file has the production configuration:

```env
PORT=5007
MONGO_URI=mongodb+srv://ppalani1803_db_user:goldFin@cluster0.c6o7dza.mongodb.net/goldfin?retryWrites=true&w=majority&appName=Cluster0
NODE_ENV=production
JWT_SECRET=81d3f3d2a72bae31e25d6c21316f35f392bbff9800f7b1b372dc5c98207adaceebadfe8aa54f9e0e5721b0ae8ab2b61af75babaef1ee370c679d6f715f0f5277
```

---

## 📌 Step 3: Install Dependencies & Run Backend with PM2

```bash
# 1. Install PM2 globally if not already installed
sudo npm install -g pm2

# 2. Install backend dependencies
cd /var/www/goldFin/server
npm install --omit=dev

# 3. Start the backend with PM2 on Port 5007
pm2 start ecosystem.config.cjs

# 4. Save PM2 state so it restarts automatically on VPS reboot
pm2 save
pm2 startup
```

---

## 📌 Step 4: Build Frontend and Move to Web Directory

```bash
cd /var/www/goldFin
npm install
npm run build

# Copy build to Nginx serving directory
sudo mkdir -p /var/www/mahesgoldfinance
sudo cp -r dist /var/www/mahesgoldfinance/
sudo chown -R www-data:www-data /var/www/mahesgoldfinance
sudo chmod -R 755 /var/www/mahesgoldfinance
```

---

## 📌 Step 5: Configure Nginx

Copy the prepared Nginx config file:

```bash
# Copy config to Nginx sites-available
sudo cp /var/www/goldFin/nginx/mahesgoldfinance.com.conf /etc/nginx/sites-available/mahesgoldfinance.com

# Enable the site configuration
sudo ln -sf /etc/nginx/sites-available/mahesgoldfinance.com /etc/nginx/sites-enabled/

# Test Nginx syntax
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

## 📌 Step 6: Install Free SSL Certificate (Certbot)

Run Certbot to enable HTTPS for `mahesgoldfinance.com`:

```bash
# Install Certbot if not installed
sudo apt update
sudo apt install -y certbot python3-certbot-nginx

# Obtain and install SSL certificate
sudo certbot --nginx -d mahesgoldfinance.com -d www.mahesgoldfinance.com
```

Select the option to automatically redirect HTTP traffic to HTTPS (Option 2).

---

## 📌 Automated 1-Click Update Script

Whenever you make new changes in the future, run:

```bash
cd /var/www/goldFin
bash deploy.sh
```

---

## 🔍 Verification & Health Check

1. **Website**: Open `https://mahesgoldfinance.com` in your browser.
2. **Backend Health Check**: Open `https://mahesgoldfinance.com/api/health` — it should return:
   ```json
   {
     "success": true,
     "message": "GoldFin API is running smoothly"
   }
   ```
3. **PM2 Logs**: Check backend status anytime with:
   ```bash
   pm2 status
   pm2 logs goldfin-backend
   ```
