/**
 * JsonFormatter — JSON beautify, validate, minify, and copy tool
 */
import React, { useState, useCallback } from 'react';
import { Code2, CheckCircle, XCircle, Trash2, Minimize2, Maximize2, Copy } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import CopyButton from '../ui/CopyButton';
import Badge from '../ui/Badge';
import { formatJson, validateJson, minifyJson } from '../../utils/jsonUtils';

const PLACEHOLDER = `{
  "name": "Avinash Reddy",
  "role": "Developer",
  "skills": ["React", "Node.js", "Python"],
  "available": true,
  "contact": {
    "email": "dareddy2005@gmail.com"
  }
}`;

export default function JsonFormatter() {
  const [input, setInput]       = useState('');
  const [output, setOutput]     = useState('');
  const [error, setError]       = useState(null);
  const [status, setStatus]     = useState(null); // 'valid' | 'invalid' | null
  const [activeAction, setActiveAction] = useState(null);

  const clearAll = useCallback(() => {
    setInput('');
    setOutput('');
    setError(null);
    setStatus(null);
    setActiveAction(null);
  }, []);

  const handleFormat = useCallback(() => {
    setActiveAction('format');
    const { formatted, error: err } = formatJson(input);
    if (err) {
      setError(err);
      setOutput('');
      setStatus('invalid');
    } else {
      setOutput(formatted);
      setError(null);
      setStatus('valid');
    }
  }, [input]);

  const handleValidate = useCallback(() => {
    setActiveAction('validate');
    const { valid, error: err, message } = validateJson(input);
    if (valid) {
      setError(null);
      setStatus('valid');
      // Also prettify on validate
      const { formatted } = formatJson(input);
      setOutput(formatted || '');
    } else {
      setError(err);
      setStatus('invalid');
      setOutput('');
    }
  }, [input]);

  const handleMinify = useCallback(() => {
    setActiveAction('minify');
    const { minified, error: err } = minifyJson(input);
    if (err) {
      setError(err);
      setOutput('');
      setStatus('invalid');
    } else {
      setOutput(minified);
      setError(null);
      setStatus('valid');
    }
  }, [input]);

  const loadSample = () => {
    setInput(PLACEHOLDER);
    setOutput('');
    setError(null);
    setStatus(null);
    setActiveAction(null);
  };

  return (
    <div className="space-y-6 animate-slide-up">

      {/* Hero row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">JSON Formatter <span className="gradient-text">&amp; Validator</span></h1>
          <p className="text-slate-400 text-sm mt-1">Beautify, validate, and minify your JSON instantly</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {status === 'valid'   && <Badge type="valid"   icon={CheckCircle}>Valid JSON</Badge>}
          {status === 'invalid' && <Badge type="invalid" icon={XCircle}>Invalid JSON</Badge>}
          <Button variant="ghost" size="sm" onClick={loadSample}>Load Sample</Button>
          <Button variant="danger" size="sm" icon={Trash2} onClick={clearAll}>Clear</Button>
        </div>
      </div>

      {/* Input / Output columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Input panel */}
        <Card className="flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <Code2 size={15} className="text-indigo-400" />
              Input
            </span>
            <span className="text-xs text-slate-500 font-mono">
              {input.length} chars
            </span>
          </div>
          <textarea
            id="json-input"
            className="code-textarea w-full flex-1 p-4 min-h-[300px]"
            value={input}
            onChange={e => {
              setInput(e.target.value);
              setError(null);
              setStatus(null);
            }}
            placeholder={PLACEHOLDER}
            spellCheck={false}
            aria-label="JSON input"
          />
          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Button
              id="btn-format"
              variant="gradient"
              icon={Maximize2}
              onClick={handleFormat}
              disabled={!input.trim()}
            >
              Beautify
            </Button>
            <Button
              id="btn-validate"
              variant="ghost"
              icon={CheckCircle}
              onClick={handleValidate}
              disabled={!input.trim()}
            >
              Validate
            </Button>
            <Button
              id="btn-minify"
              variant="ghost"
              icon={Minimize2}
              onClick={handleMinify}
              disabled={!input.trim()}
            >
              Minify
            </Button>
          </div>
        </Card>

        {/* Output panel */}
        <Card className="flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <CheckCircle size={15} className="text-emerald-400" />
              Output
            </span>
            {output && <CopyButton text={output} size="sm" />}
          </div>

          {error ? (
            <div className="flex-1 flex flex-col">
              {/* Error state */}
              <div className="flex-1 p-4 rounded-xl bg-red-500/8 border border-red-500/20 min-h-[300px]">
                <div className="flex items-start gap-3">
                  <XCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-400 font-semibold text-sm mb-1">JSON Syntax Error</p>
                    <p className="text-red-300/80 text-xs font-mono leading-relaxed">{error}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : output ? (
            <textarea
              id="json-output"
              className="code-textarea w-full flex-1 p-4 min-h-[300px]"
              value={output}
              readOnly
              aria-label="Formatted JSON output"
              spellCheck={false}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center min-h-[300px] rounded-xl border border-dashed border-white/10 bg-white/2">
              <div className="text-center">
                <Code2 size={32} className="text-slate-600 mx-auto mb-2" />
                <p className="text-slate-500 text-sm">Output will appear here</p>
                <p className="text-slate-600 text-xs mt-1">Paste JSON and click Beautify</p>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Quick tips */}
      <div className="glass-card p-4 flex flex-wrap gap-4 text-xs text-slate-500">
        <span>💡 <strong className="text-slate-400">Beautify</strong> — formats with 2-space indentation</span>
        <span>💡 <strong className="text-slate-400">Validate</strong> — checks syntax and shows line/column errors</span>
        <span>💡 <strong className="text-slate-400">Minify</strong> — removes all whitespace for compact output</span>
      </div>
    </div>
  );
}
