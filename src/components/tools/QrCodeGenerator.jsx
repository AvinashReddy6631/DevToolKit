/**
 * QrCodeGenerator — QR code generator with download
 * Vercel dashboard style: clean, minimal
 */
import React, { useState, useRef, useCallback } from 'react';
import { QrCode, Download, Link, Type, Copy, Check } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useClipboard } from '../../hooks/useClipboard';

const SIZES = [
  { label: 'Small',  value: 160, desc: '160px' },
  { label: 'Medium', value: 256, desc: '256px' },
  { label: 'Large',  value: 384, desc: '384px' },
];

const PRESETS = [
  { label: 'URL',   value: 'https://digitalheroesco.com', icon: Link },
  { label: 'Email', value: 'mailto:dareddy2005@gmail.com', icon: Type },
  { label: 'WiFi',  value: 'WIFI:T:WPA;S:MyNetwork;P:password123;;', icon: Type },
];

export default function QrCodeGenerator() {
  const [text, setText]       = useState('https://digitalheroesco.com');
  const [size, setSize]       = useState(256);
  const [downloaded, setDled] = useState(false);
  const [qrError, setQrError] = useState('');
  const MAX_QR_LENGTH = 10000;
  const canvasRef = useRef(null);
  const { copy, copied }      = useClipboard();

  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current?.querySelector('canvas');
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(text.replace(/[^a-z0-9]/gi, '_').slice(0, 25) || 'qrcode')}_qr.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setDled(true);
    setTimeout(() => setDled(false), 2000);
  }, [text]);

  return (
    <div className="space-y-5 animate-slide-up">

      <div>
        <h1 className="text-lg font-semibold text-[var(--text-primary)] tracking-[-0.02em]">
          QR Code Generator
        </h1>
        <p className="text-[0.8125rem] text-[var(--text-tertiary)] mt-0.5">
          Generate QR codes from text, URLs, or data
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

        {/* Left: Inputs */}
        <div className="lg:col-span-3 space-y-4">

          {/* Presets */}
          <Card>
            <p className="label mb-2.5">Presets</p>
            <div className="flex flex-wrap gap-1.5">
              {PRESETS.map(({ label, value, icon: Icon }) => (
                <button
                  key={label}
                  onClick={() => setText(value)}
                  className={`btn-ghost ${text === value ? '!bg-[var(--surface-3)] !border-[var(--border-strong)] !text-[var(--text-primary)]' : ''}`}
                >
                  <Icon size={12} strokeWidth={1.75} />
                  {label}
                </button>
              ))}
            </div>
          </Card>

          {/* Text input */}
          <Card>
            <label htmlFor="qr-input" className="label block mb-2.5">Content</label>
            <textarea
              id="qr-input"
              className="input w-full p-3 min-h-[100px]"
              value={text}
              onChange={(e) => {
  const value = e.target.value;

    if (value.length > MAX_QR_LENGTH) {
      setQrError('Content is too large for QR code generation.');
    } else {
      setQrError('');
    }
  
    setText(value);
      }}
              placeholder="Enter a URL, text, or data..."
              spellCheck={false}
              aria-label="QR code content"
            />
            {text.length > 2953 && (
              <p className="mt-2 text-xs text-[#f59e0b]">
                Very long text may produce a dense, hard-to-scan QR code
              </p>
            )}
          </Card>

          {/* Size */}
          <Card>
            <p className="label mb-2.5">Output size</p>
            <div className="grid grid-cols-3 gap-2">
              {SIZES.map(({ label, value, desc }) => (
                <button
                  key={value}
                  id={`qr-size-${label.toLowerCase()}`}
                  onClick={() => setSize(value)}
                  className={`
                    p-2.5 rounded-md border text-center cursor-pointer
                    transition-all duration-100
                    ${size === value
                      ? 'bg-[var(--surface-3)] border-[var(--border-strong)] text-[var(--text-primary)]'
                      : 'bg-transparent border-[var(--border)] text-[var(--text-tertiary)] hover:border-[var(--border-strong)] hover:text-[var(--text-secondary)]'
                    }
                  `}
                  aria-pressed={size === value}
                >
                  <div className="text-[0.8125rem] font-medium">{label}</div>
                  <div className="text-2xs opacity-60 mt-0.5">{desc}</div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Right: Preview */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="flex flex-col items-center">
            <div className="flex items-center justify-between w-full mb-4">
              <div className="flex items-center gap-2">
                <QrCode size={14} className="text-[var(--text-tertiary)]" strokeWidth={1.75} />
                <span className="label">Preview</span>
              </div>
              <span className="text-2xs text-[var(--text-disabled)] font-mono">{size}×{size}</span>
            </div>

            {text.trim() && !qrError ? (
              <>
                <div
                  ref={canvasRef}
                  className="p-5 rounded-lg"
                  style={{
                    background: '#fff',
                    border: '1px solid var(--border)',
                  }}
                >
                  <QRCodeCanvas
                    id="qr-canvas"
                    value={text}
                    size={Math.min(size, 280)}
                    fgColor="#000000"
                    bgColor="#ffffff"
                    level="M"
                    includeMargin={false}
                  />
                </div>

                <div className="flex gap-2 mt-4 w-full">
                  <Button
  id="btn-download-qr"
  variant="primary"
  onClick={handleDownload}
  disabled={!!qrError}
  className="flex-1 justify-center"
>
                    {downloaded
                      ? <><Check size={14} strokeWidth={2} /> Downloaded</>
                      : <><Download size={14} strokeWidth={1.75} /> Download PNG</>
                    }
                  </Button>
                  <button
                    onClick={() => copy(text)}
                    className="btn-secondary h-[34px] px-3"
                    aria-label="Copy content"
                  >
                    {copied ? <Check size={14} strokeWidth={2} /> : <Copy size={14} strokeWidth={1.75} />}
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[240px] w-full">
                <QrCode size={32} className="text-[var(--text-disabled)] mb-2" strokeWidth={1.5} />
                <p className="text-[var(--text-tertiary)] text-[0.8125rem]">Enter text to generate</p>
              </div>
            )}
          </Card>

          {qrError && (
  <div className="flex flex-col items-center justify-center min-h-[240px] w-full">
    <p className="text-red-500 text-sm font-medium">
      {qrError}
    </p>
  </div>
)}

          <div className="text-xs text-[var(--text-tertiary)] space-y-0.5 px-1">
            <p>High error correction (Level H) for reliable scanning</p>
            <p>Download exports at the selected resolution</p>
          </div>
        </div>
      </div>
    </div>
  );
}
