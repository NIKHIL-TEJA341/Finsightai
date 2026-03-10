import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ArrowUpRight, ArrowDownRight, MoreVertical } from 'lucide-react';
import { dashboardStats, riskSummary, recentOnboardings, sectorDistribution } from '../data/mockData';

const StatCard = ({ title, value, trend, isPositive }) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200">
        <h3 className="text-sm font-medium text-slate-500 mb-2">{title}</h3>
        <div className="flex items-end gap-3">
            <span className="text-3xl font-bold text-slate-900">{value}</span>
            <div className={`flex items-center text-sm font-medium mb-1 ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                {isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                {trend}
            </div>
        </div>
    </div>
);

const RiskProgressBar = ({ label, value, max, colorClass, numberColorClass }) => (
    <div className="mb-4 last:mb-0">
        <div className="flex justify-between text-sm mb-1.5">
            <span className="font-medium text-slate-700">{label}</span>
            <span className={`font-bold ${numberColorClass}`}>{value}</span>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${(value / max) * 100}%` }}></div>
        </div>
    </div>
);

export default function Dashboard() {
    const maxRiskValue = Math.max(riskSummary.critical, riskSummary.medium, riskSummary.safe) + 10; // For padding out the bar

    return (
        <div className="max-w-7xl mx-auto space-y-6">

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Pending Reviews" value={dashboardStats.totalPendingReviews.value} trend={dashboardStats.totalPendingReviews.trend} isPositive={dashboardStats.totalPendingReviews.isPositive !== false} />
                <StatCard title="Average Risk Score" value={dashboardStats.averageRiskScore.value} trend={dashboardStats.averageRiskScore.trend} isPositive={dashboardStats.averageRiskScore.isPositive !== false} />
                <StatCard title="Documents Processed Today" value={dashboardStats.documentsProcessedToday.value} trend={dashboardStats.documentsProcessedToday.trend} isPositive={dashboardStats.documentsProcessedToday.isPositive !== false} />
            </div>

            {/* Middle Row: Charts & Risk */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">Financial Sector Distribution</h2>
                            <p className="text-sm text-slate-500">Portfolio analysis by primary sector ($4.2B Total)</p>
                        </div>
                        <button className="px-3 py-1.5 text-xs font-semibold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50">
                            Last 30 Days
                        </button>
                    </div>
                    <div className="flex-1 min-h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={sectorDistribution} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }} dy={10} />
                                <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={60}>
                                    {sectorDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill="#1d4ed8" />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col">
                    <h2 className="text-lg font-bold text-slate-900 mb-6">Risk Summary</h2>
                    <div className="flex-1 flex flex-col justify-center">
                        <RiskProgressBar label="Critical Alerts" value={riskSummary.critical} max={maxRiskValue} colorClass="bg-red-500" numberColorClass="text-red-500" />
                        <RiskProgressBar label="Medium Risk" value={riskSummary.medium} max={maxRiskValue} colorClass="bg-amber-500" numberColorClass="text-amber-500" />
                        <RiskProgressBar label="Safe/Verified" value={riskSummary.safe} max={maxRiskValue} colorClass="bg-emerald-500" numberColorClass="text-emerald-500" />
                    </div>
                    <button className="mt-8 text-sm font-semibold text-primary-600 hover:text-primary-700 w-full text-center">
                        View detailed risk report &rarr;
                    </button>
                </div>
            </div>

            {/* Recent Onboardings Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-slate-900">Recent Entity Onboardings</h2>
                    <button className="text-sm font-semibold text-primary-600 hover:text-primary-700">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-medium">Entity Name</th>
                                <th className="px-6 py-4 font-medium">Sector</th>
                                <th className="px-6 py-4 font-medium">Risk Score</th>
                                <th className="px-6 py-4 font-medium">Onboarding Date</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 text-slate-700">
                            {recentOnboardings.map((entity) => (
                                <tr key={entity.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-900">{entity.name}</div>
                                        <div className="text-xs text-slate-500 mt-0.5">ID: {entity.id}</div>
                                    </td>
                                    <td className="px-6 py-4">{entity.sector}</td>
                                    <td className="px-6 py-4">
                                        {entity.riskLevel === 'Low' && <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-emerald-100 text-emerald-700">{entity.riskScore} (Low)</span>}
                                        {entity.riskLevel === 'Med' && <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-amber-100 text-amber-700">{entity.riskScore} (Med)</span>}
                                        {entity.riskLevel === 'N/A' && <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-600">N/A</span>}
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">{entity.date}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${entity.status === 'Analysis' ? 'bg-primary-500' : entity.status === 'Ingestion' ? 'bg-slate-400' : entity.status === 'Complete' ? 'bg-emerald-500' : 'bg-indigo-300'}`}></span>
                                            <span className="font-medium text-slate-700">{entity.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-400 hover:text-slate-600">
                                            <MoreVertical className="w-5 h-5 mx-auto" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
