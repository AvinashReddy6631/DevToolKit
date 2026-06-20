/**
 * Button — Reusable button with multiple variants
 */
import React from 'react';

const variants = {
  gradient: 'btn-gradient text-white',
  ghost:    'btn-ghost',
  danger:   'bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/40 rounded-xl font-medium cursor-pointer transition-all duration-200',
  success:  'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/40 rounded-xl font-medium cursor-pointer transition-all duration-200',
};

const sizes = {
  sm:  'px-3 py-1.5 text-sm',
  md:  'px-4 py-2.5 text-sm',
  lg:  'px-6 py-3 text-base',
};

/**
 * @param {{ variant, size, icon, children, className, disabled, ...rest }} props
 */
export default function Button({
  variant = 'gradient',
  size = 'md',
  icon: Icon,
  children,
  className = '',
  disabled = false,
  ...rest
}) {
  const base = 'inline-flex items-center gap-2 font-medium rounded-xl transition-all duration-200 select-none focus:outline-none focus:ring-2 focus:ring-indigo-500/40';
  const variantClass = variants[variant] || variants.ghost;
  const sizeClass = sizes[size] || sizes.md;
  const disabledClass = disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : '';

  return (
    <button
      className={`${base} ${variantClass} ${sizeClass} ${disabledClass} ${className}`}
      disabled={disabled}
      {...rest}
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
}
