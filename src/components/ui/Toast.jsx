/**
 * Toast — Notification toast container and individual toast items
 */
import React from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

const icons = {
  success: <CheckCircle size={16} className="text-emerald-400 shrink-0" />,
  error:   <XCircle size={16} className="text-red-400 shrink-0" />,
  info:    <Info size={16} className="text-indigo-400 shrink-0" />,
};

const colors = {
  success: 'bg-emerald-500/10 border-emerald-500/25 text-emerald-100',
  error:   'bg-red-500/10 border-red-500/25 text-red-100',
  info:    'bg-indigo-500/10 border-indigo-500/25 text-indigo-100',
};

/**
 * Individual toast item
 */
function ToastItem({ toast, onDismiss }) {
  const colorClass = colors[toast.type] || colors.info;
  const icon = icons[toast.type] || icons.info;

  return (
    <div
      className={`
        toast-enter flex items-start gap-3 px-4 py-3 rounded-xl border
        backdrop-blur-xl shadow-lg max-w-sm w-full
        ${colorClass}
      `}
      role="alert"
      aria-live="polite"
    >
      {icon}
      <span className="flex-1 text-sm font-medium">{toast.message}</span>
      <button
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        className="opacity-50 hover:opacity-100 transition-opacity ml-1"
      >
        <X size={14} />
      </button>
    </div>
  );
}

/**
 * Toast container — render at app root level
 * @param {{ toasts, onDismiss }} props
 */
export default function ToastContainer({ toasts, onDismiss }) {
  if (!toasts.length) return null;
  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2"
      aria-label="Notifications"
    >
      {toasts.map(t => (
        <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}
