import React from 'react';
import { RiskLevel, StudyGroup, IncidentStatus, IncidentPriority, KebeleType, ActivityStatus, EngagementLevel } from '../../types';

interface BadgeProps {
  children?: React.ReactNode;
  variant?: 'risk' | 'group' | 'status' | 'priority' | 'type' | 'activity' | 'engagement' | 'default';
  value?: string | RiskLevel | StudyGroup | IncidentStatus | IncidentPriority | KebeleType | ActivityStatus | EngagementLevel;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  value,
  className = '',
  size = 'md',
}) => {
  const content = children || value;
  const val = String(value || children || '');

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs font-semibold',
    lg: 'px-3 py-1.5 text-sm font-semibold',
  }[size];

  let colorClasses = 'bg-slate-100 text-slate-700 border-slate-200';

  if (variant === 'risk' || val === 'Low' || val === 'Medium' || val === 'High') {
    if (val === 'Low') {
      colorClasses = 'bg-emerald-50 text-emerald-800 border-emerald-200';
    } else if (val === 'Medium') {
      colorClasses = 'bg-amber-50 text-amber-800 border-amber-200';
    } else if (val === 'High') {
      colorClasses = 'bg-red-50 text-red-800 border-red-200';
    }
  }

  if (variant === 'group' || val === 'Intervention' || val === 'Comparison') {
    if (val === 'Intervention') {
      colorClasses = 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold';
    } else {
      colorClasses = 'bg-slate-100 text-slate-800 border-slate-300';
    }
  }

  if (variant === 'type' || val === 'Urban' || val === 'Peri-Urban') {
    if (val === 'Urban') {
      colorClasses = 'bg-blue-50 text-blue-800 border-blue-200';
    } else {
      colorClasses = 'bg-teal-50 text-teal-800 border-teal-200';
    }
  }

  if (variant === 'status' || ['New', 'Under Review', 'Assigned', 'In Progress', 'Resolved'].includes(val)) {
    switch (val) {
      case 'New':
        colorClasses = 'bg-rose-50 text-rose-800 border-rose-200 font-semibold';
        break;
      case 'Under Review':
        colorClasses = 'bg-amber-50 text-amber-800 border-amber-200';
        break;
      case 'Assigned':
        colorClasses = 'bg-blue-50 text-blue-800 border-blue-200';
        break;
      case 'In Progress':
        colorClasses = 'bg-indigo-50 text-indigo-800 border-indigo-200';
        break;
      case 'Resolved':
        colorClasses = 'bg-emerald-50 text-emerald-800 border-emerald-200';
        break;
    }
  }

  if (variant === 'priority') {
    if (val === 'Critical') {
      colorClasses = 'bg-red-100 text-red-900 border-red-300';
    } else if (val === 'Urgent') {
      colorClasses = 'bg-amber-100 text-amber-900 border-amber-300';
    } else {
      colorClasses = 'bg-slate-100 text-slate-700 border-slate-200';
    }
  }

  if (variant === 'activity') {
    if (val === 'Completed') {
      colorClasses = 'bg-emerald-50 text-emerald-800 border-emerald-200';
    } else if (val === 'In Progress') {
      colorClasses = 'bg-blue-50 text-blue-800 border-blue-200';
    } else {
      colorClasses = 'bg-slate-100 text-slate-600 border-slate-200';
    }
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border tracking-tight whitespace-nowrap ${sizeClasses} ${colorClasses} ${className}`}
    >
      {variant === 'risk' && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            val === 'High' ? 'bg-red-500' : val === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
          }`}
        />
      )}
      {content}
    </span>
  );
};
