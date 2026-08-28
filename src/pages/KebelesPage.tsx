import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Kebele, StudyGroup, KebeleType, RiskLevel } from '../types';
import { Badge } from '../components/common/Badge';
import {
  MapPin,
  Search,
  Filter,
  LayoutGrid,
  List,
  Users,
  Home,
  Trash2,
  Recycle,
  AlertTriangle,
  ArrowUpDown,
  PlusCircle,
  TrendingUp,
} from 'lucide-react';

export const KebelesPage: React.FC = () => {
  const { kebeles, setSelectedKebeleId, setIsReportModalOpen } = useApp();

  const [search, setSearch] = useState('');
  const [groupFilter, setGroupFilter] = useState<'All' | StudyGroup>('All');
  const [typeFilter, setTypeFilter] = useState<'All' | KebeleType>('All');
  const [riskFilter, setRiskFilter] = useState<'All' | RiskLevel>('All');
  const [sortBy, setSortBy] = useState<'name' | 'collectionCoverage' | 'segregationRate' | 'uncollectedWasteKg' | 'activeDumpingReports' | 'population'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const filteredKebeles = useMemo(() => {
    return kebeles
      .filter((k) => {
        const matchesSearch =
          k.name.toLowerCase().includes(search.toLowerCase()) ||
          k.code.toLowerCase().includes(search.toLowerCase()) ||
          k.zone.toLowerCase().includes(search.toLowerCase());
        const matchesGroup = groupFilter === 'All' || k.group === groupFilter;
        const matchesType = typeFilter === 'All' || k.type === typeFilter;
        const matchesRisk = riskFilter === 'All' || k.riskLevel === riskFilter;

        return matchesSearch && matchesGroup && matchesType && matchesRisk;
      })
      .sort((a, b) => {
        let valA = a[sortBy];
        let valB = b[sortBy];
        if (typeof valA === 'string') {
          valA = (valA as string).toLowerCase();
          valB = (valB as string).toLowerCase();
        }
        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [kebeles, search, groupFilter, typeFilter, riskFilter, sortBy, sortOrder]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              All 17 Kebeles of Jimma City
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              17 Clusters
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Cluster-randomized baseline and midline monitoring dataset (12 Urban, 5 Peri-Urban)
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsReportModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Report Kebele Incident</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search Input */}
          <div className="lg:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search kebele name, code (e.g. MK-01), or zone..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Group Filter */}
          <div>
            <select
              value={groupFilter}
              onChange={(e) => setGroupFilter(e.target.value as any)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All Trial Arms</option>
              <option value="Intervention">Intervention Arm (9)</option>
              <option value="Comparison">Comparison Control (8)</option>
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All Kebele Types</option>
              <option value="Urban">Urban (12)</option>
              <option value="Peri-Urban">Peri-Urban (5)</option>
            </select>
          </div>

          {/* Risk Filter */}
          <div>
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value as any)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All Risk Levels</option>
              <option value="Low">Low Risk</option>
              <option value="Medium">Medium Risk</option>
              <option value="High">High Risk</option>
            </select>
          </div>
        </div>

        {/* Second Row: Sorting and Layout Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2 py-1 text-xs rounded-md border border-slate-200 bg-white font-medium"
            >
              <option value="name">Kebele Name</option>
              <option value="collectionCoverage">Collection Coverage (%)</option>
              <option value="segregationRate">Waste Segregation Rate (%)</option>
              <option value="uncollectedWasteKg">Uncollected Waste (kg)</option>
              <option value="activeDumpingReports">Active Dumps Count</option>
              <option value="population">Population</option>
            </select>
            <button
              type="button"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-1 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50"
              aria-label="Toggle sort order"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-500">
              Showing <strong>{filteredKebeles.length}</strong> of 17 kebeles
            </span>
            <div className="flex items-center p-0.5 bg-slate-100 rounded-lg">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md ${
                  viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-md ${
                  viewMode === 'table' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                aria-label="Table view"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid or Table View */}
      {filteredKebeles.length === 0 ? (
        <div className="bg-white rounded-xl p-12 border border-slate-200 text-center space-y-3">
          <MapPin className="w-10 h-10 text-slate-300 mx-auto" />
          <h4 className="text-base font-bold text-slate-800">No Kebeles Match Your Filters</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search criteria or resetting the trial group and risk level filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch('');
              setGroupFilter('All');
              setTypeFilter('All');
              setRiskFilter('All');
            }}
            className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg"
          >
            Clear All Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredKebeles.map((kebele) => (
            <div
              key={kebele.id}
              onClick={() => setSelectedKebeleId(kebele.id)}
              className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="font-mono text-[11px] font-bold text-slate-400 block">
                      {kebele.code}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 font-display group-hover:text-emerald-700 transition-colors">
                      {kebele.name}
                    </h3>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant="risk" value={kebele.riskLevel} size="sm" />
                    <Badge variant="group" value={kebele.group} size="sm" />
                  </div>
                </div>

                <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                  {kebele.description}
                </p>

                {/* Micro Metric Gauges */}
                <div className="space-y-2.5 bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-600 mb-1">
                      <span className="flex items-center gap-1">
                        <Trash2 className="w-3.5 h-3.5 text-slate-400" />
                        Collection Coverage
                      </span>
                      <span className="font-bold text-slate-900">{kebele.collectionCoverage}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5">
                      <div
                        className="bg-emerald-600 h-1.5 rounded-full"
                        style={{ width: `${kebele.collectionCoverage}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-600 mb-1">
                      <span className="flex items-center gap-1">
                        <Recycle className="w-3.5 h-3.5 text-slate-400" />
                        Segregation Rate
                      </span>
                      <span className="font-bold text-slate-900">{kebele.segregationRate}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5">
                      <div
                        className="bg-blue-600 h-1.5 rounded-full"
                        style={{ width: `${kebele.segregationRate}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>{kebele.population.toLocaleString()} pop</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold text-rose-700">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{kebele.activeDumpingReports} Dumps ({kebele.uncollectedWasteKg.toLocaleString()}kg)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider bg-slate-50/70">
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Kebele Name</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Trial Arm</th>
                <th className="py-3 px-4">Population (HHs)</th>
                <th className="py-3 px-4">Coverage</th>
                <th className="py-3 px-4">Segregation</th>
                <th className="py-3 px-4">Uncollected Waste</th>
                <th className="py-3 px-4">Active Dumps</th>
                <th className="py-3 px-4">Risk Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredKebeles.map((k) => (
                <tr
                  key={k.id}
                  onClick={() => setSelectedKebeleId(k.id)}
                  className="hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <td className="py-3 px-4 font-mono font-bold text-slate-600">{k.code}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{k.name}</td>
                  <td className="py-3 px-4 text-slate-500">{k.type}</td>
                  <td className="py-3 px-4">
                    <Badge variant="group" value={k.group} size="sm" />
                  </td>
                  <td className="py-3 px-4 text-slate-700">
                    {k.population.toLocaleString()} ({k.households.toLocaleString()} HH)
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{k.collectionCoverage}%</td>
                  <td className="py-3 px-4 font-semibold text-emerald-700">{k.segregationRate}%</td>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-800">
                    {k.uncollectedWasteKg.toLocaleString()} kg
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold ${
                        k.activeDumpingReports > 0 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {k.activeDumpingReports}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="risk" value={k.riskLevel} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
