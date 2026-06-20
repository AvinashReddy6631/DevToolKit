/**
 * CopyButton — Animated copy-to-clipboard button
 */
import React from 'react';
import { Copy, Check } from 'lucide-react';
import { useClipboard } from '../../hooks/useClipboard';

/**
 * @param {{ text, label, className, size }} props
 */
export default function CopyButton({ text, label = 'Copy', className = '', size = 'md' }) {
  const { copy, copied } = useClipboard(2000);

  const sizes = {
    sm: 'px-2.5 py-1.5 text-xs',
    md: 'px-3.5 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  };

  return (
    <button
      onClick={() => copy(text)}
      aria-label={copied ? 'Copied!' : label}
      className={`
        inline-flex items-center gap-1.5 font-medium rounded-lg cursor-pointer
        transition-all duration-300 select-none focus:outline-none focus:ring-2 focus:ring-indigo-500/40
        ${sizes[size] || sizes.md}
        ${copied
          ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400'
          : 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/20 hover:border-indigo-500/40'
        }
        ${className}
      `}
    >
      <span
        className="transition-all duration-300"
        style={{ transform: copied ? 'scale(1)' : 'scale(1)' }}
      >
        {copied
          ? <Check size={14} className="text-emerald-400" />
          : <Copy size={14} />
        }
      </span>
      <span>{copied ? 'Copied!' : label}</span>
    </button>
  );
}
