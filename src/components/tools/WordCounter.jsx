/**
 * WordCounter — Live text analysis: words, chars, sentences, paragraphs, reading time
 */
import React, { useState, useMemo, useRef } from 'react';
import { AlignLeft, Trash2, Clipboard, Clock, BookOpen, Hash, AlignJustify } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import CopyButton from '../ui/CopyButton';
import { analyzeText } from '../../utils/textUtils';

const SAMPLE_TEXT = `The Developer Productivity Toolkit is a collection of essential tools designed to help software developers and students work more efficiently. It includes a JSON formatter, a secure password generator, a QR code generator, and this word counter tool.

Each tool is built with a focus on simplicity, speed, and usability. The goal is to provide a seamless experience for developers who need quick, reliable utilities without leaving their browser.

Whether you're debugging JSON payloads, generating secure passwords for a new project, or analyzing the word count of your technical documentation, DevToolkit has you covered.`;

export default function WordCounter() {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  const stats = useMemo(() => analyzeText(text), [text]);

  const handlePaste = async () => {
    try {
      const clipText = await navigator.clipboard.readText();
      setText(clipText);
      textareaRef.current?.focus();
    } catch {
      // Clipboard read failed - user must paste manually
      textareaRef.current?.focus();
    }
  };

  const loadSample = () => setText(SAMPLE_TEXT);
  const clearText  = () => setText('');

  const STAT_ITEMS = [
    { label: 'Words',               value: stats.words.toLocaleString(),               icon: BookOpen,       color: 'text-indigo-400',  bg: 'bg-indigo-500/10' },
    { label: 'Characters',          value: stats.characters.toLocaleString(),           icon: Hash,           color: 'text-violet-400',  bg: 'bg-violet-500/10' },
    { label: 'Without Spaces',      value: stats.charactersNoSpaces.toLocaleString(),   icon: Hash,           color: 'text-cyan-400',    bg: 'bg-cyan-500/10'   },
    { label: 'Sentences',           value: stats.sentences.toLocaleString(),            icon: AlignJustify,   color: 'text-pink-400',    bg: 'bg-pink-500/10'   },
    { label: 'Paragraphs',          value: stats.paragraphs.toLocaleString(),           icon: AlignLeft,      color: 'text-amber-400',   bg: 'bg-amber-500/10'  },
    { label: 'Avg Word Length',     value: stats.avgWordLength ? `${stats.avgWordLength} chars` : '—', icon: BookOpen, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Reading Time',        value: stats.readingTime,                           icon: Clock,          color: 'text-rose-400',    bg: 'bg-rose-500/10'   },
    { label: 'Speaking Time',       value: stats.words > 0 ? formatSpeakTime(stats.words) : '—', icon: Clock, color: 'text-teal-400', bg: 'bg-teal-500/10' },
  ];

  return (
    <div className="space-y-6 animate-slide-up">

      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Word &amp; Character <span className="gradient-text">Counter</span></h1>
          <p className="text-slate-400 text-sm mt-1">Real-time text analysis — words, characters, reading time and more</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" size="sm" onClick={loadSample}>Sample Text</Button>
          <Button variant="ghost" size="sm" icon={Clipboard} onClick={handlePaste}>Paste</Button>
          <Button variant="danger" size="sm" icon={Trash2} onClick={clearText} disabled={!text}>Clear</Button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {STAT_ITEMS.map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className={`stat-card group cursor-default ${bg} border-transparent hover:border-white/10`}
          >
            <div className={`flex items-center gap-1.5 text-xs font-medium mb-2 ${color}`}>
              <Icon size={12} />
              {label}
            </div>
            <div className="text-2xl font-bold text-white tabular-nums">{value}</div>
          </div>
        ))}
      </div>

      {/* Textarea */}
      <Card className="flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-slate-300 flex items-center gap-2">
            <AlignLeft size={15} className="text-indigo-400" />
            Your Text
          </span>
          {text && <CopyButton text={text} size="sm" />}
        </div>
        <textarea
          id="word-counter-input"
          ref={textareaRef}
          className="plain-textarea w-full p-4 min-h-[300px]"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Paste or type your text here… Stats update in real-time as you type."
          aria-label="Text input for word counting"
          spellCheck
        />
        {/* Progress bar for reading time */}
        {stats.words > 0 && (
          <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
            <span>Readability:</span>
            <div className="flex-1 h-1.5 bg-white/8 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500"
                style={{ width: `${Math.min(100, (stats.words / 500) * 100)}%` }}
              />
            </div>
            <span>{stats.words}/500 words</span>
          </div>
        )}
      </Card>

      {/* Tips */}
      <div className="glass-card p-4 flex flex-wrap gap-4 text-xs text-slate-500">
        <span>📖 <strong className="text-slate-400">Reading time</strong> based on 200 words/minute</span>
        <span>🎙️ <strong className="text-slate-400">Speaking time</strong> based on 130 words/minute</span>
        <span>⚡ <strong className="text-slate-400">Live updates</strong> — no need to click anything</span>
      </div>
    </div>
  );
}

/** Format speaking time from word count (130 wpm) */
function formatSpeakTime(words) {
  const minutes = words / 130;
  if (minutes < 1) {
    return `${Math.ceil(minutes * 60)} sec`;
  }
  const mins = Math.floor(minutes);
  const secs = Math.round((minutes - mins) * 60);
  return secs > 0 ? `${mins}m ${secs}s` : `${mins} min`;
}
