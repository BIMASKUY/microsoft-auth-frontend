# Microsoft OAuth Test - SIMPLE VERSION

Aplikasi Next.js super simple untuk testing Microsoft OAuth.

## � Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Setup Azure AD App:**
   - Buat app di Azure Portal
   - Set redirect URI: `http://localhost:3000`
   - Copy Client ID dan Tenant ID

3. **Configure:**
   
   **Option 1:** Edit `.env.local`
   ```
   NEXT_PUBLIC_CLIENT_ID=your_client_id_here
   NEXT_PUBLIC_TENANT_ID=your_tenant_id_here
   NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000
   ```
   
   **Option 2:** Edit langsung di `pages/index.tsx` line 10-12
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
   - Buka http://localhost:3000
   - Klik "Sign in with Microsoft"
   - Copy authorization code yang muncul
   - Kirim ke backend Anda

## 📁 File Structure (Super Simple!)

```
├── pages/
│   ├── _app.tsx      # App wrapper (simple)
│   └── index.tsx     # SEMUA LOGIC DI SINI!
├── .env.local        # Config (atau edit langsung di code)
└── package.json      # Dependencies
```

## 🎯 Yang Terjadi

1. User klik login → redirect ke Microsoft
2. User authenticate → Microsoft redirect balik dengan `code`
3. App tampilkan `code` → copy dan kirim ke backend
4. Backend exchange `code` jadi access token

## � Troubleshooting

- **Redirect URI mismatch**: Pastikan di Azure AD sama dengan config
- **Client ID not found**: Pastikan Client ID benar
- **Invalid state**: Normal, security feature

## 💡 Pro Tips

- Semua logic ada di `pages/index.tsx` - gampang di-edit!
- Config bisa langsung di code (line 10-12) untuk testing cepat
- Lihat browser console untuk debug
- Authorization code cuma bisa dipake 1x, harus ambil baru

**DONE! Simple banget kan? 😄**