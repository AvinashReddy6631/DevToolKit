/**
 * Toast — Clean notification toasts
 */
import React from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

const icons = {
  success: <CheckCircle size={14} className="text-[#4ade80] shrink-0" strokeWidth={2} />,
  error:   <XCircle size={14} className="text-[#f87171] shrink-0" strokeWidth={2} />,
  info:    <Info size={14} className="text-[var(--text-secondary)] shrink-0" strokeWidth={2} />,
};

function ToastItem({ toast, onDismiss }) {
  return (
    <div
      className="toast-enter flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border max-w-xs w-full"
      style={{
        background: 'var(--surface-1)',
        borderColor: 'var(--border)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)',
      }}
      role="alert"
      aria-live="polite"
    >
      {icons[toast.type] || icons.info}
      <span className="flex-1 text-[0.8125rem] font-medium text-[var(--text-primary)]">
        {toast.message}
      </span>
      <button
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss"
        className="opacity-40 hover:opacity-100 transition-opacity"
      >
        <X size={13} />
      </button>
    </div>
  );
}

export default function ToastContainer({ toasts, onDismiss }) {
  if (!toasts.length) return null;
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2" aria-label="Notifications">
      {toasts.map(t => <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />)}
    </div>
  );
}
