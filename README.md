
# Microsoft OAuth Test - SIMPLE VERSION

A super simple Next.js app for testing Microsoft OAuth.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Azure AD App:**
   - Create an app in Azure Portal
   - Set redirect URI: `http://localhost:3000`
   - Copy your Client ID and Tenant ID

3. **Configure:**

   **Option 1:** Edit `.env.local`
   ```
   NEXT_PUBLIC_CLIENT_ID=your_client_id_here
   NEXT_PUBLIC_TENANT_ID=your_tenant_id_here
   NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000
   ```

   **Option 2:** Edit directly in `pages/index.tsx` lines 10-12
   ```typescript
   const CLIENT_ID = 'your_client_id_here';
   const TENANT_ID = 'your_tenant_id_here';
   const REDIRECT_URI = 'http://localhost:3000';
   ```

4. **Run:**
   ```bash
   npm run dev
   ```

5. **Test:**
   - Open http://localhost:3000
   - Click "Sign in with Microsoft"
   - Copy the authorization code that appears
   - Send it to your backend

## 📁 File Structure (Super Simple!)

```
├── pages/
│   ├── _app.tsx      # App wrapper (simple)
│   └── index.tsx     # ALL LOGIC IS HERE!
├── .env.local        # Config (or edit directly in code)
└── package.json      # Dependencies
```

## 🎯 What Happens

1. User clicks login → redirected to Microsoft
2. User authenticates → Microsoft redirects back with `code`
3. App displays the `code` → copy and send to backend
4. Backend exchanges `code` for access token

## 🛠️ Troubleshooting

- **Redirect URI mismatch**: Make sure it matches in Azure AD and your config
- **Client ID not found**: Make sure your Client ID is correct
- **Invalid state**: Normal, security feature

## 💡 Pro Tips

- All logic is in `pages/index.tsx` - easy to edit!
- You can configure directly in code (lines 10-12) for quick testing
- Check browser console for debugging
- Authorization code can only be used once, get a new one each time

**DONE! Super simple, right? 😄**