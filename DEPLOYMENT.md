# Infyron Technologies - Deployment Guide

## ✅ Project Ready for Deployment!

### 📦 What's Been Prepared:
- Frontend configured for Vercel
- Backend configured for Render
- Environment variables set up
- API endpoint made configurable

---

## 🚀 Step-by-Step Deployment

### **1. Deploy Backend (Render)**

1. **Sign up for Render**: https://render.com (free tier available)

2. **Create a new Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub account (or use Git repository)
   - If not using Git, select "Public Git Repository" and use: `https://github.com/yourusername/infyron-project`

3. **Configure the service**:
   - **Name**: `infyron-backend`
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: Leave empty (or put `.` if needed)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

4. **Add Environment Variables** (in Render dashboard):
   - `MONGO_URI`: Your MongoDB connection string
     - Get free MongoDB at https://www.mongodb.com/cloud/atlas
     - Format: `mongodb+srv://username:password@cluster.mongodb.net/infyron?retryWrites=true&w=majority`
   - `PORT`: `10000` (Render's default)
   - `NODE_ENV`: `production`

5. **Deploy**: Click "Create Web Service"
   - Note the URL (e.g., `https://infyron-backend.onrender.com`)

---

### **2. Deploy Frontend (Vercel)**

1. **Sign up for Vercel**: https://vercel.com (free tier)

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Import your GitHub repository (or use Vercel CLI)
   - Select the `frontend` folder as root directory

3. **Configure Build**:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **Add Environment Variable**:
   - `VITE_API_URL`: Your Render backend URL (e.g., `https://infyron-backend.onrender.com`)

5. **Deploy**: Click "Deploy"
   - Your site will be live at `https://infyron-frontend.vercel.app`

---

### **3. Get a Custom Domain**

#### **Purchase Domain:**
- **Namecheap**: https://www.namecheap.com (~$10-15/year)
- **Google Domains**: https://domains.google (if available in your region)
- **Cloudflare**: https://www.cloudflare.com/products/registrar/

**Recommended**: `infyron.com` or `infyron.tech`

#### **Connect Domain to Vercel (Frontend)**:
1. In Vercel dashboard → Settings → Domains
2. Add your domain (e.g., `infyron.com`)
3. Update DNS records at your domain registrar:
   - **Type**: `A` → **Value**: Vercel's IP (Vercel will show this)
   - **Type**: `CNAME` → **Name**: `www` → **Value**: `cname.vercel-dns.com`

#### **Connect Domain to Render (Backend - optional)**:
1. In Render dashboard → Settings → Custom Domain
2. Add subdomain (e.g., `api.infyron.com`)
3. Add CNAME record at your registrar:
   - **Type**: `CNAME` → **Name**: `api` → **Value**: Your Render URL

---

### **4. Set Up Company Email**

#### **Option A: Google Workspace** ($6/user/month)
1. Go to: https://workspace.google.com
2. Sign up with your domain
3. Verify domain ownership (add TXT record to DNS)
4. Create email: `contact@infyron.com`

#### **Option B: Zoho Mail** (Free for 1 domain, 5 users)
1. Go to: https://www.zoho.com/mail/
2. Sign up with your domain
3. Add MX records to your DNS
4. Create email: `contact@infyron.com`

#### **Option C: Cloudflare Email Routing** (Free forwarding)
1. Transfer domain to Cloudflare (or use Cloudflare DNS)
2. Enable Email Routing
3. Forward `contact@infyron.com` → your personal Gmail

---

## 🔧 Alternative: Deploy Without GitHub

### **If you don't want to use Git:**

#### **Frontend (Vercel CLI)**:
```bash
cd /Users/adi/infyron-project/frontend
npm install -g vercel
vercel login
vercel --prod
```

#### **Backend (Railway - easier without Git)**:
1. Sign up: https://railway.app
2. Click "New Project" → "Empty Project"
3. Click "New" → "Database" → "Add MongoDB"
4. Click "New" → "Empty Service"
5. In service settings:
   - Upload your backend files (zip the project)
   - Set start command: `npm start`
   - Add environment variables

---

## 📋 Quick Checklist

- [ ] Sign up for Render
- [ ] Create MongoDB Atlas free cluster
- [ ] Deploy backend to Render with MONGO_URI
- [ ] Note backend URL
- [ ] Sign up for Vercel
- [ ] Deploy frontend with VITE_API_URL pointing to backend
- [ ] Test the live site
- [ ] Purchase domain
- [ ] Connect domain to Vercel
- [ ] Set up company email
- [ ] Add email notifications (we'll do this after email is ready)

---

## 🆘 Need Help?

Let me know which step you're on and I'll guide you through it!
