/**
 * Badge — Status/strength pill badge
 */
import React from 'react';

const presets = {
  valid:   'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25',
  invalid: 'bg-red-500/15 text-red-400 border border-red-500/25',
  info:    'bg-indigo-500/15 text-indigo-400 border border-indigo-500/25',
  warning: 'bg-amber-500/15 text-amber-400 border border-amber-500/25',
  neutral: 'bg-white/5 text-slate-400 border border-white/10',
};

/**
 * @param {{ type, children, icon, className }} props
 */
export default function Badge({ type = 'neutral', children, icon: Icon, className = '' }) {
  const preset = presets[type] || presets.neutral;
  return (
    <span className={`badge ${preset} ${className}`}>
      {Icon && <Icon size={11} />}
      {children}
    </span>
  );
}
