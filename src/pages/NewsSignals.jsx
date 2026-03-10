import React from 'react';
import { Bookmark, TrendingUp, AlertTriangle, ShieldAlert, Sparkles } from 'lucide-react';

const NewsCard = ({ sentiment, source, time, title, description, tags }) => {
    const sentimentColors = {
        POSITIVE: 'bg-emerald-100 text-emerald-700',
        NEUTRAL: 'bg-amber-100 text-amber-700',
        NEGATIVE: 'bg-red-100 text-red-700',
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-4 last:mb-0 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded tracking-wider uppercase ${sentimentColors[sentiment]}`}>
                        {sentiment}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">{source} &bull; {time}</span>
                </div>
                <button className="text-slate-400 hover:text-slate-600">
                    <Bookmark className="w-5 h-5" />
                </button>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">{title}</h3>
            <p className="text-sm font-medium text-slate-600 mb-5 leading-relaxed">{description}</p>

            <div className="flex justify-between items-center pt-5 border-t border-slate-100 mt-2">
                <div className="flex gap-2">
                    {tags.map(tag => (
                        <span key={tag} className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{tag}</span>
                    ))}
                </div>
                <button className="text-sm font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors">
                    View Full Analysis &rarr;
                </button>
            </div>
        </div>
    );
};

const MarketTrendItem = ({ name, value, change, isPositive }) => (
    <div className="flex justify-between items-center py-4 border-b border-slate-100 last:border-0 last:pb-0">
        <span className="text-sm font-bold text-slate-700">{name}</span>
        <div className="text-right">
            <div className={`text-sm font-bold ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
                {change}
            </div>
            <div className="text-xs font-medium text-slate-400">{value}</div>
        </div>
    </div>
);

const RegulatoryFlag = ({ title, description, level, icon: Icon }) => (
    <div className={`p-4 rounded-xl border mb-4 last:mb-0 ${level === 'HIGH' ? 'bg-red-50 border-red-100' : 'bg-amber-50 border-amber-100'}`}>
        <div className="flex items-start gap-3">
            <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${level === 'HIGH' ? 'text-red-500' : 'text-amber-500'}`} />
            <div>
                <h4 className={`text-sm font-bold mb-1 ${level === 'HIGH' ? 'text-red-900' : 'text-amber-900'}`}>{title}</h4>
                <p className={`text-xs font-medium mb-3 leading-relaxed ${level === 'HIGH' ? 'text-red-700' : 'text-amber-700'}`}>{description}</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase ${level === 'HIGH' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                    {level === 'HIGH' ? 'HIGH RISK' : 'MEDIUM RISK'}
                </span>
            </div>
        </div>
    </div>
);

export default function NewsSignals() {
    const [signals, setSignals] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetch('http://localhost:8000/api/signals')
            .then(res => res.json())
            .then(data => {
                setSignals(data.signals);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch news signals:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="max-w-7xl mx-auto py-6">

            {/* Top Header */}
            <div className="flex justify-between items-end mb-6">
                <div className="flex items-center gap-3">
                    <div className="bg-primary-100 p-2 rounded-lg text-primary-600">
                        <Bookmark className="w-6 h-6" /> {/* Could use a signals icon here if we had one exactly matching */}
                    </div>
                    <h1 className="text-2xl font-extrabold text-slate-900">News Signals</h1>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                    <button className="px-4 py-1.5 bg-white shadow-sm text-sm font-bold text-slate-900 rounded-md">Latest</button>
                    <button className="px-4 py-1.5 text-sm font-bold text-slate-500 hover:text-slate-700 rounded-md">High Impact</button>
                </div>
            </div>

            {/* Main Grid Setup */}
            <div className="flex flex-col lg:flex-row gap-6">

                {/* Left: News Feed */}
                <div className="flex-1">
                    {/* Tabs */}
                    <div className="flex gap-2 overflow-x-auto pb-2 mb-6 hide-scrollbar">
                        <button className="px-4 py-2 bg-primary-600 text-white rounded-full text-sm font-bold shadow-md shadow-primary-500/20 shrink-0">All Signals</button>
                        <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-full text-sm font-bold shrink-0 transition-colors">Technology</button>
                        <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-full text-sm font-bold shrink-0 transition-colors">Healthcare</button>
                        <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-full text-sm font-bold shrink-0 transition-colors">Financial Services</button>
                        <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-full text-sm font-bold shrink-0 transition-colors">ESG Signals</button>
                    </div>

                    <div className="space-y-4">
                        {loading ? (
                            <div className="text-center py-10 text-slate-500 font-medium animate-pulse">
                                Fetching real-time market signals...
                            </div>
                        ) : signals.length > 0 ? (
                            signals.map((signal, index) => (
                                <NewsCard
                                    key={index}
                                    sentiment={signal.sentiment}
                                    source={signal.source}
                                    time={signal.time}
                                    title={signal.title}
                                    description={signal.description}
                                    tags={signal.tags}
                                />
                            ))
                        ) : (
                            <div className="text-center py-10 text-slate-500 font-medium">
                                No relevant signals found at this time.
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Sidebars */}
                <div className="w-full lg:w-[350px] shrink-0 space-y-6">

                    {/* Market Trends */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-primary-600" /> Market Trends
                        </h3>
                        <div className="mb-8">
                            <MarketTrendItem name="S&P 500" value="5,432.10" change="+1.24%" isPositive={true} />
                            <MarketTrendItem name="Nasdaq 100" value="18,675.40" change="+2.15%" isPositive={true} />
                            <MarketTrendItem name="Volatility Index" value="13.45" change="-4.30%" isPositive={false} />
                        </div>

                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">TOP PERFORMING SECTORS</h4>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm font-bold text-slate-700 mb-1">
                                    <span>AI & Software</span>
                                    <span>84%</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary-600 rounded-full" style={{ width: '84%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm font-bold text-slate-700 mb-1">
                                    <span>BioTech</span>
                                    <span>62%</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary-600 rounded-full" style={{ width: '62%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Regulatory Flags */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2 text-red-600">
                            <AlertTriangle className="w-5 h-5" /> Regulatory Flags
                        </h3>
                        <RegulatoryFlag
                            title="New SEC ESG Mandate"
                            description="Proposed ruling on greenhouse gas disclosures could impact Portfolio A energy assets by Q1."
                            level="HIGH"
                            icon={TrendingUp} // Placeholder for trend down icon or building icon
                        />
                        <RegulatoryFlag
                            title="EU Data Privacy V2"
                            description="Stricter guidelines for AI training data sets moving through parliament. Review tech holding compliance."
                            level="MEDIUM"
                            icon={ShieldAlert}
                        />
                        <button className="w-full mt-4 py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-bold rounded-lg border border-slate-200 transition-colors">
                            View All Flags
                        </button>
                    </div>

                    {/* AI Insights Widget */}
                    <div className="bg-primary-600 rounded-xl p-6 text-white shadow-md relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500 rounded-bl-[100px] opacity-20 pointer-events-none"></div>
                        <h3 className="text-lg font-bold mb-3 flex items-center gap-2 relative z-10">
                            <Sparkles className="w-5 h-5 text-primary-200" /> AI-Powered Insights
                        </h3>
                        <p className="text-sm font-medium text-primary-100 leading-relaxed mb-6 relative z-10">
                            Sentiment for the Technology sector has shifted from Neutral to Strongly Bullish in the last 48 hours.
                        </p>
                        <button className="w-full bg-white text-primary-600 hover:bg-slate-50 py-3 rounded-lg text-sm font-bold transition-colors shadow-sm relative z-10">
                            Generate Custom Report
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
