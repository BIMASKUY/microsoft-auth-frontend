import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // SIMPLE CONFIG - ONLY CHANGE THIS ON CREDS!
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID as string;
  const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID as string;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI as string;

  // Generate random string
  const generateRandomString = (length: number): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Build OAuth URL
  const buildAuthUrl = (state: string): string => {
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      response_type: 'code',
      redirect_uri: REDIRECT_URI,
      scope: 'openid profile email User.Read',
      state: state,
      response_mode: 'query',
      prompt: 'select_account'
    });
    return `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/authorize?${params.toString()}`;
  };

  const initiateLogin = () => {
    setIsLoading(true);
    setStatus({ message: 'Redirecting to Microsoft login...', type: 'info' });

    // Generate and store state parameter
    const state = generateRandomString(32);
    sessionStorage.setItem('oauth_state', state);

    // Build authorization URL and redirect
    const authUrl = buildAuthUrl(state);
    window.location.href = authUrl;
  };

  return (
    <>
      <Head>
        <title>Microsoft OAuth Login</title>
        <meta name="description" content="Simple Microsoft OAuth Test" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .container {
          background: white;
          border-radius: 12px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 500px;
          width: 100%;
        }

        h1 {
          color: #333;
          margin-bottom: 10px;
          font-size: 28px;
          font-weight: 600;
        }

        p {
          color: #666;
          margin-bottom: 30px;
          line-height: 1.5;
        }

        .login-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          width: 100%;
          padding: 15px 20px;
          background: #0078d4;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 20px;
        }

        .login-button:hover {
          background: #106ebe;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 120, 212, 0.3);
        }

        .login-button:disabled {
          background: #ccc;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .status {
          padding: 12px;
          border-radius: 6px;
          margin: 10px 0;
          font-weight: 500;
        }

        .status.success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .status.error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        .status.info {
          background: #d1ecf1;
          color: #0c5460;
          border: 1px solid #bee5eb;
        }

        .instructions {
          margin-top: 20px;
          font-size: 14px;
          color: #666;
          text-align: left;
        }

        .config-info {
          margin-top: 20px;
          padding: 15px;
          background: #fff3cd;
          border: 1px solid #ffeaa7;
          border-radius: 6px;
          font-size: 14px;
          text-align: left;
        }

        .loading {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 2px solid #ffffff;
          border-radius: 50%;
          border-top-color: transparent;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>

      <div className="container">
        <h1>Microsoft OAuth Test</h1>
        <p>Simple OAuth flow. Klik tombol untuk login dengan Microsoft.</p>

        {/* CONFIG INFO */}
        <div className="config-info">
          <strong>Current Config:</strong><br/>
          Client ID: {CLIENT_ID}<br/>
          Tenant: {TENANT_ID}<br/>
          Redirect: {REDIRECT_URI}
        </div>

        <button 
          className="login-button" 
          onClick={initiateLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="loading"></span>
              Redirecting...
            </>
          ) : (
            <>
              🔐 Sign in with Microsoft
            </>
          )}
        </button>

        {status && (
          <div className={`status ${status.type}`}>
            {status.message}
          </div>
        )}

        <div className="instructions">
          <strong>Setup:</strong><br/>
          Update .env.local dengan credentials Anda<br/>
        </div>
      </div>
    </>
  );
}
