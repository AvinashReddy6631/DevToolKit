/**
 * Button — Clean, professional button (Vercel-inspired)
 * White primary, dark secondary, minimal ghost, red danger
 */
import React from 'react';

export default function Button({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  children,
  className = '',
  disabled = false,
  ...rest
}) {
  const variantMap = {
    primary:   'btn-primary',
    secondary: 'btn-secondary',
    ghost:     'btn-ghost',
    danger:    'btn-danger',
  };

  const sizeMap = {
    sm: 'h-[28px] px-2.5 text-xs gap-1.5',
    md: 'h-[34px] px-3.5 text-[0.8125rem] gap-1.5',
    lg: 'h-[38px] px-5 text-sm gap-2',
  };

  const cls = variantMap[variant] || variantMap.secondary;
  const sz = sizeMap[size] || sizeMap.md;

  return (
    <button
      className={`${cls} ${sz} ${disabled ? 'opacity-35 cursor-not-allowed pointer-events-none' : ''} ${className}`}
      disabled={disabled}
      {...rest}
    >
      {Icon && <Icon size={size === 'sm' ? 13 : 14} strokeWidth={1.75} />}
      {children}
    </button>
  );
}
