#!/usr/bin/env bash

# ==============================================================================
# GoldFin Production VPS Deployment Script
# Domain: mahesgoldfinance.com | Backend Port: 5007
# ==============================================================================

set -e

echo "🚀 [1/5] Pulling latest code..."
git pull origin main || echo "Git pull skipped (working directory used)"

echo "📦 [2/5] Installing Backend dependencies..."
cd server
npm install --omit=dev
cd ..

echo "⚡ [3/5] Installing Frontend dependencies & Building production bundle..."
npm install
npm run build

echo "📁 [4/5] Copying build to Nginx web root (/var/www/mahesgoldfinance/dist)..."
sudo mkdir -p /var/www/mahesgoldfinance/dist
sudo cp -r dist/* /var/www/mahesgoldfinance/dist/
sudo chown -R www-data:www-data /var/www/mahesgoldfinance
sudo chmod -R 755 /var/www/mahesgoldfinance

echo "🔄 [5/5] Restarting backend process with PM2 on port 5007..."
pm2 startOrReload ecosystem.config.cjs || pm2 restart goldfin-backend || pm2 start server/server.js --name "goldfin-backend"

echo "🌐 Updating Nginx configuration..."
sudo cp nginx/mahesgoldfinance.com.conf /etc/nginx/sites-available/mahesgoldfinance.com.conf
sudo nginx -t && sudo systemctl reload nginx

echo "✅ Deployment completed successfully for https://mahesgoldfinance.com !"
