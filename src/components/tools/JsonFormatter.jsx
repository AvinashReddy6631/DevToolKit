/**
 * JsonFormatter — JSON beautify, validate, minify
 * Stripe/Vercel dashboard aesthetic
 */
import React, { useState, useCallback } from 'react';
import { Code2, CheckCircle, XCircle, Trash2, Minimize2, Maximize2 } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import CopyButton from '../ui/CopyButton';
import Badge from '../ui/Badge';
import { formatJson, validateJson, minifyJson } from '../../utils/jsonUtils';

const SAMPLE = `{
  "name": "Avinash Reddy",
  "role": "Developer",
  "skills": ["React", "Node.js", "Python"],
  "available": true,
  "contact": {
    "email": "dareddy2005@gmail.com"
  }
}`;

export default function JsonFormatter() {
  const [input, setInput]   = useState('');
  const [output, setOutput] = useState('');
  const [error, setError]   = useState(null);
  const [status, setStatus] = useState(null);

  const clearAll = useCallback(() => {
    setInput(''); setOutput(''); setError(null); setStatus(null);
  }, []);

  const handleFormat = useCallback(() => {
    const { formatted, error: err } = formatJson(input);
    if (err) { setError(err); setOutput(''); setStatus('invalid'); }
    else     { setOutput(formatted); setError(null); setStatus('valid'); }
  }, [input]);

  const handleValidate = useCallback(() => {
    const { valid, error: err } = validateJson(input);
    if (valid) {
      setError(null); setStatus('valid');
      const { formatted } = formatJson(input);
      setOutput(formatted || '');
    } else { setError(err); setStatus('invalid'); setOutput(''); }
  }, [input]);

  const handleMinify = useCallback(() => {
    const { minified, error: err } = minifyJson(input);
    if (err) { setError(err); setOutput(''); setStatus('invalid'); }
    else     { setOutput(minified); setError(null); setStatus('valid'); }
  }, [input]);

  return (
    <div className="space-y-5 animate-slide-up">

      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold text-[var(--text-primary)] tracking-[-0.02em]">
            JSON Formatter & Validator
          </h1>
          <p className="text-[0.8125rem] text-[var(--text-tertiary)] mt-0.5">
            Beautify, validate, and minify JSON data
          </p>
        </div>
        <div className="flex items-center gap-2">
          {status === 'valid'   && <Badge type="valid"   icon={CheckCircle}>Valid</Badge>}
          {status === 'invalid' && <Badge type="invalid" icon={XCircle}>Invalid</Badge>}
          <Button variant="ghost" size="sm" onClick={() => setInput(SAMPLE)}>Sample</Button>
          <Button variant="ghost" size="sm" icon={Trash2} onClick={clearAll}>Clear</Button>
        </div>
      </div>

      {/* Editor panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Input */}
        <Card>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Code2 size={14} className="text-[var(--text-tertiary)]" strokeWidth={1.75} />
              <span className="label">Input</span>
            </div>
            <span className="text-2xs font-mono text-[var(--text-disabled)]">
              {input.length} chars
            </span>
          </div>
          <textarea
            id="json-input"
            className="input input-code w-full min-h-[320px] p-3.5"
            value={input}
            onChange={e => { setInput(e.target.value); setError(null); setStatus(null); }}
            placeholder="Paste your JSON here..."
            spellCheck={false}
            aria-label="JSON input"
          />
          <div className="flex flex-wrap gap-2 mt-3">
            <Button id="btn-format" variant="primary" icon={Maximize2} onClick={handleFormat} disabled={!input.trim()}>
              Beautify
            </Button>
            <Button id="btn-validate" variant="secondary" icon={CheckCircle} onClick={handleValidate} disabled={!input.trim()}>
              Validate
            </Button>
            <Button id="btn-minify" variant="secondary" icon={Minimize2} onClick={handleMinify} disabled={!input.trim()}>
              Minify
            </Button>
          </div>
        </Card>

        {/* Output */}
        <Card>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <CheckCircle size={14} className="text-[var(--text-tertiary)]" strokeWidth={1.75} />
              <span className="label">Output</span>
            </div>
            {output && <CopyButton text={output} size="sm" />}
          </div>

          {error ? (
            <div className="card-inset p-4 min-h-[320px]">
              <div className="flex items-start gap-2.5">
                <XCircle size={15} className="text-[#f87171] shrink-0 mt-0.5" strokeWidth={2} />
                <div>
                  <p className="text-[#f87171] font-semibold text-[0.8125rem] mb-1">Syntax Error</p>
                  <p className="text-[#a1a1aa] text-xs font-mono leading-relaxed">{error}</p>
                </div>
              </div>
            </div>
          ) : output ? (
            <textarea
              id="json-output"
              className="input input-code w-full min-h-[320px] p-3.5"
              value={output}
              readOnly
              aria-label="Formatted JSON output"
              spellCheck={false}
            />
          ) : (
            <div className="card-inset flex items-center justify-center min-h-[320px]">
              <div className="text-center">
                <Code2 size={24} className="text-[var(--text-disabled)] mx-auto mb-2" strokeWidth={1.5} />
                <p className="text-[var(--text-tertiary)] text-[0.8125rem]">Output appears here</p>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Hints */}
      <div className="flex flex-wrap gap-6 text-xs text-[var(--text-tertiary)] px-1">
        <span><strong className="text-[var(--text-secondary)] font-medium">Beautify</strong> — 2-space indentation</span>
        <span><strong className="text-[var(--text-secondary)] font-medium">Validate</strong> — check syntax & format</span>
        <span><strong className="text-[var(--text-secondary)] font-medium">Minify</strong> — remove all whitespace</span>
      </div>
    </div>
  );
}
