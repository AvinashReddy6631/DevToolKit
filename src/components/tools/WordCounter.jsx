/**
 * WordCounter — Live text analysis
 * Stripe dashboard metrics layout
 */
import React, { useState, useMemo, useRef } from 'react';
import { AlignLeft, Trash2, Clipboard, Clock, BookOpen, Hash, AlignJustify } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import CopyButton from '../ui/CopyButton';
import { analyzeText } from '../../utils/textUtils';

const SAMPLE = `The Developer Productivity Toolkit is a collection of essential tools designed to help software developers and students work more efficiently. It includes a JSON formatter, a secure password generator, a QR code generator, and this word counter tool.

Each tool is built with a focus on simplicity, speed, and usability. The goal is to provide a seamless experience for developers who need quick, reliable utilities without leaving their browser.

Whether you're debugging JSON payloads, generating secure passwords for a new project, or analyzing the word count of your technical documentation, DevToolkit has you covered.`;

export default function WordCounter() {
  const [text, setText] = useState('');
  const ref = useRef(null);

  const stats = useMemo(() => analyzeText(text), [text]);

  const handlePaste = async () => {
    try {
      const t = await navigator.clipboard.readText();
      setText(t);
      ref.current?.focus();
    } catch { ref.current?.focus(); }
  };

  const METRICS = [
    { label: 'Words',          value: stats.words,                  icon: BookOpen     },
    { label: 'Characters',     value: stats.characters,             icon: Hash         },
    { label: 'No Spaces',      value: stats.charactersNoSpaces,     icon: Hash         },
    { label: 'Sentences',      value: stats.sentences,              icon: AlignJustify },
    { label: 'Paragraphs',     value: stats.paragraphs,             icon: AlignLeft    },
    { label: 'Avg Word',       value: stats.avgWordLength ? `${stats.avgWordLength}` : '—', icon: BookOpen },
    { label: 'Read Time',      value: stats.readingTime,            icon: Clock        },
    { label: 'Speak Time',     value: stats.words > 0 ? fmtSpeak(stats.words) : '—', icon: Clock },
  ];

  return (
    <div className="space-y-5 animate-slide-up">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold text-[var(--text-primary)] tracking-[-0.02em]">
            Word & Character Counter
          </h1>
          <p className="text-[0.8125rem] text-[var(--text-tertiary)] mt-0.5">
            Real-time text analysis as you type
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setText(SAMPLE)}>Sample</Button>
          <Button variant="ghost" size="sm" icon={Clipboard} onClick={handlePaste}>Paste</Button>
          <Button variant="ghost" size="sm" icon={Trash2} onClick={() => setText('')} disabled={!text}>Clear</Button>
        </div>
      </div>

      {/* Stats grid — Stripe-style metric boxes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {METRICS.map(({ label, value, icon: Icon }) => (
          <div key={label} className="stat-box">
            <div className="flex items-center gap-1.5 mb-2">
              <Icon size={12} className="text-[var(--text-tertiary)]" strokeWidth={1.75} />
              <span className="text-2xs font-medium text-[var(--text-tertiary)] uppercase tracking-wide">{label}</span>
            </div>
            <div className="text-xl font-semibold text-[var(--text-primary)] tabular-nums tracking-[-0.02em]">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </div>
          </div>
        ))}
      </div>

      {/* Textarea */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <AlignLeft size={14} className="text-[var(--text-tertiary)]" strokeWidth={1.75} />
            <span className="label">Text input</span>
          </div>
          {text && <CopyButton text={text} size="sm" />}
        </div>
        <textarea
          id="word-counter-input"
          ref={ref}
          className="input w-full p-3.5 min-h-[320px]"
          style={{ fontSize: '0.9375rem', lineHeight: 1.7, fontFamily: 'inherit' }}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Start typing or paste text here..."
          aria-label="Text input"
          spellCheck
        />

        {/* Progress bar */}
        {stats.words > 0 && (
          <div className="mt-3 flex items-center gap-3 text-2xs text-[var(--text-tertiary)]">
            <span>Progress</span>
            <div className="flex-1 h-1 rounded-full" style={{ background: 'var(--border)' }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, (stats.words / 500) * 100)}%`,
                  background: '#fff',
                  opacity: 0.6,
                }}
              />
            </div>
            <span className="tabular-nums">{stats.words} / 500 words</span>
          </div>
        )}
      </Card>

      {/* Info */}
      <div className="flex flex-wrap gap-6 text-xs text-[var(--text-tertiary)] px-1">
        <span><span className="text-[var(--text-secondary)] font-medium">Reading</span> — 200 wpm</span>
        <span><span className="text-[var(--text-secondary)] font-medium">Speaking</span> — 130 wpm</span>
        <span><span className="text-[var(--text-secondary)] font-medium">Live</span> — updates as you type</span>
      </div>
    </div>
  );
}

function fmtSpeak(w) {
  const m = w / 130;
  if (m < 1) return `${Math.ceil(m * 60)} sec`;
  const mins = Math.floor(m), secs = Math.round((m - mins) * 60);
  return secs > 0 ? `${mins}m ${secs}s` : `${mins} min`;
}
