import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DumpType, IncidentPriority, RiskLevel } from '../../types';
import {
  X,
  AlertTriangle,
  Scale,
  MapPin,
  User,
  Phone,
  FileText,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';

export const ReportDumpingModal: React.FC = () => {
  const { isReportModalOpen, setIsReportModalOpen, kebeles, addIncident } = useApp();

  const [reporterName, setReporterName] = useState('');
  const [reporterContact, setReporterContact] = useState('');
  const [kebeleId, setKebeleId] = useState(kebeles[0]?.id || 'keb-01');
  const [landmark, setLandmark] = useState('');
  const [dumpType, setDumpType] = useState<DumpType>('Organic Waste');
  const [estimatedWeightKg, setEstimatedWeightKg] = useState<string>('150');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<IncidentPriority>('Normal');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isReportModalOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!reporterName.trim()) {
      errs.reporterName = 'Reporter name is required.';
    }
    if (!kebeleId) {
      errs.kebeleId = 'Please select a kebele.';
    }
    const weightNum = parseFloat(estimatedWeightKg);
    if (isNaN(weightNum) || weightNum <= 0) {
      errs.estimatedWeightKg = 'Please enter a valid estimated weight in kilograms (> 0).';
    }
    if (!description.trim() || description.trim().length < 10) {
      errs.description = 'Please provide a brief description (at least 10 characters).';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const weightNum = parseFloat(estimatedWeightKg);
    const risk: RiskLevel = weightNum >= 500 ? 'High' : weightNum >= 250 ? 'Medium' : 'Low';

    setTimeout(() => {
      addIncident({
        reporterName: reporterName.trim(),
        reporterContact: reporterContact.trim(),
        kebeleId,
        landmark: landmark.trim(),
        dumpType,
        estimatedWeightKg: weightNum,
        description: description.trim(),
        riskLevel: risk,
        priority,
      });

      setIsSubmitting(false);
      setIsReportModalOpen(false);

      // Reset form
      setReporterName('');
      setReporterContact('');
      setLandmark('');
      setDescription('');
      setEstimatedWeightKg('150');
      setPriority('Normal');
      setErrors({});
    }, 200);
  };

  const selectedKebeleObj = kebeles.find((k) => k.id === kebeleId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-600 text-white shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display">
                Report Illegal Dumping Incident
              </h3>
              <p className="text-xs text-slate-300">
                Community & Field Monitoring — Jimma City Sanitation Rapid Response
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsReportModalOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Reporter Information */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-emerald-600" />
              1. Reporter Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Reporter Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={reporterName}
                  onChange={(e) => setReporterName(e.target.value)}
                  placeholder="e.g. Tolasa Dibaba"
                  className={`w-full px-3 py-2 text-xs rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    errors.reporterName ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                  }`}
                />
                {errors.reporterName && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.reporterName}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
                  <span>Contact Number</span>
                  <span className="text-[10px] text-slate-400">Optional</span>
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={reporterContact}
                    onChange={(e) => setReporterContact(e.target.value)}
                    placeholder="+251 9X XXX XXXX"
                    className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Location & Kebele Selection */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              2. Location in Jimma City
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kebele <span className="text-rose-500">*</span>
                </label>
                <select
                  value={kebeleId}
                  onChange={(e) => setKebeleId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {kebeles.map((k) => (
                    <option key={k.id} value={k.id}>
                      {k.name} ({k.code}) — {k.type} [{k.group}]
                    </option>
                  ))}
                </select>
                {selectedKebeleObj && (
                  <p className="text-[10px] text-slate-500 mt-1">
                    Zone: {selectedKebeleObj.zone} • Active Dumps: {selectedKebeleObj.activeDumpingReports}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Specific Landmark / Street
                </label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="e.g. Near Awetu Bridge, opposite market shed 2"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Dump Type & Estimated Weight */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-emerald-600" />
              3. Waste Classification & Volume
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Dump Waste Type <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Organic Waste', 'Plastic Waste', 'Liquid Waste', 'Mixed Waste'] as DumpType[]).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setDumpType(type)}
                      className={`p-2 text-xs font-semibold rounded-lg border text-left transition-all ${
                        dumpType === type
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-600'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Est. Weight (kg) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    step="5"
                    value={estimatedWeightKg}
                    onChange={(e) => setEstimatedWeightKg(e.target.value)}
                    placeholder="150"
                    className={`w-full px-3 py-2 text-xs rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono ${
                      errors.estimatedWeightKg ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                    }`}
                  />
                  <span className="absolute right-3 top-2 text-xs font-medium text-slate-400">kg</span>
                </div>
                {errors.estimatedWeightKg && (
                  <p className="text-[10px] text-rose-600 mt-1">{errors.estimatedWeightKg}</p>
                )}
              </div>
            </div>
          </div>

          {/* Description & Priority */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-600" />
                4. Incident Details & Priority
              </h4>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Urgency:</span>
                {(['Normal', 'Urgent', 'Critical'] as IncidentPriority[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`px-2 py-0.5 text-[11px] font-semibold rounded-md border ${
                      priority === p
                        ? p === 'Critical'
                          ? 'bg-rose-100 border-rose-300 text-rose-900'
                          : p === 'Urgent'
                          ? 'bg-amber-100 border-amber-300 text-amber-900'
                          : 'bg-emerald-100 border-emerald-300 text-emerald-900'
                        : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the dumping situation, blockage of drains, odor, proximity to water bodies, or observed burning..."
                className={`w-full p-3 text-xs rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  errors.description ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                }`}
              />
              {errors.description && (
                <p className="text-[11px] text-rose-600 mt-1">{errors.description}</p>
              )}
            </div>
          </div>

          {/* Reactive notice badge */}
          <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl flex items-start gap-2.5 text-xs text-emerald-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Live Reactive Update:</span> Submitting will immediately update the selected Kebele's uncollected waste (+{estimatedWeightKg || 0} kg), increment its active incident counter, recalculate city KPIs, and log it to the active incidents monitoring queue.
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsReportModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              id="submit-dump-report-btn"
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting Report...' : 'Submit Dumping Incident'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
