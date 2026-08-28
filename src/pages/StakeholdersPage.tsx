import React from 'react';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/common/StatCard';
import {
  Users,
  Building2,
  HeartHandshake,
  Award,
  Smile,
  MessageSquareQuote,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const StakeholdersPage: React.FC = () => {
  const { stakeholders } = useApp();

  const engagementEvents = [
    {
      title: 'City-Wide Iddir Leadership Forum on Source Segregation',
      date: 'Aug 14, 2026',
      venue: 'Jimma Aba Jifar Hall',
      participants: '180 Iddir Chairs & Elders',
      outcome: 'Signed mutual community covenant enforcing organic vs dry waste household sorting.',
    },
    {
      title: 'Youth Waste Collector Micro-Enterprise Occupational Safety Training',
      date: 'Jul 28, 2026',
      venue: 'Jimma University College of Public Health',
      participants: '142 Primary Waste Handlers',
      outcome: 'Distributed PPE (puncture-proof gloves, boots, masks, tetanus booster cards).',
    },
    {
      title: 'Green Schools Waste Sorting Competition Launch',
      date: 'Jul 10, 2026',
      venue: '12 Primary & Secondary Schools in Kochi & Ginjo',
      participants: '3,400 Students & Teachers',
      outcome: 'Installed 3-stream sorting bins (Plastics, Paper, Compostable Organic).',
    },
    {
      title: 'Commercial Coffee Washing Stations Effluent Management Workshop',
      date: 'Jun 22, 2026',
      venue: 'Oromia Agricultural Bureau, Jimma Branch',
      participants: '45 Coffee Mill Operators',
      outcome: 'Established biological pre-treatment guidelines before river discharge.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
            Stakeholder Engagement & Community Co-Design
          </h2>
          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
            Participatory Governance
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Multistakeholder collaboration engaging municipal bodies, Jimma University, Iddir networks, and frontline waste micro-enterprises.
        </p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Organized Stakeholder Pillars"
          value={stakeholders.length}
          unit="Groups"
          description="Across 17 kebeles and municipal agencies"
          icon={Building2}
          highlight="default"
        />

        <StatCard
          title="Iddir Associations Engaged"
          value="184"
          unit="Iddirs"
          description="Traditional community social structures"
          icon={HeartHandshake}
          highlight="emerald"
        />

        <StatCard
          title="Trained Waste Handlers"
          value="320"
          unit="Workers"
          description="Equipped with safety PPE & pushcarts"
          icon={Award}
          highlight="emerald"
        />

        <StatCard
          title="Community Satisfaction"
          value="86"
          unit="%"
          description="Positive rating in intervention kebeles"
          icon={Smile}
          highlight="emerald"
        />
      </div>

      {/* Stakeholder Organizations Grid */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 font-display">
            Institutional Stakeholder Architecture
          </h3>
          <p className="text-xs text-slate-500">
            Roles, responsibilities, and key co-creation activities in Jimma City
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stakeholders.map((st) => (
            <div
              key={st.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:border-slate-300 transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    {st.engagementLevel} Engagement
                  </span>
                  <span className="text-xs font-bold text-slate-700">{st.participantCount.toLocaleString()} Members</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm font-display">{st.category}</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{st.roleDescription}</p>
              </div>

              <div className="pt-2 border-t border-slate-200 text-xs text-slate-600 space-y-1.5">
                <p className="font-semibold text-emerald-800 text-[11px]">
                  Target Outcome: {st.targetOutcomes}
                </p>
                <div className="text-[11px] text-slate-500">
                  <span className="font-medium text-slate-700">Organizations: </span>
                  {st.representedOrganizations.join(', ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Co-Design & Iddir Partnership Spotlight */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-xl p-6 shadow-md border border-slate-800 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-600 rounded-xl text-white">
            <MessageSquareQuote className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold font-display text-white">
              The Iddir-Based Social Governance Model in Jimma
            </h3>
            <p className="text-xs text-slate-300">
              Leveraging indigenous Oromo mutual-aid institutions to sustain household waste sorting
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-3xl">
          Rather than relying solely on municipal fines, the CS-IMSLWM project partners with local <strong>Iddirs</strong> (traditional funeral and community mutual-aid associations) to establish community norms for waste sorting. When households fail to separate organics or dump waste near waterways, peer accountability and Iddir covenants achieve over <strong>85% voluntary compliance</strong> in intervention kebeles like Mendera Kochi and Jiren.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
            <span className="text-emerald-400 font-bold block mb-1">1. Peer Education</span>
            <p className="text-slate-300">Monthly Iddir coffee ceremonies include 10-minute waste sorting refresher talks.</p>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
            <span className="text-emerald-400 font-bold block mb-1">2. Sacks Distribution</span>
            <p className="text-slate-300">Iddir leaders oversee distribution of green (organic) and blue (plastics) sacks.</p>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
            <span className="text-emerald-400 font-bold block mb-1">3. Social Bylaws</span>
            <p className="text-slate-300">Community agreements preventing open burning and roadside dumping.</p>
          </div>
        </div>
      </div>

      {/* Engagement Activity Logs */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 font-display">
            Recent Stakeholder Engagement Activities
          </h3>
          <p className="text-xs text-slate-500">
            Chronological log of multi-actor workshops, capacity development, and co-creation sessions
          </p>
        </div>

        <div className="space-y-3">
          {engagementEvents.map((evt, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-all text-xs space-y-1.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{evt.title}</h4>
                <span className="text-slate-500 font-mono text-[11px]">{evt.date}</span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-slate-600">
                <span><strong>Venue:</strong> {evt.venue}</span>
                <span>•</span>
                <span><strong>Participants:</strong> {evt.participants}</span>
              </div>
              <p className="text-emerald-900 bg-emerald-50/80 p-2 rounded-lg border border-emerald-200/60 font-medium">
                <strong>Outcome:</strong> {evt.outcome}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
