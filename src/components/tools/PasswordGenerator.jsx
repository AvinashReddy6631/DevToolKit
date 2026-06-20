/**
 * PasswordGenerator — Secure, configurable password generator with strength meter
 */
import React, { useState, useCallback, useEffect } from 'react';
import { Shield, RefreshCw, Eye, EyeOff, Lock } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import CopyButton from '../ui/CopyButton';
import { generatePassword, evaluateStrength } from '../../utils/passwordUtils';

const DEFAULT_OPTIONS = {
  length:    16,
  uppercase: true,
  lowercase: true,
  numbers:   true,
  symbols:   false,
};

const STRENGTH_LABELS = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const STRENGTH_COLORS = ['', '#ef4444', '#f97316', '#eab308', '#22c55e'];

export default function PasswordGenerator() {
  const [options, setOptions]   = useState(DEFAULT_OPTIONS);
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState({ score: 0, label: 'None', color: 'transparent', percentage: 0 });
  const [showPass, setShowPass] = useState(true);
  const [spin, setSpin]         = useState(false);

  const generate = useCallback(() => {
    const pwd = generatePassword(options);
    setPassword(pwd);
    setStrength(evaluateStrength(pwd));
    setSpin(true);
    setTimeout(() => setSpin(false), 600);
  }, [options]);

  // Auto-generate on mount and when options change
  useEffect(() => { generate(); }, [options]);

  const updateOption = (key, value) =>
    setOptions(prev => ({ ...prev, [key]: value }));

  const atLeastOne = options.uppercase || options.lowercase || options.numbers || options.symbols;

  // Strength bar segments
  const segments = [1, 2, 3, 4].map(i => ({
    filled: i <= strength.score,
    color: strength.color,
  }));

  return (
    <div className="space-y-6 animate-slide-up">

      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-white">Secure <span className="gradient-text">Password Generator</span></h1>
        <p className="text-slate-400 text-sm mt-1">Generate cryptographically strong passwords instantly</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

        {/* Left: Controls */}
        <Card className="lg:col-span-2 flex flex-col gap-5">
          {/* Length slider */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label htmlFor="length-slider" className="text-sm font-semibold text-slate-300">
                Password Length
              </label>
              <span className="text-lg font-bold gradient-text">{options.length}</span>
            </div>
            <input
              id="length-slider"
              type="range"
              min={8}
              max={50}
              value={options.length}
              onChange={e => updateOption('length', Number(e.target.value))}
              className="range-slider"
              aria-label="Password length"
            />
            <div className="flex justify-between text-xs text-slate-600 mt-1">
              <span>8</span><span>50</span>
            </div>
          </div>

          {/* Character type checkboxes */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-300">Character Types</p>
            {[
              { key: 'uppercase', label: 'Uppercase',  example: 'A–Z',      color: 'text-indigo-400' },
              { key: 'lowercase', label: 'Lowercase',  example: 'a–z',      color: 'text-violet-400' },
              { key: 'numbers',   label: 'Numbers',    example: '0–9',      color: 'text-cyan-400'   },
              { key: 'symbols',   label: 'Symbols',    example: '!@#$%^&*', color: 'text-pink-400'   },
            ].map(({ key, label, example, color }) => (
              <label
                key={key}
                htmlFor={`chk-${key}`}
                className="flex items-center justify-between p-3 rounded-xl bg-white/3 border border-white/6 cursor-pointer hover:bg-white/5 hover:border-white/10 transition-all"
              >
                <div className="flex items-center gap-3">
                  <input
                    id={`chk-${key}`}
                    type="checkbox"
                    className="custom-checkbox"
                    checked={options[key]}
                    onChange={e => {
                      // Prevent unchecking if it's the last one
                      if (!e.target.checked) {
                        const others = ['uppercase','lowercase','numbers','symbols'].filter(k => k !== key);
                        if (!others.some(k => options[k])) return;
                      }
                      updateOption(key, e.target.checked);
                    }}
                    aria-label={label}
                  />
                  <div>
                    <span className="text-sm font-medium text-slate-300">{label}</span>
                  </div>
                </div>
                <span className={`text-xs font-mono ${color} opacity-70`}>{example}</span>
              </label>
            ))}
          </div>

          <Button
            id="btn-regenerate"
            variant="gradient"
            onClick={generate}
            disabled={!atLeastOne}
            className="w-full justify-center"
          >
            <RefreshCw size={15} className={spin ? 'animate-spin' : ''} />
            Generate New Password
          </Button>
        </Card>

        {/* Right: Password display + strength */}
        <div className="lg:col-span-3 flex flex-col gap-4">

          {/* Password display */}
          <Card>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Lock size={15} className="text-indigo-400" />
                Generated Password
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowPass(s => !s)}
                  className="p-1.5 rounded-lg btn-ghost text-slate-400"
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
                <CopyButton text={password} />
              </div>
            </div>

            {/* Password field */}
            <div className="relative">
              <div
                id="password-display"
                className={`
                  w-full p-4 rounded-xl bg-black/40 border border-white/10 font-mono text-base
                  leading-relaxed tracking-wider select-all cursor-text
                  min-h-[72px] flex items-center
                  ${showPass ? 'text-emerald-300' : 'text-slate-600'}
                  overflow-x-auto
                `}
                role="textbox"
                aria-label="Generated password"
                aria-readonly
              >
                {showPass ? password : password.replace(/./g, '●')}
              </div>
            </div>
          </Card>

          {/* Strength meter */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Shield size={15} className="text-violet-400" />
                Password Strength
              </span>
              <span
                className="text-sm font-bold"
                style={{ color: strength.color }}
              >
                {strength.label}
              </span>
            </div>

            {/* Segmented strength bar */}
            <div className="flex gap-1.5 mb-4">
              {segments.map((seg, i) => (
                <div
                  key={i}
                  className="strength-segment"
                  style={{
                    background: seg.filled ? seg.color : 'rgba(255,255,255,0.08)',
                    boxShadow: seg.filled ? `0 0 8px ${seg.color}60` : 'none',
                  }}
                  aria-hidden
                />
              ))}
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Length',     value: password.length || '—' },
                { label: 'Uppercase',  value: (password.match(/[A-Z]/g) || []).length },
                { label: 'Lowercase',  value: (password.match(/[a-z]/g) || []).length },
                { label: 'Numbers',    value: (password.match(/[0-9]/g) || []).length },
                { label: 'Symbols',    value: (password.match(/[^A-Za-z0-9]/g) || []).length },
                { label: 'Entropy',    value: password ? `~${Math.floor(Math.log2(Math.pow(getPoolSize(options), password.length)))} bit` : '—' },
              ].map(({ label, value }) => (
                <div key={label} className="stat-card">
                  <div className="text-xs text-slate-500 mb-1">{label}</div>
                  <div className="text-base font-bold text-slate-200">{value}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Security tips */}
          <div className="glass-card p-4 text-xs text-slate-500 flex flex-col gap-1">
            <p>🔒 Uses <strong className="text-slate-400">Web Crypto API</strong> for cryptographically random generation</p>
            <p>🛡️ Passwords are generated locally — never sent to any server</p>
            <p>✅ Use passwords ≥16 chars with mixed types for maximum security</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Calculate character pool size for entropy calculation */
function getPoolSize(options) {
  let size = 0;
  if (options.uppercase) size += 26;
  if (options.lowercase) size += 26;
  if (options.numbers)   size += 10;
  if (options.symbols)   size += 28;
  return Math.max(size, 1);
}
