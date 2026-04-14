# Firebase Setup Guide for Agarwal Academy

## 📱 OTP Verification with Firebase Authentication

The Student Enquiry Form uses Firebase Phone Authentication for OTP verification. Follow these steps to set it up.

---

## 🔥 Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter project name: `agarwal-academy`
4. Disable Google Analytics (optional)
5. Click **"Create project"**

---

## 📞 Step 2: Enable Phone Authentication

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Click **"Phone"** provider
3. Click **"Enable"**
4. Save changes

---

## 🔑 Step 3: Get Firebase Configuration

1. In Firebase Console, click **⚙️ Settings** → **Project settings**
2. Scroll to **"Your apps"** section
3. Click **"Web"** icon (</>) to add a web app
4. Register app name: `Agarwal Academy Web`
5. Copy the Firebase configuration object

It will look like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "agarwal-academy.firebaseapp.com",
  projectId: "agarwal-academy",
  storageBucket: "agarwal-academy.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

---

## 🌐 Step 4: Add Authorized Domains

1. Go to **Authentication** → **Settings** → **Authorized domains**
2. Add your domains:
   - `localhost` (already added by default)
   - Your production domain (e.g., `agarwalacademy.in`)

---

## 📝 Step 5: Configure Environment Variables

Create a `.env` file in your project root (copy from `.env.example`):

```env
# Firebase Configuration (for OTP Verification)
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=agarwal-academy.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=agarwal-academy
VITE_FIREBASE_STORAGE_BUCKET=agarwal-academy.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
```

⚠️ **Important:** Never commit `.env` to version control. It's already in `.gitignore`.

---

## 🧪 Step 6: Test Phone Numbers (Development)

For testing without sending real SMS:

1. Go to **Authentication** → **Settings** → **Phone numbers for testing**
2. Add test phone numbers:
   - Phone: `+919876543210`
   - OTP: `123456`

Now you can test OTP without real SMS being sent.

---

## 🚀 Step 7: Install Dependencies & Run

```bash
npm install firebase
npm run dev
```

Navigate to: `http://localhost:5173/enquiry`

---

## 📋 How It Works

1. **User enters mobile number** (10 digits, India only)
2. **Click "Send OTP"** → Firebase sends 6-digit OTP via SMS
3. **OTP Modal opens** → User enters received OTP
4. **Firebase verifies OTP** → If valid, form submits
5. **Success page** → Confirmation shown

---

## 🔐 Security Best Practices

### 1. Enable App Check (Recommended)
Prevents abuse by verifying requests come from your app.

1. Go to **App Check** in Firebase Console
2. Register your app
3. Choose provider: reCAPTCHA v3
4. Follow setup instructions

### 2. Set Usage Quotas
1. Go to **Authentication** → **Settings** → **SMS quota**
2. Set daily limits to prevent abuse
3. Enable budget alerts

### 3. Rate Limiting
Firebase automatically rate limits phone authentication:
- Max 10 SMS per phone number per hour
- Max 5 verification attempts per session

---

## 🐛 Troubleshooting

### ❌ "reCAPTCHA verification failed"
**Solution:** Add your domain to authorized domains in Firebase Console.

### ❌ "quota exceeded"
**Solution:** Wait 1 hour or upgrade Firebase plan.

### ❌ "invalid phone number"
**Solution:** Ensure number format is `+919876543210` (country code + 10 digits).

### ❌ "Firebase not initialized"
**Solution:** Check all environment variables are set correctly in `.env`.

---

## 💰 Pricing

Firebase Authentication is **FREE** for most use cases:

- **Free Tier:** 10,000 phone verifications/month
- **Beyond:** $0.06 per verification

For Agarwal Academy with ~100-200 enquiries/month, it will remain free.

---

## 🔗 Useful Links

- [Firebase Console](https://console.firebase.google.com/)
- [Firebase Phone Auth Docs](https://firebase.google.com/docs/auth/web/phone-auth)
- [Firebase Pricing](https://firebase.google.com/pricing)
- [Firebase Support](https://firebase.google.com/support)

---

## ✅ Verification Checklist

- [ ] Firebase project created
- [ ] Phone authentication enabled
- [ ] Web app registered in Firebase
- [ ] Environment variables configured
- [ ] Authorized domains added
- [ ] Test phone numbers configured (for dev)
- [ ] Dependencies installed (`npm install firebase`)
- [ ] App running (`npm run dev`)
- [ ] Form accessible at `/enquiry`
- [ ] OTP sending successfully
- [ ] OTP verification working

---

**Need Help?** Check Firebase Console error logs or contact Firebase Support.
