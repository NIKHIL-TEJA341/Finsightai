import React from 'react';
import { Download, CheckCircle2, AlertTriangle, TrendingUp, TrendingDown, Lightbulb, Zap, ChevronRight, Share2, FileText } from 'lucide-react';

const SWOTItem = ({ icon: Icon, title, items, colorClass, borderClass }) => (
    <div className={`p-8 bg-white border ${borderClass}`}>
        <div className={`flex items-center gap-2 text-sm font-extrabold uppercase tracking-widest mb-4 ${colorClass}`}>
            <Icon className="w-5 h-5" /> {title}
        </div>
        <ul className="space-y-3">
            {items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm font-medium text-slate-700">
                    <span className="text-slate-300 mt-1">•</span> {item}
                </li>
            ))}
        </ul>
    </div>
);

const DocumentPreview = ({ title, active }) => (
    <div className={`border rounded-lg p-3 bg-white ${active ? 'border-primary-500 shadow-sm' : 'border-slate-200'} cursor-pointer hover:border-primary-400 transition-colors`}>
        <div className="w-full h-40 bg-slate-50 border border-slate-100 rounded mb-3 p-3 flex flex-col gap-2">
            {/* Skeleton content for the page preview */}
            <div className="h-2 w-1/2 bg-slate-200 rounded"></div>
            <div className="h-1.5 w-full bg-slate-100 rounded"></div>
            <div className="h-1.5 w-full bg-slate-100 rounded"></div>
            <div className="h-1.5 w-3/4 bg-slate-100 rounded"></div>
            <div className="mt-auto h-8 flex gap-2">
                <div className={`flex-1 rounded ${active ? 'bg-primary-100' : 'bg-slate-200'}`}></div>
                <div className={`flex-1 rounded ${active ? 'bg-primary-100' : 'bg-slate-200'}`}></div>
            </div>
        </div>
        <div className="text-xs font-bold text-center text-slate-600">{title}</div>
    </div>
);

