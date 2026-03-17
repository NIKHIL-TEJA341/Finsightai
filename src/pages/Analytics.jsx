import React from 'react';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ShieldAlert, TrendingUp, Building, ArrowUpRight, ArrowDownRight, Download, MoreHorizontal } from 'lucide-react';

const defaultRevenueData = [
    { name: 'JAN', value: 3200 },
    { name: 'FEB', value: 2800 },
    { name: 'MAR', value: 3600 },
    { name: 'APR', value: 3200 },
    { name: 'MAY', value: 4800 },
    { name: 'JUN', value: 5400 },
];

const defaultRiskData = [
    { name: 'Risk', value: 72 },
    { name: 'Safe', value: 28 },
];

const defaultDebtData = [
    { name: 'Debt', value: 42 },
    { name: 'Equity', value: 58 },
];

const MetricCard = ({ title, value, subtext, trend, isPositive, icon: Icon, colorClass }) => (
    <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-2.5 rounded-lg ${colorClass}`}>
                <Icon className="w-5 h-5 text-current" />
            </div>
            <div className={`flex items-center text-sm font-bold ${isPositive ? 'text-emerald-600' : 'text-slate-500'}`}>
                {isPositive && <ArrowUpRight className="w-4 h-4 mr-0.5" />}
                {!isPositive && trend && trend.includes('-') && <ArrowDownRight className="w-4 h-4 mr-0.5 text-red-500" />}
                <span className={!isPositive && trend && trend.includes('-') ? 'text-red-500' : ''}>{trend || 'Stable'}</span>
            </div>
        </div>
        <div>
            <h3 className="text-sm font-bold text-slate-500 mb-1">{title}</h3>
            <div className="text-2xl font-extrabold text-slate-900 mb-1">{value}</div>
            <div className="text-xs font-medium text-slate-400">{subtext}</div>
        </div>
    </div>
);

export default function Analytics() {
    const [analytics, setAnalytics] = React.useState({
        overallRiskScore: 0,
        revenueData: [],
        riskData: [],
        debtData: [],
        detailedProfile: []
    });
    const [loading, setLoading] = React.useState(true);

    const [extraction, setExtraction] = React.useState(null);

    React.useEffect(() => {
        const docId = localStorage.getItem('latestDocumentId');
        
        Promise.all([
            fetch('http://localhost:8000/api/analytics/ENT-1234').then(res => res.json()).catch(err => { console.error(err); return null; }),
            docId ? fetch(`http://localhost:8000/api/documents/${docId}/extraction`).then(res => res.json()).catch(err => { console.error(err); return null; }) : Promise.resolve(null)
        ]).then(([analyticsData, extractionData]) => {
            if (analyticsData) setAnalytics(analyticsData);
            if (extractionData) setExtraction(extractionData);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto py-6 flex items-center justify-center min-h-[500px]">
                <div className="animate-pulse text-slate-500 font-bold">Aggregating Risk Analytics...</div>
            </div>
        );
    }

    const { overallRiskScore, revenueData, riskData, debtData, detailedProfile } = analytics;
    
    // Attempt to parse document data if available
    const getExtractedField = (keyword, fallback) => {
        if (!extraction || !extraction.fields) return fallback;
        const field = extraction.fields.find(f => f.key.toLowerCase().includes(keyword.toLowerCase()));
        return field ? field.value : fallback;
    };

    const dynamicRevenue = getExtractedField('revenue', '$4,281,400');
    const dynamicMargin = getExtractedField('margin', '24.8%');
    const dynamicDebt = getExtractedField('debt', '$1.12M');

    return (
        <div className="max-w-7xl mx-auto py-6">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 mb-1">Executive Overview</h1>
                    <p className="text-slate-500 font-medium">Real-time financial risk and performance analytics for Q3 2024</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 font-bold text-sm rounded-lg transition-colors">1D</button>
                    <button className="px-3 py-1.5 border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 font-bold text-sm rounded-lg transition-colors">1W</button>
                    <button className="px-3 py-1.5 border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 font-bold text-sm rounded-lg transition-colors">1M</button>
                    <button className="px-3 py-1.5 border border-slate-200 text-slate-700 font-bold text-sm rounded-lg bg-slate-100 transition-colors">6M</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
                {/* Overall Risk Score */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-center items-center shadow-sm relative overflow-hidden">
                    <ShieldAlert className="absolute top-4 right-4 w-12 h-12 text-slate-50 opacity-50" />
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-6 w-full text-left">OVERALL RISK SCORE</h3>
                    <div className="relative flex items-center justify-center" style={{ width: '160px', height: '160px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={riskData} cx="50%" cy="50%" innerRadius={60} outerRadius={75} startAngle={225} endAngle={-45} dataKey="value" stroke="none">
                                    <Cell fill="#1d4ed8" />
                                    <Cell fill="#f1f5f9" />
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute flex flex-col items-center">
                            <span className="text-4xl font-extrabold text-slate-900">{overallRiskScore}%</span>
                            <span className="text-xs font-bold text-emerald-600 flex items-center mt-1"><ArrowUpRight className="w-3 h-3" /> 2.4%</span>
                        </div>
                    </div>
                    <p className="text-sm text-slate-600 font-medium mt-6 text-center leading-relaxed">
                        Risk exposure is currently <strong className="text-slate-900">MODERATE</strong>. Recent liquidity improvements decreased global risk.
                    </p>
                </div>

                {/* 3 Metrics Cards */}
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MetricCard
                        title="Gross Revenue"
                        value={dynamicRevenue}
                        subtext=" "
                        trend="+12.5%"
                        isPositive={true}
                        colorClass="bg-primary-50 text-primary-600"
                        icon={TrendingUp}
                    />
                    <MetricCard
                        title="Operating Margin"
                        value={dynamicMargin}
                        subtext={
                            <div className="flex justify-between w-full mt-4 text-slate-500">
                                <span>Target: 28%</span>
                                <span>Current: {dynamicMargin}</span>
                            </div>
                        }
                        trend="-3.1%"
                        isPositive={false}
                        colorClass="bg-amber-50 text-amber-600"
                        icon={TrendingUp} // Placeholder for scale icon
                    />
                    <MetricCard
                        title="Net Debt"
                        value={dynamicDebt}
                        subtext="D/E Ratio: 0.42"
                        trend={null}
                        isPositive={false}
                        colorClass="bg-indigo-50 text-indigo-600"
                        icon={Building}
                    />
                    <MetricCard
                        title="Cash Flow"
                        value="$842.0k"
                        subtext="Free cash flow per share: $1.24"
                        trend="+8%"
                        isPositive={true}
                        colorClass="bg-emerald-50 text-emerald-600"
                        icon={TrendingUp} // Calendar icon placeholder
                    />
                </div>
            </div>

            {/* Middle Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 flex flex-col shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Revenue Trend</h2>
                        <MoreHorizontal className="w-5 h-5 text-slate-400 cursor-pointer" />
                    </div>
                    <div style={{ width: '100%', height: '200px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={revenueData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }} dy={10} />
                                <Tooltip />
                                <Line type="monotone" dataKey="value" stroke="#1d4ed8" strokeWidth={3} dot={{ r: 4, fill: '#1d4ed8', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col items-center justify-between shadow-sm">
                    <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider w-full text-center mb-2">DEBT-TO-EQUITY</h2>
                    <div className="relative flex items-center justify-center" style={{ width: '160px', height: '128px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={debtData} cx="50%" cy="100%" innerRadius={60} outerRadius={75} startAngle={180} endAngle={0} dataKey="value" stroke="none">
                                    <Cell fill="#1d4ed8" />
                                    <Cell fill="#f1f5f9" />
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute bottom-2 flex flex-col items-center">
                            <span className="text-4xl font-extrabold text-slate-900">0.42</span>
                            <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">HEALTHY</span>
                        </div>
                    </div>
                    <div className="flex justify-between w-full mt-6 bg-slate-50 rounded-lg p-3 border border-slate-100">
                        <div className="text-center">
                            <div className="text-xs font-bold text-slate-400 mb-1">Debt</div>
                            <div className="text-sm font-bold text-slate-700">$1.1M</div>
                        </div>
                        <div className="w-px bg-slate-200"></div>
                        <div className="text-center">
                            <div className="text-xs font-bold text-slate-400 mb-1">Equity</div>
                            <div className="text-sm font-bold text-slate-700">$2.6M</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col shadow-sm">
                    <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">LIQUIDITY RATIO</h2>
                    <div className="flex-1 flex flex-col justify-end min-h-[140px] px-2">
                        <div className="flex justify-between items-end h-32 mb-6">
                            <div className="w-8 bg-slate-100 rounded-t flex items-end"><div className="w-full bg-slate-200 rounded-t h-[30%]"></div></div>
                            <div className="w-8 bg-slate-100 rounded-t flex items-end"><div className="w-full bg-slate-200 rounded-t h-[40%]"></div></div>
                            <div className="w-8 bg-slate-100 rounded-t flex items-end"><div className="w-full bg-slate-200 rounded-t h-[60%]"></div></div>
                            <div className="w-8 bg-slate-100 rounded-t flex items-end"><div className="w-full bg-primary-500 rounded-t h-[50%]"></div></div>
                        </div>
                        <div className="flex justify-between text-[10px] font-bold text-slate-400 px-1 mb-6">
                            <span>Q1</span><span>Q2</span><span>Q3</span><span>Q4</span>
                        </div>
                        <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                                <span className="w-2 h-2 rounded-full bg-primary-600"></span> Ratio: 1.8
                            </div>
                            <span className="text-xs font-bold text-red-500">-5% YoY</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Risk Profile Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-slate-900">Detailed Risk Profile</h2>
                    <button className="text-sm font-bold text-slate-500 hover:text-slate-700 bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 transition-colors">View History</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-bold border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">Risk Factor</th>
                                <th className="px-6 py-4">Impact Score</th>
                                <th className="px-6 py-4">Probability</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Assigned To</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                            {detailedProfile.map((profile, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/50">
                                    <td className="px-6 py-5 text-slate-900 font-bold">{profile.factor}</td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div className={`h-full w-[${profile.score * 10}%] ${profile.score > 7 ? 'bg-red-500' : profile.score > 4 ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                                            </div>
                                            <span className="text-xs text-slate-500">{profile.score}/10</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">{profile.probability}</td>
                                    <td className="px-6 py-5">
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded ${profile.status === 'Critical' ? 'text-red-700 bg-red-50' : profile.status === 'Watch' ? 'text-amber-700 bg-amber-50' : 'text-emerald-700 bg-emerald-50'}`}>
                                            {profile.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-slate-500">System</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
