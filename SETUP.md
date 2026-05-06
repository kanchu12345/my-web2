# Infinite Creative Design — Setup Guide

## 1. Add Your Logo
Copy your `image_0.png` (the Infinite Design logo) into:
```
i:\my web\images\logo.png
```

## 2. Firebase Setup
Open `js/firebase-config.js` and replace the placeholder values with your real Firebase project credentials:
- apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId

## 3. Google Analytics
In `index.html`, replace `G-XXXXXXXXXX` with your real GA4 Measurement ID (appears twice).

## 4. Create Admin User
In your Firebase Console → Authentication → Add user with your email/password.

## 5. Firestore Security Rules (paste in Firebase Console)
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /projects/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /settings/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 6. Firebase Storage Rules
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /projects/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null
        && request.resource.size < 5 * 1024 * 1024
        && request.resource.contentType.matches('image/.*');
    }
  }
}
```

## File Structure
```
i:\my web\
├── index.html              ← Main portfolio
├── images\
│   └── logo.png            ← Your Infinite Design logo
├── css\
│   ├── main.css            ← Portfolio styles
│   └── admin.css           ← Admin panel styles
├── js\
│   ├── firebase-config.js  ← Firebase setup (edit this!)
│   ├── main.js             ← Portfolio JS
│   ├── analytics.js        ← GA4 tracking
│   └── dashboard.js        ← Analytics dashboard charts
└── admin\
    ├── login.html          ← Secure login (rate limiting, lockout, 2FA)
    ├── dashboard.html      ← Analytics dashboard
    ├── projects.html       ← Project CRUD manager
    └── settings.html       ← Global settings
```