export default function CreditReport() {
    return (
        <div className="max-w-5xl mx-auto py-6">

            {/* Top Bar Navigation */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                    <span className="cursor-pointer hover:text-slate-800 transition-colors">Reports</span>
                    <ChevronRight className="w-4 h-4" />
                    <span className="cursor-pointer hover:text-slate-800 transition-colors">Credit Analysis</span>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-slate-900">Final Report</span>
                </div>
                <button className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm rounded-lg shadow-sm flex items-center gap-2 transition-colors border border-transparent">
                    <Download className="w-4 h-4" /> Download PDF Report
                </button>
            </div>

            {/* Report Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Credit Report: TechFlow Solutions Inc.</h1>
                <p className="text-sm font-medium text-slate-500">Report ID: CR-88294-B &bull; Generated on Oct 24, 2023 &bull; AI Confidence: 94%</p>
            </div>

            {/* Main Banner */}
            <div className="bg-primary-600 rounded-xl p-8 text-white flex justify-between items-center shadow-md mb-8">
                <div>
                    <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full tracking-widest uppercase mb-4 inline-block backdrop-blur-sm">
                        FINAL RECOMMENDATION
                    </span>
                    <h2 className="text-4xl font-extrabold mb-3">APPROVE (Moderate Risk)</h2>
                    <p className="text-lg text-primary-100 font-medium tracking-wide">
                        Proposed Facility: $2.5M Revolving Credit Line @ Prime + 1.25%
                    </p>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-xl text-center flex flex-col items-center justify-center shadow-sm">
                    <span className="text-5xl font-black mb-1">742</span>
                    <span className="text-xs font-extrabold text-primary-200 tracking-widest">FINSIGHT SCORE</span>
                </div>
            </div>

            {/* Strengths and Risks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="bg-white rounded-xl border border-emerald-200 p-6 flex items-start gap-4 shadow-sm">
                    <div className="bg-emerald-100 p-2 rounded-full mt-1 shrink-0">
                        <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-extrabold text-slate-900 mb-4">Key Strengths & Drivers</h3>
                        <ul className="space-y-4">
                            <li className="text-sm font-medium text-slate-600 leading-relaxed">
                                <strong className="text-slate-900 relative"><span className="absolute -left-3 top-2.5 w-1 h-1 bg-emerald-500 rounded-full"></span>Strong Revenue Growth:</strong> 24% YoY increase in ARR with high net retention rates (112%).
                            </li>
                            <li className="text-sm font-medium text-slate-600 leading-relaxed">
                                <strong className="text-slate-900 relative"><span className="absolute -left-3 top-2.5 w-1 h-1 bg-emerald-500 rounded-full"></span>Market Position:</strong> Top 3 provider in specialized industrial automation software.
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-amber-200 p-6 flex items-start gap-4 shadow-sm">
                    <div className="bg-amber-100 p-2 rounded-full mt-1 shrink-0">
                        <AlertTriangle className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-extrabold text-slate-900 mb-4">Risk Considerations</h3>
                        <ul className="space-y-4">
                            <li className="text-sm font-medium text-slate-600 leading-relaxed">
                                <strong className="text-slate-900 relative"><span className="absolute -left-3 top-2.5 w-1 h-1 bg-amber-500 rounded-full"></span>High Debt-to-Equity:</strong> Current ratio at 1.8x, slightly above industry peer average of 1.4x.
                            </li>
                            <li className="text-sm font-medium text-slate-600 leading-relaxed">
                                <strong className="text-slate-900 relative"><span className="absolute -left-3 top-2.5 w-1 h-1 bg-amber-500 rounded-full"></span>Concentration Risk:</strong> Top 3 clients represent 35% of total annual billings.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* SWOT Analysis */}
            <h3 className="text-xl font-extrabold text-slate-900 mb-6 border-b border-slate-200 pb-2">SWOT Analysis</h3>
            <div className="grid grid-cols-2 rounded-xl overflow-hidden shadow-sm mb-12 border border-slate-200">
                <SWOTItem
                    icon={TrendingUp}
                    title="STRENGTHS"
                    items={[
                        "Proprietary IP portfolio (12 active patents)",
                        "Experienced management team (avg 15 yrs)",
                        "Robust cash reserves ($1.2M liquid)",
                    ]}
                    colorClass="text-emerald-700"
                    borderClass="border-r border-b border-slate-200 bg-emerald-50/10 hover:bg-emerald-50/20 transition-colors"
                />
                <SWOTItem
                    icon={TrendingDown}
                    title="WEAKNESSES"
                    items={[
                        "High operational burn in Q3 expansion",
                        "Limited international market presence",
                        "Dependency on specific chip suppliers",
                    ]}
                    colorClass="text-red-700"
                    borderClass="border-b border-slate-200 bg-red-50/10 hover:bg-red-50/20 transition-colors"
                />
                <SWOTItem
                    icon={Lightbulb}
                    title="OPPORTUNITIES"
                    items={[
                        "Emerging APAC market demand",
                        "Potential for AI-driven service upsell",
                        "Strategic M&A targets identified",
                    ]}
                    colorClass="text-primary-700"
                    borderClass="border-r border-slate-200 bg-primary-50/10 hover:bg-primary-50/20 transition-colors"
                />
                <SWOTItem
                    icon={Zap}
                    title="THREATS"
                    items={[
                        "New aggressive entrant in EU market",
                        "Regulatory changes in data privacy",
                        "Volatile interest rate environment",
                    ]}
                    colorClass="text-slate-800"
                    borderClass="bg-slate-50/30 hover:bg-slate-50/50 transition-colors"
                />
            </div>

            {/* Document Structure Preview */}
            <div className="flex justify-between items-end mb-6 border-b border-slate-200 pb-2">
                <h3 className="text-xl font-extrabold text-slate-900">Document Structure Preview</h3>
                <button className="text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors">View All Pages</button>
            </div>
            <div className="grid grid-cols-4 gap-4 mb-16">
                <DocumentPreview title="Executive Summary" active={true} />
                <DocumentPreview title="Financial Ratios" active={false} />
                <DocumentPreview title="Risk Assessment" active={false} />
                <DocumentPreview title="Signatures & Terms" active={false} />
            </div>

            {/* Footer Area */}
            <div className="flex justify-between items-center pt-8 border-t border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="bg-slate-900 p-2 rounded border border-slate-700 text-white">
                        <FileText className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="text-sm font-extrabold text-slate-900">Verified by FinSight AI Engine v4.2</div>
                        <div className="text-xs font-medium text-slate-500">Security Standard: SOC2 Type II &bull; ISO 27001</div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button className="px-6 py-3 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-sm rounded-lg shadow-sm transition-colors flex items-center gap-2">
                        <Share2 className="w-4 h-4" /> Share Report
                    </button>
                    <button className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm rounded-lg shadow-md transition-colors border border-transparent">
                        Finalize & Send Offer
                    </button>
                </div>
            </div>
            <div className="h-10"></div>{/* Bottom padding safe area */}

        </div>
    );
}
