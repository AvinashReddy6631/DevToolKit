/**
 * CopyButton — Minimal copy button with check animation
 */
import React from 'react';
import { Copy, Check } from 'lucide-react';
import { useClipboard } from '../../hooks/useClipboard';

export default function CopyButton({ text, label = 'Copy', className = '', size = 'md' }) {
  const { copy, copied } = useClipboard(2000);

  const sizeMap = {
    sm: 'h-[26px] px-2 text-xs',
    md: 'h-[30px] px-2.5 text-xs',
    lg: 'h-[34px] px-3 text-[0.8125rem]',
  };

  return (
    <button
      onClick={() => copy(text)}
      aria-label={copied ? 'Copied!' : label}
      className={`
        btn-ghost ${sizeMap[size] || sizeMap.md}
        ${copied ? '!text-[#4ade80] !border-[rgba(34,197,94,0.2)] !bg-[rgba(34,197,94,0.06)]' : ''}
        ${className}
      `}
    >
      {copied
        ? <><Check size={13} strokeWidth={2} /> <span>Copied</span></>
        : <><Copy size={13} strokeWidth={1.75} /> <span>{label}</span></>
      }
    </button>
  );
}
