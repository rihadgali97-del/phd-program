import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  id?: string;
  title: string;
  value: string | number;
  unit?: string;
  description: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
    isPositive: boolean;
  };
  highlight?: 'emerald' | 'amber' | 'red' | 'default';
  progressPercent?: number;
  onClick?: () => void;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  id,
  title,
  value,
  unit,
  description,
  icon: Icon,
  trend,
  highlight = 'default',
  progressPercent,
  onClick,
  className = '',
}) => {
  const borderHighlight = {
    emerald: 'border-slate-200 hover:border-emerald-300',
    amber: 'border-slate-200 hover:border-amber-300',
    red: 'border-slate-200 hover:border-red-300',
    default: 'border-slate-200 hover:border-slate-300',
  }[highlight];

  const iconBg = {
    emerald: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    amber: 'bg-amber-50 text-amber-600 border border-amber-100',
    red: 'bg-rose-50 text-rose-600 border border-rose-100',
    default: 'bg-slate-100 text-slate-600 border border-slate-200',
  }[highlight];

  const progressBarColor = {
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    red: 'bg-rose-500',
    default: 'bg-slate-400',
  }[highlight];

  // Derive an illustrative progress width if not provided
  let calcWidth = progressPercent;
  if (calcWidth === undefined) {
    if (typeof value === 'number') {
      calcWidth = Math.min(Math.max(value > 100 ? (value % 100) : value, 15), 100);
    } else if (highlight === 'emerald') {
      calcWidth = 68;
    } else if (highlight === 'amber') {
      calcWidth = 45;
    } else if (highlight === 'red') {
      calcWidth = 85;
    } else {
      calcWidth = 50;
    }
  }

  return (
    <div
      id={id}
      onClick={onClick}
      className={`bg-white rounded-xl p-4 sm:p-5 border shadow-xs transition-all duration-150 ${borderHighlight} ${
        onClick ? 'cursor-pointer hover:shadow-md' : ''
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1 truncate">
            {title}
          </p>
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-2xl font-bold tracking-tight text-slate-900">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </span>
            {unit && <span className="text-xs font-medium text-slate-500">{unit}</span>}
          </div>
        </div>
        <div className={`p-2 rounded-lg shrink-0 ${iconBg}`}>
          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </div>

      {/* Micro Progress Bar */}
      <div className="w-full bg-slate-100 h-1.5 mt-3 rounded-full overflow-hidden">
        <div
          className={`${progressBarColor} h-1.5 rounded-full transition-all duration-500`}
          style={{ width: `${calcWidth}%` }}
        />
      </div>

      <div className="mt-2.5 flex items-center justify-between gap-2 text-xs">
        <p className="text-slate-500 line-clamp-1 flex-1 text-[11px]">{description}</p>
        {trend && (
          <span
            className={`inline-flex items-center gap-0.5 font-bold shrink-0 text-[11px] ${
              trend.isPositive ? 'text-emerald-600' : 'text-rose-600'
            }`}
          >
            {trend.direction === 'up' && <TrendingUp className="w-3 h-3" />}
            {trend.direction === 'down' && <TrendingDown className="w-3 h-3" />}
            {trend.direction === 'neutral' && <Minus className="w-3 h-3" />}
            {trend.value}
          </span>
        )}
      </div>
    </div>
  );
};
