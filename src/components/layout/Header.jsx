/**
 * Header — Vercel-inspired premium navbar
 * Black bar, subtle bottom border, clean tab nav, white CTA
 */
import React, { useState, useEffect } from 'react';
import {
  Code2, Shield, QrCode, AlignLeft,
  Zap, ExternalLink, Menu, X, ChevronRight
} from 'lucide-react';

const TABS = [
  { id: 'json',     label: 'JSON',     fullLabel: 'JSON Formatter',   icon: Code2     },
  { id: 'password', label: 'Password', fullLabel: 'Password Generator', icon: Shield  },
  { id: 'qr',       label: 'QR Code',  fullLabel: 'QR Code Generator', icon: QrCode   },
  { id: 'words',    label: 'Counter',  fullLabel: 'Word Counter',      icon: AlignLeft },
];

export default function Header({ activeTab, onTabChange }) {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: scrolled ? 'rgba(0,0,0,0.92)' : '#000',
        borderBottom: '1px solid #1c1c1c',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'background 0.2s ease',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', height: 56, gap: 8 }}>

          {/* ── Logo ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0, marginRight: 8 }}>
            {/* Vercel-style triangle/icon mark */}
            <div style={{
              width: 28, height: 28,
              background: '#fff',
              borderRadius: 6,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Zap size={15} style={{ color: '#000' }} strokeWidth={2.5} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{
                fontWeight: 600,
                fontSize: '0.9375rem',
                color: '#fff',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}>
                DevToolkit
              </span>
              {/* Separator */}
              <span style={{ color: '#333', fontSize: 18, fontWeight: 300, lineHeight: 1 }}>/</span>
              {/* Active tab label (Vercel breadcrumb style) */}
              <span style={{
                fontWeight: 500,
                fontSize: '0.875rem',
                color: '#666',
                letterSpacing: '-0.01em',
                display: 'none',
              }}
                className="md:hidden"
              >
                {TABS.find(t => t.id === activeTab)?.fullLabel}
              </span>
            </div>
          </div>

          {/* ── Desktop Tab Nav ── */}
          <nav
            style={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}
            className="hidden md:flex"
            role="tablist"
            aria-label="Tool navigation"
          >
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                id={`tab-${id}`}
                role="tab"
                aria-selected={activeTab === id}
                onClick={() => onTabChange(id)}
                className="nav-tab"
                style={{
                  ...(activeTab === id && {
                    color: '#ededed',
                    background: '#161616',
                    boxShadow: '0 0 0 1px #262626',
                  }),
                }}
              >
                <Icon size={14} strokeWidth={1.75} />
                {label}
              </button>
            ))}
          </nav>

          {/* Spacer for mobile */}
          <div style={{ flex: 1 }} className="md:hidden" />

          {/* ── Right side ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>

            {/* Built for Digital Heroes — Vercel-style white button */}
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              id="digital-heroes-btn"
              className="btn-primary hidden sm:inline-flex"
              style={{ textDecoration: 'none' }}
              aria-label="Built for Digital Heroes"
            >
              Built for Digital Heroes
              <ExternalLink size={12} style={{ opacity: 0.6 }} />
            </a>

            {/* Mobile menu toggle */}
            <button
              className="btn-ghost md:hidden"
              onClick={() => setMenuOpen(m => !m)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              style={{ padding: '0 8px' }}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* ── Mobile drawer ── */}
        {menuOpen && (
          <div
            style={{
              borderTop: '1px solid #1c1c1c',
              padding: '8px 0 12px',
            }}
            className="md:hidden animate-slide-down"
          >
            {TABS.map(({ id, fullLabel, icon: Icon }) => (
              <button
                key={id}
                role="tab"
                aria-selected={activeTab === id}
                onClick={() => { onTabChange(id); setMenuOpen(false); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  gap: 10,
                  padding: '10px 8px',
                  background: activeTab === id ? '#161616' : 'transparent',
                  border: 'none',
                  borderRadius: 6,
                  color: activeTab === id ? '#ededed' : '#71717a',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  letterSpacing: '-0.01em',
                  transition: 'background 0.15s, color 0.15s',
                }}
              >
                <Icon size={15} strokeWidth={1.75} />
                {fullLabel}
                {activeTab === id && (
                  <ChevronRight size={14} style={{ marginLeft: 'auto', opacity: 0.4 }} />
                )}
              </button>
            ))}

            <div style={{ height: 1, background: '#1c1c1c', margin: '8px 0' }} />

            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 8px',
                color: '#a1a1aa',
                fontSize: '0.875rem',
                fontWeight: 500,
                textDecoration: 'none',
                letterSpacing: '-0.01em',
              }}
            >
              <ExternalLink size={14} />
              digitalheroesco.com
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
