/**
 * QrCodeGenerator — QR code generator with PNG download and live preview
 */
import React, { useState, useRef, useCallback } from 'react';
import { QrCode, Download, Link, Type, Trash2, Copy, Check } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useClipboard } from '../../hooks/useClipboard';

const SIZE_OPTIONS = [
  { label: 'Small',  value: 160, desc: '160×160' },
  { label: 'Medium', value: 256, desc: '256×256' },
  { label: 'Large',  value: 384, desc: '384×384' },
];

const PRESETS = [
  { label: 'URL', value: 'https://digitalheroesco.com', icon: Link },
  { label: 'Email', value: 'mailto:dareddy2005@gmail.com', icon: Type },
  { label: 'Phone', value: 'tel:+1234567890', icon: Type },
  { label: 'WiFi', value: 'WIFI:T:WPA;S:MyNetwork;P:password123;;', icon: Type },
];

export default function QrCodeGenerator() {
  const [text, setText]         = useState('https://digitalheroesco.com');
  const [size, setSize]         = useState(256);
  const [fgColor, setFgColor]   = useState('#6366f1');
  const [bgColor, setBgColor]   = useState('#ffffff');
  const [downloaded, setDownloaded] = useState(false);
  const canvasRef = useRef(null);
  const { copy, copied } = useClipboard();

  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current?.querySelector('canvas');
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    const filename = text.replace(/[^a-z0-9]/gi, '_').slice(0, 30) || 'qrcode';
    a.download = `${filename}_qrcode.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  }, [text]);

  return (
    <div className="space-y-6 animate-slide-up">

      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-white">QR Code <span className="gradient-text">Generator</span></h1>
        <p className="text-slate-400 text-sm mt-1">Generate QR codes for URLs, text, email, phone, and more</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

        {/* Left: Input + options */}
        <div className="lg:col-span-3 flex flex-col gap-4">

          {/* Presets */}
          <Card>
            <p className="text-sm font-semibold text-slate-300 mb-3">Quick Presets</p>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map(({ label, value, icon: Icon }) => (
                <button
                  key={label}
                  onClick={() => setText(value)}
                  className={`
                    flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
                    border transition-all duration-200 cursor-pointer
                    ${text === value
                      ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300'
                      : 'bg-white/3 border-white/8 text-slate-400 hover:bg-white/6 hover:border-white/15 hover:text-slate-300'
                    }
                  `}
                  aria-label={`Load ${label} preset`}
                >
                  <Icon size={13} />
                  {label}
                </button>
              ))}
            </div>
          </Card>

          {/* Text input */}
          <Card>
            <label htmlFor="qr-input" className="text-sm font-semibold text-slate-300 mb-3 block">
              Enter Text or URL
            </label>
            <div className="relative">
              <textarea
                id="qr-input"
                className="plain-textarea w-full p-4 min-h-[120px]"
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Enter a URL, text, email, or phone number..."
                spellCheck={false}
                aria-label="QR code content"
              />
              {text && (
                <div className="absolute bottom-3 right-3">
                  <span className="text-xs text-slate-600 font-mono">{text.length} chars</span>
                </div>
              )}
            </div>
            {text.length > 2953 && (
              <p className="mt-2 text-xs text-amber-400">
                ⚠️ Very long text may result in a dense QR code that's hard to scan
              </p>
            )}
          </Card>

          {/* Size selector */}
          <Card>
            <p className="text-sm font-semibold text-slate-300 mb-3">Output Size</p>
            <div className="grid grid-cols-3 gap-2">
              {SIZE_OPTIONS.map(({ label, value, desc }) => (
                <button
                  key={value}
                  id={`qr-size-${label.toLowerCase()}`}
                  onClick={() => setSize(value)}
                  className={`
                    p-3 rounded-xl border text-center transition-all duration-200 cursor-pointer
                    ${size === value
                      ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300'
                      : 'bg-white/3 border-white/8 text-slate-400 hover:bg-white/6 hover:border-white/15'
                    }
                  `}
                  aria-pressed={size === value}
                >
                  <div className="text-sm font-semibold">{label}</div>
                  <div className="text-xs opacity-60 mt-0.5">{desc}</div>
                </button>
              ))}
            </div>
          </Card>

          {/* Color options */}
          <Card>
            <p className="text-sm font-semibold text-slate-300 mb-3">Colors</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="qr-fg" className="text-xs text-slate-400 block mb-2">
                  Foreground (QR dots)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="qr-fg"
                    type="color"
                    value={fgColor}
                    onChange={e => setFgColor(e.target.value)}
                    className="w-9 h-9 rounded-lg border border-white/10 cursor-pointer bg-transparent"
                    aria-label="QR foreground color"
                  />
                  <span className="text-sm font-mono text-slate-400">{fgColor}</span>
                </div>
              </div>
              <div>
                <label htmlFor="qr-bg" className="text-xs text-slate-400 block mb-2">
                  Background
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="qr-bg"
                    type="color"
                    value={bgColor}
                    onChange={e => setBgColor(e.target.value)}
                    className="w-9 h-9 rounded-lg border border-white/10 cursor-pointer bg-transparent"
                    aria-label="QR background color"
                  />
                  <span className="text-sm font-mono text-slate-400">{bgColor}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Preview + download */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <Card className="flex flex-col items-center">
            <div className="flex items-center justify-between w-full mb-4">
              <span className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <QrCode size={15} className="text-indigo-400" />
                Preview
              </span>
              <span className="text-xs text-slate-500">{size}×{size}px</span>
            </div>

            {text.trim() ? (
              <>
                {/* QR canvas */}
                <div
                  ref={canvasRef}
                  className="p-4 rounded-2xl shadow-[0_0_40px_rgba(99,102,241,0.2)]"
                  style={{ background: bgColor }}
                >
                  <QRCodeCanvas
                    id="qr-canvas"
                    value={text}
                    size={Math.min(size, 300)}
                    fgColor={fgColor}
                    bgColor={bgColor}
                    level="H"
                    includeMargin={false}
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-5 w-full">
                  <Button
                    id="btn-download-qr"
                    variant="gradient"
                    onClick={handleDownload}
                    className="flex-1 justify-center"
                  >
                    {downloaded
                      ? <><Check size={15} /> Downloaded!</>
                      : <><Download size={15} /> Download PNG</>
                    }
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => copy(text)}
                    aria-label="Copy content"
                  >
                    {copied ? <Check size={15} /> : <Copy size={15} />}
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[260px] w-full">
                <QrCode size={48} className="text-slate-700 mb-3" />
                <p className="text-slate-500 text-sm">Enter text to generate QR</p>
              </div>
            )}
          </Card>

          {/* Tips */}
          <div className="glass-card p-4 text-xs text-slate-500 flex flex-col gap-1">
            <p>📱 Works with any QR scanner app</p>
            <p>🎨 Use high-contrast colors for best scan reliability</p>
            <p>⬇️ Download is a transparent-background PNG</p>
          </div>
        </div>
      </div>
    </div>
  );
}
