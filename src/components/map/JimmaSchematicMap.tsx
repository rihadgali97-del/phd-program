import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Kebele, RiskLevel, StudyGroup } from '../../types';
import { MapPin, Info, Layers, Eye, ShieldAlert, Sparkles } from 'lucide-react';

interface JimmaSchematicMapProps {
  onSelectKebele?: (kebele: Kebele) => void;
  className?: string;
}

export const JimmaSchematicMap: React.FC<JimmaSchematicMapProps> = ({
  onSelectKebele,
  className = '',
}) => {
  const { kebeles, setSelectedKebeleId } = useApp();
  const [colorMode, setColorMode] = useState<'risk' | 'group'>('risk');
  const [hoveredKebele, setHoveredKebele] = useState<Kebele | null>(null);

  const handleKebeleClick = (kebele: Kebele) => {
    setSelectedKebeleId(kebele.id);
    if (onSelectKebele) onSelectKebele(kebele);
  };

  const getNodeColor = (kebele: Kebele) => {
    if (colorMode === 'risk') {
      if (kebele.riskLevel === 'High') return { fill: '#fee2e2', stroke: '#ef4444', text: '#991b1b', dot: '#dc2626' };
      if (kebele.riskLevel === 'Medium') return { fill: '#fef3c7', stroke: '#f59e0b', text: '#92400e', dot: '#d97706' };
      return { fill: '#ecfdf5', stroke: '#10b981', text: '#065f46', dot: '#059669' };
    } else {
      if (kebele.group === 'Intervention') {
        return { fill: '#d1fae5', stroke: '#059669', text: '#064e3b', dot: '#10b981' };
      }
      return { fill: '#f1f5f9', stroke: '#64748b', text: '#1e293b', dot: '#94a3b8' };
    }
  };

  return (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-xs p-5 ${className}`}>
      {/* Map Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 font-display">
              Jimma City Kebele Monitoring Map
            </h3>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              Schematic GIS Model
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Interactive topology of all 17 municipal kebeles with Awetu River corridor & trial arms
          </p>
        </div>

        {/* Color Mode Toggle Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setColorMode('risk')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
              colorMode === 'risk'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Risk Status
          </button>
          <button
            type="button"
            onClick={() => setColorMode('group')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
              colorMode === 'group'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Trial Arms
          </button>
        </div>
      </div>

      {/* Main SVG Schematic Map Container */}
      <div className="relative bg-slate-50/80 rounded-xl p-4 border border-slate-200/80 overflow-hidden min-h-[420px] flex items-center justify-center">
        {/* Schematic Background Guide Lines & River Overlay */}
        <svg
          viewBox="0 0 1000 620"
          className="w-full h-auto max-h-[500px] select-none"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.02))' }}
        >
          <defs>
            {/* River Gradient */}
            <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
            </linearGradient>
            {/* Urban boundary pattern */}
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.75" />
            </pattern>
          </defs>

          {/* Grid Background */}
          <rect width="1000" height="620" fill="url(#grid)" />

          {/* Urban Core Area Outline Shading */}
          <ellipse cx="480" cy="300" rx="360" ry="220" fill="#f8fafc" stroke="#cbd5e1" strokeDasharray="4 4" strokeWidth="1.5" />
          <text x="140" y="110" fill="#94a3b8" fontSize="13" fontWeight="bold" letterSpacing="2">
            PERI-URBAN ZONE
          </text>
          <text x="430" y="140" fill="#64748b" fontSize="13" fontWeight="bold" letterSpacing="3">
            JIMMA URBAN MUNICIPAL CORE
          </text>

          {/* Awetu River Path */}
          <path
            d="M 440,20 Q 480,140 500,240 T 520,380 T 460,500 T 420,600"
            fill="none"
            stroke="url(#riverGradient)"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <text x="535" y="320" fill="#2563eb" fontSize="12" fontWeight="bold" transform="rotate(78, 535, 320)">
            Awetu River Corridor
          </text>

          {/* Secondary Streams & Corridors */}
          <path d="M 280,40 Q 320,180 480,240" fill="none" stroke="#bfdbfe" strokeWidth="4" strokeDasharray="3 3" />
          <path d="M 720,80 Q 640,220 520,380" fill="none" stroke="#bfdbfe" strokeWidth="4" strokeDasharray="3 3" />

          {/* Main Transportation Axes */}
          <line x1="80" y1="310" x2="920" y2="310" stroke="#e2e8f0" strokeWidth="3" />
          <line x1="480" y1="40" x2="480" y2="580" stroke="#e2e8f0" strokeWidth="3" />
          <text x="830" y="300" fill="#94a3b8" fontSize="10" fontWeight="bold">To Addis Ababa →</text>
          <text x="90" y="300" fill="#94a3b8" fontSize="10" fontWeight="bold">← To Agaro / Bonga</text>

          {/* Render 17 Kebele Nodes */}
          {kebeles.map((kebele) => {
            // Map 0-100 coordinates to SVG 1000x620 space
            const svgX = (kebele.coordinates.x / 100) * 880 + 60;
            const svgY = (kebele.coordinates.y / 100) * 520 + 50;
            const colors = getNodeColor(kebele);
            const isHovered = hoveredKebele?.id === kebele.id;

            return (
              <g
                key={kebele.id}
                transform={`translate(${svgX}, ${svgY})`}
                className="cursor-pointer transition-all duration-150"
                onClick={() => handleKebeleClick(kebele)}
                onMouseEnter={() => setHoveredKebele(kebele)}
                onMouseLeave={() => setHoveredKebele(null)}
              >
                {/* Outer Ring / Pulsing Effect if High Risk */}
                {kebele.riskLevel === 'High' && (
                  <circle
                    r={isHovered ? 38 : 32}
                    fill="#fee2e2"
                    opacity="0.6"
                    className="animate-ping"
                    style={{ animationDuration: '3s' }}
                  />
                )}

                {/* Node Box */}
                <rect
                  x={-60}
                  y={-28}
                  width="120"
                  height="56"
                  rx="10"
                  fill={colors.fill}
                  stroke={isHovered ? '#0f172a' : colors.stroke}
                  strokeWidth={isHovered ? '2.5' : '1.5'}
                  filter={isHovered ? 'drop-shadow(0 6px 12px rgba(0,0,0,0.15))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.05))'}
                />

                {/* Kebele Code & Type Badge */}
                <circle cx="-42" cy="-10" r="4" fill={colors.dot} />
                <text
                  x="-32"
                  y="-7"
                  fill={colors.text}
                  fontSize="10"
                  fontWeight="bold"
                  letterSpacing="0.5"
                >
                  {kebele.code}
                </text>

                <text
                  x="48"
                  y="-7"
                  textAnchor="end"
                  fill="#64748b"
                  fontSize="9"
                  fontWeight="bold"
                >
                  {kebele.group === 'Intervention' ? 'INT' : 'CMP'}
                </text>

                {/* Kebele Name */}
                <text
                  x="0"
                  y="12"
                  textAnchor="middle"
                  fill="#0f172a"
                  fontSize="11"
                  fontWeight="bold"
                >
                  {kebele.name.length > 15 ? kebele.name.substring(0, 13) + '..' : kebele.name}
                </text>

                {/* Micro Metric Info on Node */}
                <text
                  x="0"
                  y="22"
                  textAnchor="middle"
                  fill="#475569"
                  fontSize="8.5"
                  fontWeight="500"
                >
                  Cov: {kebele.collectionCoverage}% • Seg: {kebele.segregationRate}%
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip Panel on Hover */}
        {hoveredKebele && (
          <div className="absolute bottom-4 left-4 bg-slate-900 text-white p-3.5 rounded-xl shadow-xl max-w-xs border border-slate-700 text-xs z-30 pointer-events-none animate-in fade-in duration-100">
            <div className="flex items-center justify-between gap-2 pb-1.5 mb-1.5 border-b border-slate-800">
              <span className="font-bold text-sm text-emerald-400 font-display">
                {hoveredKebele.name} ({hoveredKebele.code})
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-200">
                {hoveredKebele.type}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-slate-300">
              <div>Group: <span className="font-semibold text-white">{hoveredKebele.group}</span></div>
              <div>Risk Level: <span className="font-semibold text-white">{hoveredKebele.riskLevel}</span></div>
              <div>Coverage: <span className="font-semibold text-emerald-400">{hoveredKebele.collectionCoverage}%</span></div>
              <div>Segregation: <span className="font-semibold text-emerald-400">{hoveredKebele.segregationRate}%</span></div>
              <div>Uncollected: <span className="font-semibold text-amber-400">{hoveredKebele.uncollectedWasteKg.toLocaleString()} kg</span></div>
              <div>Active Dumps: <span className="font-semibold text-rose-400">{hoveredKebele.activeDumpingReports}</span></div>
            </div>
            <p className="mt-2 text-[10px] text-slate-400 italic line-clamp-1 border-t border-slate-800 pt-1">
              Click node to open full monitoring profile
            </p>
          </div>
        )}
      </div>

      {/* Map Legend and Future GIS Callout */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-semibold text-slate-700">Legend:</span>
          {colorMode === 'risk' ? (
            <>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500 border border-emerald-600" />
                <span className="text-slate-600">Low Environmental Risk</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-500 border border-amber-600" />
                <span className="text-slate-600">Medium Risk / Warning</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500 border border-red-600" />
                <span className="text-slate-600">High Risk / Active Dumps</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500 border border-emerald-600" />
                <span className="text-slate-600">Intervention Arm (9 Kebeles)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-slate-400 border border-slate-500" />
                <span className="text-slate-600">Comparison Control Arm (8 Kebeles)</span>
              </div>
            </>
          )}
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-1.5 bg-blue-500 rounded" />
            <span className="text-slate-600">Awetu River Corridor</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
          <Info className="w-3.5 h-3.5 text-slate-400" />
          <span>GIS Readiness: Leaflet / OpenStreetMap / PostGIS geo-coordinates pre-configured.</span>
        </div>
      </div>
    </div>
  );
};
