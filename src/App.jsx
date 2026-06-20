/**
 * App.jsx — Application shell
 * Vercel-inspired: black background, clean layout, no decorative elements
 */
import React, { useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ToastContainer from './components/ui/Toast';
import JsonFormatter from './components/tools/JsonFormatter';
import PasswordGenerator from './components/tools/PasswordGenerator';
import QrCodeGenerator from './components/tools/QrCodeGenerator';
import WordCounter from './components/tools/WordCounter';
import { useToast } from './hooks/useToast';
import { Zap, Code2, Shield, QrCode, AlignLeft } from 'lucide-react';

const TOOLS = {
  json:     JsonFormatter,
  password: PasswordGenerator,
  qr:       QrCodeGenerator,
  words:    WordCounter,
};

export default function App() {
  const [activeTab, setActiveTab] = useState('json');
  const { toasts, toast, dismiss } = useToast();

  const ActiveTool = TOOLS[activeTab];

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#000',
      }}
    >
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Hero — only on JSON tab, minimal */}
      {activeTab === 'json' && (
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', padding: '32px 24px 0' }}>
          <div
            className="card animate-fade-in"
            style={{ padding: '32px 40px', textAlign: 'center', position: 'relative' }}
          >
            {/* Subtle top accent line */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 64,
              height: 1,
              background: 'linear-gradient(90deg, transparent, #333, transparent)',
            }} />

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 10px',
              borderRadius: 4,
              fontSize: '0.6875rem',
              fontWeight: 600,
              color: '#a1a1aa',
              background: '#161616',
              border: '1px solid #262626',
              marginBottom: 16,
              letterSpacing: '0.03em',
              textTransform: 'uppercase',
            }}>
              <span style={{
                width: 5, height: 5,
                borderRadius: '50%',
                background: '#22c55e',
                display: 'inline-block',
              }} />
              Open Source · Free Forever
            </div>

            <h1 style={{
              fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
              fontWeight: 700,
              color: '#ededed',
              letterSpacing: '-0.03em',
              lineHeight: 1.2,
              marginBottom: 8,
            }}>
              Developer Productivity Toolkit
            </h1>
            <p style={{
              fontSize: '0.9375rem',
              color: '#71717a',
              maxWidth: 480,
              margin: '0 auto',
              lineHeight: 1.6,
              letterSpacing: '-0.01em',
            }}>
              JSON formatting, secure passwords, QR codes, and text analysis.
              Built for developers who value speed and simplicity.
            </p>

            {/* Feature chips */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 8,
              marginTop: 20,
            }}>
              {[
                { icon: Code2,     label: 'JSON Formatter' },
                { icon: Shield,    label: 'Password Gen' },
                { icon: QrCode,    label: 'QR Code' },
                { icon: AlignLeft, label: 'Word Counter' },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                    padding: '4px 10px',
                    borderRadius: 4,
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    color: '#71717a',
                    border: '1px solid #1c1c1c',
                    background: 'transparent',
                    letterSpacing: '-0.01em',
                  }}
                >
                  <Icon size={12} strokeWidth={1.75} />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <main
        id="main-content"
        role="main"
        style={{
          flex: 1,
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
          padding: '24px 24px 48px',
        }}
      >
        <div key={activeTab} role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
          <ActiveTool toast={toast} />
        </div>
      </main>

      <Footer />
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}
