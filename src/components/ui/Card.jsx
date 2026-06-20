/**
 * Card — Glassmorphism card wrapper component
 */
import React from 'react';

/**
 * @param {{ children, className, title, icon, description, badge }} props
 */
export default function Card({ children, className = '', title, icon: Icon, description, badge }) {
  return (
    <div className={`glass-card p-6 md:p-8 animate-fade-in ${className}`}>
      {(title || Icon) && (
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/20">
                <Icon size={20} className="text-indigo-400" />
              </div>
            )}
            <div>
              {title && (
                <h2 className="text-lg font-semibold text-slate-100">{title}</h2>
              )}
              {description && (
                <p className="text-sm text-slate-400 mt-0.5">{description}</p>
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
