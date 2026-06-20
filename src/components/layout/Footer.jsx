/**
 * Footer — Minimal, Stripe-inspired footer
 */
import React from 'react';
import { Mail, ExternalLink, Zap } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      borderTop: '1px solid #1c1c1c',
      marginTop: 80,
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '32px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}>

        {/* Main row */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
        }}>

          {/* Author block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 22, height: 22,
                background: '#fff',
                borderRadius: 4,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Zap size={12} style={{ color: '#000' }} strokeWidth={2.5} />
              </div>
              <span style={{
                fontWeight: 600,
                fontSize: '0.875rem',
                color: '#ededed',
                letterSpacing: '-0.02em',
              }}>
                DevToolkit
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{
                fontSize: '0.8125rem',
                fontWeight: 500,
                color: '#a1a1aa',
                letterSpacing: '-0.01em',
              }}>
                Avinash Reddy
              </span>
              <a
                href="mailto:dareddy2005@gmail.com"
                id="footer-email"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  fontSize: '0.8125rem',
                  color: '#71717a',
                  textDecoration: 'none',
                  letterSpacing: '-0.01em',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#a1a1aa'}
                onMouseLeave={e => e.currentTarget.style.color = '#71717a'}
              >
                <Mail size={12} />
                dareddy2005@gmail.com
              </a>
            </div>
          </div>

          {/* Center — copyright */}
          <p style={{
            fontSize: '0.8125rem',
            color: '#3f3f46',
            letterSpacing: '-0.01em',
          }}>
            © {year} Avinash Reddy
          </p>

          {/* Digital Heroes link */}
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            id="footer-digital-heroes"
            className="btn-secondary"
            style={{ textDecoration: 'none', fontSize: '0.8125rem' }}
          >
            <Zap size={13} strokeWidth={2} />
            Built for Digital Heroes
            <ExternalLink size={11} style={{ opacity: 0.5 }} />
          </a>
        </div>
      </div>
    </footer>
  );
}
