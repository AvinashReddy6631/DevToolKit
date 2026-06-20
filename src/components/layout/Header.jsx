/**
 * Header — App navigation with tab switching and Digital Heroes CTA
 */
import React, { useState, useEffect } from 'react';
import {
  Code2, Shield, QrCode, AlignLeft,
  Zap, ExternalLink, Menu, X
} from 'lucide-react';

const TABS = [
  { id: 'json',     label: 'JSON Formatter',  icon: Code2,    shortLabel: 'JSON'     },
  { id: 'password', label: 'Password Gen',     icon: Shield,   shortLabel: 'Password' },
  { id: 'qr',       label: 'QR Code',          icon: QrCode,   shortLabel: 'QR Code'  },
  { id: 'words',    label: 'Word Counter',     icon: AlignLeft, shortLabel: 'Words'   },
];

/**
 * @param {{ activeTab, onTabChange }} props
 */
export default function Header({ activeTab, onTabChange }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleTabChange = (id) => {
    onTabChange(id);
    setMenuOpen(false);
  };

  return (
    <header
      className={`
        sticky top-0 z-40 transition-all duration-300
        ${scrolled
          ? 'bg-[#080812]/90 backdrop-blur-xl border-b border-white/8 shadow-[0_4px_32px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-glow-sm">
                <Zap size={18} className="text-white" />
              </div>
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 opacity-20 blur-sm -z-10" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-base text-white tracking-tight">DevToolkit</span>
              <span className="hidden md:block text-[11px] text-slate-500 leading-none -mt-0.5">
                Productivity Suite
              </span>
            </div>
          </div>

          {/* Desktop Tab Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-white/3 border border-white/6 rounded-xl p-1">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                id={`tab-${id}`}
                onClick={() => handleTabChange(id)}
                className={`tab-item ${activeTab === id ? 'active' : ''}`}
                aria-selected={activeTab === id}
                role="tab"
              >
                <Icon size={15} />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          {/* Right: Digital Heroes CTA + Mobile menu toggle */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Digital Heroes button */}
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              id="digital-heroes-btn"
              className="
                hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl
                font-semibold text-sm text-white cursor-pointer
                bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500
                hover:shadow-[0_0_24px_rgba(99,102,241,0.5)]
                hover:-translate-y-0.5
                transition-all duration-200
                border border-white/10
              "
              aria-label="Built for Digital Heroes — Visit digitalheroesco.com"
            >
              <Zap size={14} className="shrink-0" />
              <span>Built for Digital Heroes</span>
              <ExternalLink size={12} className="opacity-70" />
            </a>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg btn-ghost"
              onClick={() => setMenuOpen(m => !m)}
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/8 py-3 pb-4 animate-slide-up">
            <nav className="flex flex-col gap-1">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => handleTabChange(id)}
                  className={`tab-item w-full justify-start px-4 py-3 ${activeTab === id ? 'active' : ''}`}
                  aria-selected={activeTab === id}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
              <a
                href="https://digitalheroesco.com"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-2 mx-0 flex items-center justify-center gap-2 px-4 py-3 rounded-xl
                  font-semibold text-sm text-white
                  bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500
                  border border-white/10
                "
              >
                <Zap size={14} />
                Built for Digital Heroes
                <ExternalLink size={12} className="opacity-70" />
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
