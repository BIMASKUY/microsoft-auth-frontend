import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function MicrosoftCallback() {
  const [authCode, setAuthCode] = useState<string | null>(null);
  const [status, setStatus] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    handleOAuthCallback();
  }, [router.isReady]);

  const handleOAuthCallback = () => {
    if (!router.isReady) return;

    const { code, state, error, error_description } = router.query;

    // Check for errors
    if (error) {
      setStatus({
        message: `❌ Authentication failed: ${error} - ${error_description}`,
        type: 'error'
      });
      return;
    }

    // Check if we have a code
    if (code) {
      // Validate state parameter
      const storedState = sessionStorage.getItem('oauth_state');
      if (state !== storedState) {
        setStatus({
          message: '⚠️ Invalid state parameter. Possible security issue.',
          type: 'error'
        });
        return;
      }

      // Display the authorization code
      setAuthCode(code as string);
      setStatus({
        message: '✅ Success! Authorization code berhasil diterima.',
        type: 'success'
      });

      // Clean up session storage
      sessionStorage.removeItem('oauth_state');
    }
  };

  const copyToClipboard = async () => {
    if (!authCode) return;

    try {
      await navigator.clipboard.writeText(authCode);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = authCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const goBack = () => {
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>Microsoft OAuth Callback</title>
        <meta name="description" content="Microsoft OAuth Callback Result" />
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
          max-width: 700px;
          width: 100%;
        }

        h1 {
          color: #333;
          margin-bottom: 20px;
          font-size: 28px;
          font-weight: 600;
        }

        .status {
          padding: 15px;
          border-radius: 8px;
          margin: 20px 0;
          font-weight: 500;
          font-size: 16px;
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

        .code-output {
          margin-top: 30px;
          padding: 25px;
          background: #f8f9fa;
          border-radius: 10px;
          border: 1px solid #e9ecef;
        }

        .code-output h3 {
          color: #333;
          margin-bottom: 15px;
          font-size: 20px;
        }

        .code-instruction {
          color: #666;
          margin-bottom: 20px;
          font-size: 14px;
        }

        .auth-code {
          background: #fff;
          border: 2px solid #28a745;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
          font-family: 'Courier New', monospace;
          font-size: 13px;
          word-break: break-all;
          color: #333;
          line-height: 1.5;
          max-height: 250px;
          overflow-y: auto;
          text-align: left;
        }

        .button-group {
          display: flex;
          gap: 15px;
          justify-content: center;
          margin-top: 20px;
        }

        .copy-button, .back-button {
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          transition: all 0.3s ease;
          min-width: 120px;
        }

        .copy-button {
          background: #28a745;
          color: white;
        }

        .copy-button:hover {
          background: #218838;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
        }

        .back-button {
          background: #0078d4;
          color: white;
        }

        .back-button:hover {
          background: #106ebe;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 120, 212, 0.3);
        }

        .loading {
          color: #666;
          font-style: italic;
          font-size: 18px;
          padding: 40px;
        }

        .warning {
          margin-top: 20px;
          padding: 15px;
          background: #fff3cd;
          border: 1px solid #ffeaa7;
          border-radius: 8px;
          font-size: 14px;
          color: #856404;
        }

        .loading-spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 2px solid #ccc;
          border-radius: 50%;
          border-top-color: #0078d4;
          animation: spin 1s linear infinite;
          margin-right: 10px;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 20px;
            margin: 10px;
          }
          
          .button-group {
            flex-direction: column;
            align-items: center;
          }
          
          .copy-button, .back-button {
            width: 100%;
            max-width: 200px;
          }
        }
      `}</style>

      <div className="container">
        <h1>🔐 Microsoft OAuth Result</h1>

        {status && (
          <div className={`status ${status.type}`}>
            {status.message}
          </div>
        )}

        {authCode && (
          <div className="code-output">
            <h3>🎯 Authorization Code</h3>
            <div className="code-instruction">
              Copy kode di bawah ini dan kirim ke backend Anda untuk mendapatkan access token:
            </div>
            <div className="auth-code">
              {authCode}
            </div>
            
            <div className="button-group">
              <button 
                className="copy-button"
                onClick={copyToClipboard}
              >
                {copySuccess ? '✅ Copied!' : '📋 Copy Code'}
              </button>
              <button 
                className="back-button"
                onClick={goBack}
              >
                🏠 Back to Home
              </button>
            </div>

            <div className="warning">
              <strong>⚠️ Important:</strong> Authorization code ini akan expired dalam beberapa menit. 
              Segera kirim ke backend untuk ditukar dengan access token!
            </div>
          </div>
        )}

        {!authCode && !status && (
          <div className="loading">
            <span className="loading-spinner"></span>
            Processing OAuth callback...
          </div>
        )}

        {status?.type === 'error' && (
          <div className="button-group">
            <button 
              className="back-button"
              onClick={goBack}
            >
              🏠 Try Again
            </button>
          </div>
        )}
      </div>
    </>
  );
}
