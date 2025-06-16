# 🚀 Joker's Arena - Vercel Deployment Guide

## 🎯 Deploy Gratuit pe Vercel + GitHub + Neon Database

### **Pasul 1: Setup Bază de Date Neon (100% GRATUIT)**

1. **Mergi pe**: https://neon.tech
2. **Connect with GitHub** (pentru sign up)
3. **Create New Project**:
   - Project name: `jokersarena-db`
   - Database name: `jokersarena`
   - Region: `US East (Ohio)` (cel mai rapid)
4. **Copiază Connection String**:
   - Din Dashboard → Connection Details
   - Format: `postgresql://username:password@ep-XXX.neon.tech/jokersarena?sslmode=require`

### **Pasul 2: Push la GitHub**

```bash
# Dacă nu ai repository încă
git init
git add .
git commit -m "Initial commit - Joker's Arena Casino"

# Creează repository pe GitHub și push
git remote add origin https://github.com/your-username/jokersarena.git
git branch -M main
git push -u origin main
```

### **Pasul 3: Deploy pe Vercel**

1. **Mergi pe**: https://vercel.com
2. **Import from GitHub**
3. **Selectează repository**: `jokersarena`
4. **Configure Project**:
   - Framework Preset: `Other`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### **Pasul 4: Environment Variables în Vercel**

În **Vercel Dashboard** → **Project Settings** → **Environment Variables**, adaugă:

```env
# Database
DATABASE_URL=postgresql://username:password@ep-XXX.neon.tech/jokersarena?sslmode=require

# Solana
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
SOLANA_PRIVATE_KEY=your_private_key_base58_format
WALLET_ADDRESS=your_wallet_public_address

# Telegram Bot (Opțional)
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id

# App Configuration
NODE_ENV=production
PORT=3000

# JOKER Token
JOKER_TOKEN_MINT=jkercFfxVbfDtQUHRF7G6KKpGDEp3KjkBYrgESAjzJK
JOKER_DECIMALS=6

# Game Configuration
MIN_BET=50000
MAX_BET=1000000
HOUSE_EDGE=0.02
```

### **Pasul 5: Setup Database Schema**

După primul deploy:

1. **Vercel Dashboard** → **Functions** → **View Function Logs**
2. **Rulează migrație** prin API call:
   ```bash
   curl -X POST https://your-app.vercel.app/api/setup-db
   ```

Sau conectează-te la Neon și rulează manual schema-ul.

### **Pasul 6: Custom Domain (Opțional)**

1. **Vercel Dashboard** → **Settings** → **Domains**
2. **Add Domain**: `jokersarena.com`
3. **Configure DNS** la domain provider-ul tău
4. **SSL** se configurează automat

## 🎰 **URLs După Deploy**

- **Production**: `https://your-app.vercel.app`
- **Casino**: `https://your-app.vercel.app/casino`
- **Admin**: `https://your-app.vercel.app/admin`
- **API**: `https://your-app.vercel.app/api/*`

## 🔧 **Verificări Finale**

### **Test Production Build Local**

```bash
# Test build local
npm run build
npm start

# Verifică că merge pe http://localhost:5000
```

### **Test Environment Variables**

```bash
# Test connection la Neon
node -e "
const { Client } = require('pg');
const client = new Client({
  connectionString: 'YOUR_NEON_URL'
});
client.connect().then(() => {
  console.log('✅ Database connected!');
  client.end();
}).catch(console.error);
"
```

### **Monitor Deploy**

În **Vercel Dashboard**:
- **Deployments** → Vezi status build
- **Functions** → Vezi logs runtime  
- **Analytics** → Monitor traffic

## 🎮 **Features Live pe Vercel**

✅ **Frontend React** complet funcțional  
✅ **API Backend** cu toate endpoint-urile  
✅ **Database PostgreSQL** în cloud (Neon)  
✅ **Wallet Integration** pentru Solana  
✅ **Real-time Gaming** cu verificare blockchain  
✅ **Admin Panel** pentru management  
✅ **SSL Certificate** automat  
✅ **Global CDN** pentru performanță  

## 🚨 **Troubleshooting Vercel**

### **Build Fails**

```bash
# Verifică dependencies
npm install
npm run build

# Dacă ai erori TypeScript
npm run check
```

### **API Routes Not Working**

- Verifică `vercel.json` routing
- Asigură-te că toate API routes sunt în `/api/*`
- Check Environment Variables în Vercel

### **Database Connection Fails**

- Verifică Neon database este ACTIVE
- Check connection string în Environment Variables
- Asigură-te că `?sslmode=require` este în URL

### **Cold Starts**

- Vercel free tier are cold starts
- Prima request poate dura 2-3 secunde
- Upgrade la Pro pentru warm instances

## 💰 **Costurile (TOT GRATUIT)**

- **Vercel Hobby**: Gratuit
  - 100GB bandwidth/lună
  - 100 deployments/zi
  - Custom domains
  - SSL automat

- **Neon Free Tier**: Gratuit
  - 10GB storage
  - 100 ore compute/lună
  - 1 database

- **GitHub**: Gratuit pentru public repos

**Total Cost: $0/lună** 🎉

## 🎯 **Următorii Pași**

1. **Test totul** în production
2. **Invite beta users** pentru feedback
3. **Setup monitoring** cu Vercel Analytics
4. **Configure custom domain**
5. **Setup CI/CD** pentru auto-deploy
6. **Monitor performance** și optimize

## 🔗 **Resurse Utile**

- **Vercel Docs**: https://vercel.com/docs
- **Neon Docs**: https://neon.tech/docs
- **Solana Docs**: https://docs.solana.com/
- **Next.js + Vercel**: https://nextjs.org/learn

---

## 🎰 **Your Casino is Ready for the World!**

🚀 **Live URL**: `https://your-app.vercel.app`  
🎮 **Play Now**: `https://your-app.vercel.app/casino`  
👨‍💼 **Admin**: `https://your-app.vercel.app/admin`  

**Good luck with your decentralized casino empire!** 🃏 