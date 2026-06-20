/**
 * App.jsx — Main application shell
 * Handles tab routing, background, and layout composition
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

// Tab → component mapping
const TOOL_COMPONENTS = {
  json:     JsonFormatter,
  password: PasswordGenerator,
  qr:       QrCodeGenerator,
  words:    WordCounter,
};

export default function App() {
  const [activeTab, setActiveTab] = useState('json');
  const { toasts, toast, dismiss } = useToast();

  const ActiveTool = TOOL_COMPONENTS[activeTab];

  return (
    <>
      {/* Ambient background orbs */}
      <div className="bg-mesh" aria-hidden />
      <div className="orb orb-1" aria-hidden />
      <div className="orb orb-2" aria-hidden />

      {/* App layout */}
      <div className="min-h-screen flex flex-col">
        <Header activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Hero banner — shown only on first load */}
        {activeTab === 'json' && (
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8">
            <div className="hero-border glass-card p-6 md:p-8 text-center mb-8 relative overflow-hidden">
              {/* Decorative gradient */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 80% 60% at 50% 50%, #6366f1, transparent)',
                }}
                aria-hidden
              />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/25 text-indigo-400 text-xs font-semibold mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                  Free Developer Tools · No Sign-up Required
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight">
                  Developer <span className="gradient-text">Productivity Toolkit</span>
                </h1>
                <p className="text-slate-400 text-base max-w-xl mx-auto leading-relaxed">
                  A suite of essential tools for developers and students —
                  JSON formatting, secure passwords, QR codes, and text analysis.
                  All in one place. All free.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
                  {['JSON Formatter', 'Password Generator', 'QR Code', 'Word Counter'].map(label => (
                    <span key={label} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-400">
                      ✓ {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        <main
          id="main-content"
          className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-12"
          role="main"
        >
          {/* Tab panel */}
          <div
            key={activeTab}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            className="animate-fade-in"
          >
            <ActiveTool toast={toast} />
          </div>
        </main>

        <Footer />
      </div>

      {/* Toast portal */}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </>
  );
}
