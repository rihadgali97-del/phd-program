import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import {
  FileText,
  Download,
  Printer,
  Sliders,
  TrendingDown,
  Sparkles,
  BarChart3,
  Calendar,
  Layers,
  CheckCircle2,
  Table,
  FileSpreadsheet,
  FileCode,
} from 'lucide-react';

export const ReportsAnalyticsPage: React.FC = () => {
  const { kebeles, incidents, dashboardMetrics, showToast } = useApp();

  // Scenario Modeling Interactive States
  const [segregationTarget, setSegregationTarget] = useState<number>(65);
  const [compostingEfficiency, setCompostingEfficiency] = useState<number>(75);
  const [burningReduction, setBurningReduction] = useState<number>(85);

  // Derived Policy Simulator Calculations
  const totalOrganicTonsAnnual = (dashboardMetrics.totalWasteGeneratedDailyKg * 0.61 * 365) / 1000;
  const avoidedOrganicTonsAnnual = Math.round(
    totalOrganicTonsAnnual * (segregationTarget / 100) * (compostingEfficiency / 100)
  );
  // Approx 0.85 t CO2e avoided per ton of aerobically composted MSW vs anaerobic dump
  const calculatedGHGReduction = Math.round(avoidedOrganicTonsAnnual * 0.85 + (burningReduction * 3.8));
  // Financial savings in ETB (1 ton waste diverted saves ~450 ETB in municipal transport/dump management)
  const financialSavingsETB = Math.round(avoidedOrganicTonsAnnual * 450);
  const landfillLifeExtensionYears = (avoidedOrganicTonsAnnual / 18500).toFixed(1);

  // CSV Export Generator
  const handleExportCSV = () => {
    const headers = [
      'Kebele_ID',
      'Kebele_Code',
      'Kebele_Name',
      'Zone',
      'Type',
      'Study_Group',
      'Population',
      'Households',
      'Collection_Coverage_Pct',
      'Segregation_Rate_Pct',
      'Daily_Waste_Gen_Kg',
      'Uncollected_Waste_Kg',
      'Active_Dumping_Reports',
      'Risk_Level',
    ];

    const rows = kebeles.map((k) => [
      k.id,
      k.code,
      `"${k.name}"`,
      `"${k.zone}"`,
      k.type,
      k.group,
      k.population,
      k.households,
      k.collectionCoverage,
      k.segregationRate,
      k.wasteGenerationKgPerDay,
      k.uncollectedWasteKg,
      k.activeDumpingReports,
      k.riskLevel,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `jimma_waste_monitoring_dataset_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Success', 'Downloaded Jimma City Kebele Dataset as CSV.', 'success');
  };

  // JSON Export Generator
  const handleExportJSON = () => {
    const exportPayload = {
      project: 'Climate-Smart Municipal Waste Management for Climate Change Mitigation — Jimma City, Ethiopia',
      generatedAt: new Date().toISOString(),
      city: 'Jimma',
      country: 'Ethiopia',
      metrics: dashboardMetrics,
      kebeles,
      incidents,
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `jimma_cs_imslwm_export_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);

    showToast('Success', 'Exported full monitoring dataset as JSON.', 'success');
  };

  // Print Report Handler
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              Reports, Analytics & Scenario Modeling
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              Policy & Export
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Data export tools, municipal summary scorecards, and interactive climate-smart policy simulation.
          </p>
        </div>

        {/* Action Export Buttons */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            onClick={handleExportJSON}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Summary</span>
          </button>
        </div>
      </div>

      {/* Interactive Scenario Modeling / Policy Simulator (Section 19) */}
      <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-900 text-white rounded-2xl p-6 shadow-xl border border-emerald-800/40 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-emerald-800/60">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-bold font-display text-white">
                Interactive CS-IMSLWM Climate Policy Simulator
              </h3>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Adjust municipal target parameters to project city-wide GHG avoidance, financial savings, and landfill lifespan extension.
            </p>
          </div>
          <span className="px-3 py-1 bg-emerald-800/60 text-emerald-200 text-xs font-bold rounded-full border border-emerald-600 self-start sm:self-auto">
            Live Simulation Engine
          </span>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Slider 1: Segregation Target */}
          <div className="space-y-2 bg-slate-800/60 p-4 rounded-xl border border-slate-700">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-300">1. Target Household Segregation:</span>
              <span className="text-emerald-400 font-mono text-sm">{segregationTarget}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="95"
              step="5"
              value={segregationTarget}
              onChange={(e) => setSegregationTarget(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <p className="text-[11px] text-slate-400">
              City-wide household adherence to 2-stream sorting.
            </p>
          </div>

          {/* Slider 2: Composting Efficiency */}
          <div className="space-y-2 bg-slate-800/60 p-4 rounded-xl border border-slate-700">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-300">2. Decentralized Compost Capture:</span>
              <span className="text-emerald-400 font-mono text-sm">{compostingEfficiency}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="95"
              step="5"
              value={compostingEfficiency}
              onChange={(e) => setCompostingEfficiency(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <p className="text-[11px] text-slate-400">
              Efficiency of Kochi, Jiren & Ifa Bula bio-compost units.
            </p>
          </div>

          {/* Slider 3: Burning Reduction */}
          <div className="space-y-2 bg-slate-800/60 p-4 rounded-xl border border-slate-700">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-300">3. Anti-Burning Enforcement:</span>
              <span className="text-emerald-400 font-mono text-sm">{burningReduction}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              step="5"
              value={burningReduction}
              onChange={(e) => setBurningReduction(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <p className="text-[11px] text-slate-400">
              Kebele Iddir bylaws suppressing roadside smoke.
            </p>
          </div>
        </div>

        {/* Real-time Simulated Outputs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div className="bg-emerald-900/60 p-4 rounded-xl border border-emerald-700/60 space-y-1">
            <span className="text-[11px] text-emerald-300 font-medium block">Avoided Annual GHG</span>
            <span className="text-2xl sm:text-3xl font-bold text-white font-display">
              {calculatedGHGReduction.toLocaleString()}
            </span>
            <span className="text-[10px] text-emerald-300 block">Metric Tons CO₂e / Year</span>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-1">
            <span className="text-[11px] text-slate-300 font-medium block">Diverted Organic Biomass</span>
            <span className="text-2xl sm:text-3xl font-bold text-emerald-400 font-display">
              {avoidedOrganicTonsAnnual.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-400 block">Tons / Year from Dumpsites</span>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-1">
            <span className="text-[11px] text-slate-300 font-medium block">Municipal Budget Savings</span>
            <span className="text-2xl sm:text-3xl font-bold text-white font-display">
              {(financialSavingsETB / 1000000).toFixed(2)}M
            </span>
            <span className="text-[10px] text-slate-400 block">ETB (Ethiopian Birr / Year)</span>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-1">
            <span className="text-[11px] text-slate-300 font-medium block">Landfill Site Lifespan</span>
            <span className="text-2xl sm:text-3xl font-bold text-emerald-400 font-display">
              +{landfillLifeExtensionYears}
            </span>
            <span className="text-[10px] text-slate-400 block">Years Extension of Jimma Landfill</span>
          </div>
        </div>
      </div>

      {/* Monthly Scorecard Report Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-display">
              Jimma City Municipal Waste & Climate Executive Scorecard
            </h3>
            <p className="text-xs text-slate-500">
              Aggregated monthly performance indicators across all 17 municipal kebeles
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>Reporting Period: August 2026</span>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider bg-slate-50/70">
                <th className="py-2.5 px-3">Performance Dimension</th>
                <th className="py-2.5 px-3">Baseline (Q1 2026)</th>
                <th className="py-2.5 px-3">Current Midline</th>
                <th className="py-2.5 px-3">Target Endline</th>
                <th className="py-2.5 px-3">Variance</th>
                <th className="py-2.5 px-3">Evaluation Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 px-3 font-bold text-slate-900">Intervention Arm Waste Segregation Rate</td>
                <td className="py-3 px-3 text-slate-500">14.8%</td>
                <td className="py-3 px-3 font-bold text-emerald-700">{dashboardMetrics.interventionAvgSorting}%</td>
                <td className="py-3 px-3 text-slate-700">70.0%</td>
                <td className="py-3 px-3 font-semibold text-emerald-600">+{dashboardMetrics.interventionAvgSorting - 14.8}%</td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    On Track
                  </span>
                </td>
              </tr>

              <tr>
                <td className="py-3 px-3 font-bold text-slate-900">Comparison Control Segregation Rate</td>
                <td className="py-3 px-3 text-slate-500">12.5%</td>
                <td className="py-3 px-3 font-bold text-slate-700">{dashboardMetrics.comparisonAvgSorting}%</td>
                <td className="py-3 px-3 text-slate-700">15.0%</td>
                <td className="py-3 px-3 font-semibold text-slate-500">+{dashboardMetrics.comparisonAvgSorting - 12.5}%</td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">
                    Control Steady
                  </span>
                </td>
              </tr>

              <tr>
                <td className="py-3 px-3 font-bold text-slate-900">City Waste Collection Coverage</td>
                <td className="py-3 px-3 text-slate-500">44.0%</td>
                <td className="py-3 px-3 font-bold text-emerald-700">{dashboardMetrics.averageCollectionCoverage}%</td>
                <td className="py-3 px-3 text-slate-700">80.0%</td>
                <td className="py-3 px-3 font-semibold text-emerald-600">+{dashboardMetrics.averageCollectionCoverage - 44}%</td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Accelerating
                  </span>
                </td>
              </tr>

              <tr>
                <td className="py-3 px-3 font-bold text-slate-900">Active Open Dumping Hotspots</td>
                <td className="py-3 px-3 text-slate-500">48 sites</td>
                <td className="py-3 px-3 font-bold text-rose-700">{dashboardMetrics.activeIncidentsCount} active reports</td>
                <td className="py-3 px-3 text-slate-700">&lt; 5 sites</td>
                <td className="py-3 px-3 font-semibold text-emerald-600">-81% reduction</td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Rapid Containment
                  </span>
                </td>
              </tr>

              <tr>
                <td className="py-3 px-3 font-bold text-slate-900">Estimated Methane GHG Emissions</td>
                <td className="py-3 px-3 text-slate-500">1,240 t CO₂e/mo</td>
                <td className="py-3 px-3 font-bold text-emerald-700">{dashboardMetrics.estimatedGHGEmissionsCurrent} t CO₂e/mo</td>
                <td className="py-3 px-3 text-slate-700">650 t CO₂e/mo</td>
                <td className="py-3 px-3 font-semibold text-emerald-600">-38% abatement</td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    On Track
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
