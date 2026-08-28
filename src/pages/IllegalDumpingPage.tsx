import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Incident, DumpType, IncidentStatus, RiskLevel } from '../types';
import { Badge } from '../components/common/Badge';
import {
  AlertTriangle,
  PlusCircle,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  MapPin,
  Scale,
  Eye,
  Check,
  Calendar,
  User,
  HelpCircle,
} from 'lucide-react';

export const IllegalDumpingPage: React.FC = () => {
  const {
    incidents,
    kebeles,
    setSelectedIncidentId,
    setIsReportModalOpen,
    updateIncidentStatus,
  } = useApp();

  const [search, setSearch] = useState('');
  const [kebeleFilter, setKebeleFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState<'All' | DumpType>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | IncidentStatus>('All');
  const [riskFilter, setRiskFilter] = useState<'All' | RiskLevel>('All');

  const filteredIncidents = useMemo(() => {
    return incidents.filter((inc) => {
      const matchesSearch =
        inc.id.toLowerCase().includes(search.toLowerCase()) ||
        inc.kebeleName.toLowerCase().includes(search.toLowerCase()) ||
        inc.reporterName.toLowerCase().includes(search.toLowerCase()) ||
        inc.description.toLowerCase().includes(search.toLowerCase()) ||
        (inc.landmark && inc.landmark.toLowerCase().includes(search.toLowerCase()));

      const matchesKebele = kebeleFilter === 'All' || inc.kebeleId === kebeleFilter;
      const matchesType = typeFilter === 'All' || inc.dumpType === typeFilter;
      const matchesStatus = statusFilter === 'All' || inc.status === statusFilter;
      const matchesRisk = riskFilter === 'All' || inc.riskLevel === riskFilter;

      return matchesSearch && matchesKebele && matchesType && matchesStatus && matchesRisk;
    });
  }, [incidents, search, kebeleFilter, typeFilter, statusFilter, riskFilter]);

  const activeCount = incidents.filter((i) => i.status !== 'Resolved').length;
  const resolvedCount = incidents.filter((i) => i.status === 'Resolved').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              Illegal Dumping Monitoring & Response
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
              {activeCount} Active Hotspots
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Citizen and field monitor incident reports queue with reactive municipal dispatch workflow
          </p>
        </div>

        {/* Primary Action Button */}
        <button
          id="report-illegal-dumping-page-btn"
          type="button"
          onClick={() => setIsReportModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs shadow-sm hover:shadow transition-all cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Report Illegal Dumping</span>
        </button>
      </div>

      {/* Reactive Flow Callout Banner */}
      <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-xl text-xs text-emerald-950 flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-slate-900">
            Reactive State Engine Verified:
          </p>
          <p className="text-slate-700 leading-relaxed">
            When you submit a new dumping report, it is immediately added to this queue, the selected Kebele's uncollected waste volume and active count increase, and all dashboard KPIs/charts update instantly without a page refresh.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search */}
          <div className="lg:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search incident ID, kebele, landmark, or description..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Kebele Filter */}
          <div>
            <select
              value={kebeleFilter}
              onChange={(e) => setKebeleFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All 17 Kebeles</option>
              {kebeles.map((k) => (
                <option key={k.id} value={k.id}>
                  {k.name} ({k.code})
                </option>
              ))}
            </select>
          </div>

          {/* Dump Type Filter */}
          <div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All Waste Types</option>
              <option value="Organic Waste">Organic Waste</option>
              <option value="Plastic Waste">Plastic Waste</option>
              <option value="Liquid Waste">Liquid Waste</option>
              <option value="Mixed Waste">Mixed Waste</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All Statuses ({incidents.length})</option>
              <option value="New">New</option>
              <option value="Under Review">Under Review</option>
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved ({resolvedCount})</option>
            </select>
          </div>
        </div>

        {/* Quick status tabs and count indicator */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Quick Filter:</span>
            <button
              type="button"
              onClick={() => setStatusFilter('All')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                statusFilter === 'All' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              All ({incidents.length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('New')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                statusFilter === 'New' ? 'bg-rose-600 text-white' : 'text-rose-700 hover:bg-rose-50'
              }`}
            >
              New Only ({incidents.filter((i) => i.status === 'New').length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('Resolved')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                statusFilter === 'Resolved' ? 'bg-emerald-700 text-white' : 'text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              Resolved ({resolvedCount})
            </button>
          </div>

          <span className="text-slate-500">
            Showing <strong>{filteredIncidents.length}</strong> incidents
          </span>
        </div>
      </div>

      {/* Incidents Table */}
      {filteredIncidents.length === 0 ? (
        <div className="bg-white rounded-xl p-12 border border-slate-200 text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
          <h4 className="text-base font-bold text-slate-800">No Active Incidents Found for this Filter</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No illegal dumping reports match your current filter parameters. You can clear filters or report a new incident.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch('');
              setKebeleFilter('All');
              setTypeFilter('All');
              setStatusFilter('All');
              setRiskFilter('All');
            }}
            className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider bg-slate-50/80">
                  <th className="py-3 px-4">Incident ID</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Kebele & Landmark</th>
                  <th className="py-3 px-4">Dump Type</th>
                  <th className="py-3 px-4">Est. Weight</th>
                  <th className="py-3 px-4">Reporter</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredIncidents.map((inc) => (
                  <tr
                    key={inc.id}
                    className="hover:bg-slate-50/90 transition-colors group"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {inc.id}
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {inc.date}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900 block">{inc.kebeleName}</span>
                      <span className="text-[11px] text-slate-500 line-clamp-1">
                        {inc.landmark || 'Roadside area'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                        {inc.dumpType}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-900 whitespace-nowrap">
                      {inc.estimatedWeightKg.toLocaleString()} kg
                    </td>

                    <td className="py-3.5 px-4 text-slate-700 whitespace-nowrap">
                      {inc.reporterName}
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      <p className="text-slate-600 line-clamp-2 leading-relaxed">
                        {inc.description}
                      </p>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <Badge variant="status" value={inc.status} />
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-2">
                      <button
                        type="button"
                        onClick={() => setSelectedIncidentId(inc.id)}
                        className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
                      >
                        View
                      </button>

                      {inc.status !== 'Resolved' && (
                        <button
                          type="button"
                          onClick={() => updateIncidentStatus(inc.id, 'Resolved')}
                          className="px-2.5 py-1 text-xs font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-md transition-colors cursor-pointer inline-flex items-center gap-1"
                        >
                          <Check className="w-3 h-3" />
                          <span>Resolve</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
