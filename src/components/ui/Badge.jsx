/**
 * Badge — Minimal status chip (Stripe-style)
 */
import React from 'react';

const presets = {
  valid:   'chip-success',
  invalid: 'chip-error',
  info:    'chip-blue',
  warning: 'chip-warning',
  neutral: 'chip-neutral',
};

export default function Badge({ type = 'neutral', children, icon: Icon, className = '' }) {
  return (
    <span className={`chip ${presets[type] || presets.neutral} ${className}`}>
      {Icon && <Icon size={10} strokeWidth={2} />}
      {children}
    </span>
  );
}
