/**
 * Footer — App footer with author info and attribution
 */
import React from 'react';
import { Mail, Heart, ExternalLink, Zap, Github } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-white/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Author info */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <Zap size={14} className="text-white" />
              </div>
              <span className="font-bold text-slate-200 text-base">DevToolkit</span>
            </div>
            <div className="flex flex-col items-center md:items-start gap-1 text-sm">
              <span className="text-slate-300 font-semibold">Avinash Reddy</span>
              <a
                href="mailto:dareddy2005@gmail.com"
                id="footer-email"
                className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 transition-colors"
                aria-label="Email Avinash Reddy"
              >
                <Mail size={13} />
                dareddy2005@gmail.com
              </a>
            </div>
          </div>

          {/* Center — copyright */}
          <div className="text-center text-slate-500 text-sm">
            <p>
              Made with{' '}
              <Heart size={12} className="inline text-pink-500 mx-0.5" fill="currentColor" />{' '}
              for developers & students
            </p>
            <p className="mt-1">© {year} Avinash Reddy · All rights reserved</p>
          </div>

          {/* Right — Digital Heroes link */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              id="footer-digital-heroes"
              className="
                flex items-center gap-1.5 px-4 py-2 rounded-xl
                font-semibold text-sm text-white
                bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-pink-500/20
                border border-white/10
                hover:border-indigo-500/40 hover:bg-indigo-500/20
                transition-all duration-200
              "
            >
              <Zap size={13} />
              Built for Digital Heroes
              <ExternalLink size={12} className="opacity-60" />
            </a>
            <p className="text-xs text-slate-600">digitalheroesco.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
