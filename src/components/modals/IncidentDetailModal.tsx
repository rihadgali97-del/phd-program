import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { IncidentStatus } from '../../types';
import {
  X,
  AlertTriangle,
  MapPin,
  User,
  Calendar,
  Scale,
  CheckCircle2,
  Clock,
  ArrowRight,
  Shield,
  FileCheck,
} from 'lucide-react';

export const IncidentDetailModal: React.FC = () => {
  const {
    selectedIncidentId,
    setSelectedIncidentId,
    incidents,
    updateIncidentStatus,
    setSelectedKebeleId,
  } = useApp();

  const [resolutionNote, setResolutionNote] = useState('');
  const [selectedNewStatus, setSelectedNewStatus] = useState<IncidentStatus | null>(null);

  if (!selectedIncidentId) return null;

  const incident = incidents.find((i) => i.id === selectedIncidentId);
  if (!incident) return null;

  const statusOptions: IncidentStatus[] = [
    'New',
    'Under Review',
    'Assigned',
    'In Progress',
    'Resolved',
  ];

  const handleApplyStatus = (status: IncidentStatus) => {
    updateIncidentStatus(
      incident.id,
      status,
      status === 'Resolved' ? resolutionNote || 'Cleared and verified by municipal sanitation taskforce.' : undefined
    );
    setSelectedNewStatus(null);
    if (status === 'Resolved') {
      setSelectedIncidentId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-600 text-white shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-emerald-400 font-bold">
                  {incident.id}
                </span>
                <Badge variant="status" value={incident.status} size="sm" />
              </div>
              <h3 className="text-base font-bold font-display mt-0.5">
                {incident.dumpType} in {incident.kebeleName}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSelectedIncidentId(null)}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Incident Details */}
        <div className="p-5 space-y-4 text-xs">
          {/* Key Facts */}
          <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-500 block mb-0.5">Kebele Location</span>
              <button
                type="button"
                onClick={() => {
                  setSelectedKebeleId(incident.kebeleId);
                  setSelectedIncidentId(null);
                }}
                className="font-bold text-emerald-700 hover:underline flex items-center gap-1 text-left"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{incident.kebeleName}</span>
              </button>
            </div>

            <div>
              <span className="text-slate-500 block mb-0.5">Estimated Waste</span>
              <span className="font-bold text-slate-900 text-sm flex items-center gap-1">
                <Scale className="w-3.5 h-3.5 text-slate-400" />
                {incident.estimatedWeightKg.toLocaleString()} kg
              </span>
            </div>

            <div>
              <span className="text-slate-500 block mb-0.5">Reported Date</span>
              <span className="font-semibold text-slate-800 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {incident.date}
              </span>
            </div>

            <div>
              <span className="text-slate-500 block mb-0.5">Reported By</span>
              <span className="font-semibold text-slate-800 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-400" />
                {incident.reporterName}
              </span>
            </div>
          </div>

          {/* Description & Landmark */}
          <div className="space-y-2">
            <div>
              <span className="font-bold uppercase tracking-wider text-slate-500 text-[10px] block mb-1">
                Landmark / Specific Location
              </span>
              <p className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-slate-700">
                {incident.landmark || 'No specific landmark provided.'}
              </p>
            </div>

            <div>
              <span className="font-bold uppercase tracking-wider text-slate-500 text-[10px] block mb-1">
                Incident Description
              </span>
              <p className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-slate-800 leading-relaxed">
                {incident.description}
              </p>
            </div>
          </div>

          {/* If already resolved, show resolution summary */}
          {incident.status === 'Resolved' && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900">
              <div className="flex items-center gap-1.5 font-bold mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Resolved on {incident.resolvedAt || 'Recent'}</span>
              </div>
              <p className="text-[11px] text-emerald-800">
                {incident.resolvedNote || 'Incident cleared and verified by sanitation team.'}
              </p>
            </div>
          )}

          {/* Workflow Action: Update Status */}
          <div className="pt-3 border-t border-slate-200 space-y-3">
            <span className="font-bold uppercase tracking-wider text-slate-700 text-[10px] block">
              Workflow Status Progression
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {statusOptions.map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => handleApplyStatus(st)}
                  className={`p-2 rounded-lg border text-xs font-semibold text-center transition-all ${
                    incident.status === st
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {incident.status !== 'Resolved' && (
              <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <label className="block text-[11px] font-semibold text-slate-700">
                  Resolution / Dispatch Note
                </label>
                <input
                  type="text"
                  value={resolutionNote}
                  onChange={(e) => setResolutionNote(e.target.value)}
                  placeholder="e.g. Cleared by Kebele Waste Cooperative #3 and diverted to composting pit."
                  className="w-full px-3 py-1.5 text-xs bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => handleApplyStatus('Resolved')}
                  className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mark as Resolved & Deduct Kebele Backlog</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={() => setSelectedIncidentId(null)}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
