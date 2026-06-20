/**
 * Card — Sharp, bordered card (Stripe/Vercel style)
 * No glassmorphism. Clean borders, subtle hover.
 */
import React from 'react';

export default function Card({ children, className = '', title, icon: Icon, description, badge, noPadding = false }) {
  return (
    <div className={`card animate-fade-in ${noPadding ? '' : 'p-5 md:p-6'} ${className}`}>
      {(title || Icon) && (
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2.5">
            {Icon && (
              <Icon size={16} className="text-[var(--text-tertiary)]" strokeWidth={1.75} />
            )}
            <div>
              {title && (
                <h2 className="text-[0.8125rem] font-semibold text-[var(--text-primary)] tracking-[-0.01em]">{title}</h2>
              )}
              {description && (
                <p className="text-xs text-[var(--text-tertiary)] mt-0.5">{description}</p>
              )}
            </div>
          </div>
          {badge && badge}
        </div>
      )}
      {children}
    </div>
  );
}
