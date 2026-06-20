/**
 * PasswordGenerator — Secure password generator
 * Linear/Vercel inspired: clean controls, monochrome strength bar
 */
import React, { useState, useCallback, useEffect } from 'react';
import { Shield, RefreshCw, Eye, EyeOff, Lock } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import CopyButton from '../ui/CopyButton';
import { generatePassword, evaluateStrength } from '../../utils/passwordUtils';

const DEFAULT = {
  length: 16, uppercase: true, lowercase: true, numbers: true, symbols: false,
};

const STRENGTH_COLORS = ['transparent', '#ef4444', '#f59e0b', '#a1a1aa', '#22c55e'];

export default function PasswordGenerator() {
  const [opts, setOpts]         = useState(DEFAULT);
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState({ score: 0, label: 'None', color: 'transparent', percentage: 0 });
  const [show, setShow]         = useState(true);
  const [spinning, setSpinning] = useState(false);

  const generate = useCallback(() => {
    const pwd = generatePassword(opts);
    setPassword(pwd);
    setStrength(evaluateStrength(pwd));
    setSpinning(true);
    setTimeout(() => setSpinning(false), 400);
  }, [opts]);

  useEffect(() => { generate(); }, [opts]);

  const update = (k, v) => setOpts(prev => ({ ...prev, [k]: v }));

  const segments = [1, 2, 3, 4];

  return (
    <div className="space-y-5 animate-slide-up">

      <div>
        <h1 className="text-lg font-semibold text-[var(--text-primary)] tracking-[-0.02em]">
          Password Generator
        </h1>
        <p className="text-[0.8125rem] text-[var(--text-tertiary)] mt-0.5">
          Generate cryptographically secure passwords
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

        {/* Controls */}
        <Card className="lg:col-span-2 space-y-5">

          {/* Length */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label htmlFor="pw-len" className="label">Length</label>
              <span className="text-[0.9375rem] font-semibold text-[var(--text-primary)] tabular-nums">
                {opts.length}
              </span>
            </div>
            <input
              id="pw-len"
              type="range" min={8} max={50}
              value={opts.length}
              onChange={e => update('length', +e.target.value)}
              className="slider"
              aria-label="Password length"
            />
            <div className="flex justify-between text-2xs text-[var(--text-disabled)] mt-1">
              <span>8</span><span>50</span>
            </div>
          </div>

          {/* Divider */}
          <div className="divider" />

          {/* Character toggles */}
          <div className="space-y-1.5">
            <p className="label mb-2">Character types</p>
            {[
              { key: 'uppercase', label: 'Uppercase', tag: 'A–Z' },
              { key: 'lowercase', label: 'Lowercase', tag: 'a–z' },
              { key: 'numbers',   label: 'Numbers',   tag: '0–9' },
              { key: 'symbols',   label: 'Symbols',   tag: '!@#' },
            ].map(({ key, label, tag }) => (
              <label
                key={key}
                htmlFor={`chk-${key}`}
                className="flex items-center justify-between px-3 py-2.5 rounded-md cursor-pointer transition-colors duration-100 hover:bg-[var(--surface-2)]"
                style={{ border: '1px solid var(--border-subtle)' }}
              >
                <div className="flex items-center gap-2.5">
                  <input
                    id={`chk-${key}`}
                    type="checkbox"
                    className="checkbox"
                    checked={opts[key]}
                    onChange={e => {
                      if (!e.target.checked) {
                        const others = ['uppercase','lowercase','numbers','symbols'].filter(k => k !== key);
                        if (!others.some(k => opts[k])) return;
                      }
                      update(key, e.target.checked);
                    }}
                  />
                  <span className="text-[0.8125rem] font-medium text-[var(--text-primary)]">{label}</span>
                </div>
                <span className="text-2xs font-mono text-[var(--text-tertiary)]">{tag}</span>
              </label>
            ))}
          </div>

          <Button
            id="btn-regenerate"
            variant="primary"
            onClick={generate}
            className="w-full justify-center"
          >
            <RefreshCw size={14} className={spinning ? 'animate-spin' : ''} strokeWidth={2} />
            Generate
          </Button>
        </Card>

        {/* Right: Output */}
        <div className="lg:col-span-3 space-y-4">

          {/* Password display */}
          <Card>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Lock size={14} className="text-[var(--text-tertiary)]" strokeWidth={1.75} />
                <span className="label">Generated password</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setShow(s => !s)}
                  className="btn-ghost h-[26px] px-1.5"
                  aria-label={show ? 'Hide' : 'Show'}
                >
                  {show ? <EyeOff size={14} strokeWidth={1.75} /> : <Eye size={14} strokeWidth={1.75} />}
                </button>
                <CopyButton text={password} />
              </div>
            </div>
            <div
              id="password-display"
              className="w-full p-3.5 rounded-md font-mono text-sm leading-relaxed tracking-wider select-all cursor-text break-all"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                color: show ? 'var(--text-primary)' : 'var(--text-disabled)',
                minHeight: 56,
              }}
              role="textbox"
              aria-label="Generated password"
              aria-readonly="true"
            >
              {show ? password : password.replace(/./g, '•')}
            </div>
          </Card>

          {/* Strength */}
          <Card>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Shield size={14} className="text-[var(--text-tertiary)]" strokeWidth={1.75} />
                <span className="label">Strength</span>
              </div>
              <span className="text-[0.8125rem] font-semibold" style={{ color: STRENGTH_COLORS[strength.score] || '#71717a' }}>
                {strength.label}
              </span>
            </div>

            {/* Bar */}
            <div className="flex gap-1 mb-4">
              {segments.map(i => (
                <div
                  key={i}
                  className="strength-bar"
                  style={{
                    background: i <= strength.score
                      ? STRENGTH_COLORS[strength.score]
                      : 'var(--border)',
                  }}
                />
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { label: 'Length',    value: password.length || '—' },
                { label: 'Uppercase', value: (password.match(/[A-Z]/g) || []).length },
                { label: 'Lowercase', value: (password.match(/[a-z]/g) || []).length },
                { label: 'Numbers',   value: (password.match(/[0-9]/g) || []).length },
                { label: 'Symbols',   value: (password.match(/[^A-Za-z0-9]/g) || []).length },
                { label: 'Entropy',   value: password ? `~${Math.floor(Math.log2(Math.pow(getPool(opts), password.length)))}b` : '—' },
              ].map(({ label, value }) => (
                <div key={label} className="stat-box text-center">
                  <div className="text-2xs text-[var(--text-tertiary)] mb-1">{label}</div>
                  <div className="text-sm font-semibold text-[var(--text-primary)] tabular-nums">{value}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Info */}
          <div className="flex flex-col gap-1 text-xs text-[var(--text-tertiary)] px-1">
            <p>Uses <span className="text-[var(--text-secondary)]">Web Crypto API</span> — cryptographically random</p>
            <p>Generated locally — never sent to any server</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function getPool(o) {
  let s = 0;
  if (o.uppercase) s += 26;
  if (o.lowercase) s += 26;
  if (o.numbers)   s += 10;
  if (o.symbols)   s += 28;
  return Math.max(s, 1);
}
