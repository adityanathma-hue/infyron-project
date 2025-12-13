# Payment Gateway Setup Guide for Infyron Technologies

## Option 1: Razorpay (Recommended for India) ⭐

### Step 1: Create Razorpay Account
1. Go to https://razorpay.com/
2. Click "Sign Up" and create account with your business email
3. Complete KYC verification (PAN, Aadhaar, Bank details)
4. Verification takes 24-48 hours

### Step 2: Get API Keys
1. Login to Razorpay Dashboard
2. Go to Settings → API Keys
3. Generate Keys - you'll get:
   - Key ID (starts with rzp_live_ or rzp_test_)
   - Key Secret (keep this SECRET!)

### Step 3: Add Keys to Backend
Add these to your `.env` file:
```
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_KEY_SECRET=your_secret_key_here
```

### Step 4: Setup Bank Account
1. Go to Settings → Bank Account
2. Add your bank account details
3. Razorpay will verify with small deposits
4. All payments will auto-transfer to this account

### Features:
- ✅ Accepts: Cards, UPI, Wallets, NetBanking
- ✅ Auto-settlement to bank (T+3 days)
- ✅ Transaction fee: ~2% per transaction
- ✅ Your account details stay hidden
- ✅ Dashboard to track all payments
- ✅ Automatic invoices sent to customers

---

## Option 2: Stripe (International Alternative)

### Setup Steps:
1. Go to https://stripe.com/
2. Create account
3. Add bank details
4. Get API keys from Dashboard
5. Add to `.env`:
```
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxx
```

### Features:
- ✅ Accepts: Cards, Google Pay, Apple Pay
- ✅ Auto-settlement to bank
- ✅ Transaction fee: ~2.9% + ₹2 per transaction

---

## Important Notes:

### Testing Mode:
- Both platforms have test mode
- Use test keys for testing (rzp_test_ or sk_test_)
- Use test cards provided in their docs
- Switch to live keys when ready

### Security:
- NEVER commit API keys to GitHub
- Keys are stored in .env file (already in .gitignore)
- Backend handles all sensitive operations
- Frontend only shows payment UI

### Customer Privacy:
- Your bank details are NEVER shown to customers
- Customers only see "Infyron Technologies"
- Payment gateway handles all card details
- You receive money directly to your account

---

## Backend Files Needed:

I'll create the backend routes for payment processing.
You'll need to install: `npm install razorpay` in your backend.

Let me know which payment gateway you prefer (Razorpay or Stripe) and I'll complete the integration!
