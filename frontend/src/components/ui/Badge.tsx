import React from 'react';
import { cn } from '../../lib/utils';

const severityClasses: Record<string,string> = {
  low: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30',
  medium: 'bg-amber-500/15 text-amber-300 border-amber-400/30',
  high: 'bg-red-500/15 text-red-300 border-red-400/30'
};

export const Badge: React.FC<{ severity?: string; className?: string; children?: React.ReactNode }> = ({ severity, className, children }) => {
  const sevClass = severity ? severityClasses[severity.toLowerCase()] : 'bg-secondary text-secondary-foreground';
  return <span className={cn('inline-flex items-center rounded border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide', sevClass, className)}>{children}</span>;
};
