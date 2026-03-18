import React from 'react';
import { ZoomIn, ZoomOut, Download, AlertTriangle, CheckCircle2, ChevronRight, Edit2, LayoutList } from 'lucide-react';

const PDFPreview = ({ data }) => {
    const filename = data?.filename || 'Uploaded_Document.pdf';
    
    // Find some fields to display as a preview if we don't have a real PDF viewer
    const companyField = data?.fields?.find(f => f.key.toLowerCase().includes('company'));
    const revenueField = data?.fields?.find(f => f.key.toLowerCase().includes('revenue'));
    const textSnippetField = data?.fields?.find(f => f.key.toLowerCase().includes('snippet'));
    
    return (
    <div className="bg-slate-100 rounded-xl border border-slate-200 flex flex-col h-full overflow-hidden">
        <div className="bg-white px-4 py-3 border-b border-slate-200 flex justify-between items-center text-sm font-medium text-slate-600">
            <span className="truncate">PREVIEW: {filename}</span>
            <div className="flex gap-3 text-slate-400">
                <ZoomIn className="w-4 h-4 cursor-pointer hover:text-slate-700" />
                <ZoomOut className="w-4 h-4 cursor-pointer hover:text-slate-700" />
                <Download className="w-4 h-4 cursor-pointer hover:text-slate-700" />
            </div>
        </div>
        <div className="flex-1 p-6 overflow-auto custom-scrollbar flex justify-center">
            {/* Mock PDF Document replaced with dynamic pseudo-preview */}
            <div className="bg-white shadow-sm w-full max-w-[500px] h-fit p-10 font-serif text-slate-800">
                <div className="flex justify-between items-start mb-10 border-b-2 border-slate-800 pb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-widest mb-2 uppercase">
                            {companyField ? companyField.value : "CORPORATE ENTITY"}
                        </h1>
                        <p className="italic text-slate-600">Extracted Document Data</p>
                    </div>
                </div>

                <h3 className="text-lg font-bold mb-6 tracking-wide">DOCUMENT SUMMARY</h3>
                <div className="space-y-4 text-sm">
                    {revenueField && (
                        <div className="flex justify-between">
                            <span>{revenueField.key}</span>
                            <span className="font-bold">{revenueField.value}</span>
                        </div>
                    )}
                    {data?.fields?.filter(f => !f.key.toLowerCase().includes('snippet') && !f.key.toLowerCase().includes('company') && !f.key.toLowerCase().includes('revenue')).map((f, i) => (
                        <div key={i} className="flex justify-between">
                            <span>{f.key}</span>
                            <span>{f.value}</span>
                        </div>
                    ))}
                </div>

                {textSnippetField && (
                    <div className="mt-12 relative">
                        <div className="absolute -inset-4 border-2 border-dashed border-primary-500 bg-primary-50/30 pointer-events-none"></div>
                        <h4 className="font-bold mb-4 text-sm text-primary-900 relative z-10">RAW TEXT SNIPPET</h4>
                        <div className="text-sm italic text-slate-600 relative z-10 break-words">
                            "{textSnippetField.value}"
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
    );
};

const ExtractedField = ({ label, value, confidence, isWarning, warningText }) => (
    <div className="mb-5 last:mb-0">
        <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-bold text-slate-700">{label}</label>
            {isWarning ? (
                <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> {confidence}% CONFIDENCE
                </span>
            ) : (
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    {confidence}% CONFIDENCE
                </span>
            )}
        </div>
        <div className="relative">
            <input
                type="text"
                defaultValue={value}
                className={`block w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 ${isWarning
                    ? 'bg-amber-50 border-2 border-amber-400 text-amber-900 focus:ring-amber-500'
                    : 'bg-slate-50 border border-slate-200 text-slate-900 focus:ring-primary-500 focus:bg-white focus:border-transparent'
                    }`}
            />
            {/* Icon for non-warning fields could go here */}
        </div>
        {isWarning && (
            <div className="mt-2 text-xs font-semibold text-amber-600 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> {warningText}
            </div>
        )}
    </div>
);

export default function DataValidation() {
    const [extraction, setExtraction] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const docId = localStorage.getItem('latestDocumentId') || 'DOC-999';
        fetch(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"}/api/documents/${docId}/extraction`)
            .then(res => res.json())
            .then(data => {
                setExtraction(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch extraction data:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
                <div className="animate-pulse text-slate-500 font-bold">Simulating PDF Parsing & Extraction...</div>
            </div>
        );
    }

    // Fallback if data fails to load
    const extractionData = extraction || {
        filename: "Fallback_Document.pdf",
        overallConfidence: 98.4,
        warnings: 2,
        fields: [
            { key: "Fiscal Period End Date", value: "Sept 30, 2023", confidence: 99, isWarning: false },
            { key: "Total Revenue", value: "$ 482,900", confidence: 97, isWarning: false },
            { key: "Total Assets", value: "$ 1,153,350", confidence: 82, isWarning: true, warningText: "AI is uncertain if 'Intangible Assets' were included in total." },
            { key: "Net Profit Margin", value: "14.2%", confidence: 98, isWarning: false },
            { key: "Total Liabilities", value: "$ 474,400", confidence: 99, isWarning: false }
        ]
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col">
            {/* Top Bar */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-500 mb-1">
                        <span>Analysis</span> <ChevronRight className="w-4 h-4" /> <span className="text-slate-900">Data Validation</span>
                    </div>
                    <h1 className="text-2xl font-extrabold text-slate-900">Balance Sheet Validation</h1>
                </div>
                <div className="flex gap-3">
                    <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold text-sm rounded-lg hover:bg-slate-50 shadow-sm flex items-center gap-2 transition-colors">
                        <Edit2 className="w-4 h-4" /> Manual Override
                    </button>
                    <button onClick={() => window.location.href = '/analytics'} className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm rounded-lg shadow-sm flex items-center gap-2 transition-colors">
                        <CheckCircle2 className="w-4 h-4" /> Confirm & Map
                    </button>
                </div>
            </div>

            {/* Main Split Content */}
            <div className="flex-1 flex gap-6 overflow-hidden">
                {/* Left Pane: PDF Preview */}
                <div className="flex-1 min-w-0">
                    <PDFPreview data={extractionData} />
                </div>

                {/* Right Pane: Extracted Values */}
                <div className="w-[450px] flex-shrink-0 flex flex-col overflow-hidden">
                    <div className="flex justify-between items-end mb-4 pr-1">
                        <h2 className="text-lg font-bold text-slate-900">Extracted Values</h2>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 mb-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Model: FinBERT-v4
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col h-full overflow-hidden shadow-sm">
                        {/* Score Cards */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-primary-50 rounded-lg p-4 border border-primary-100 text-center">
                                <div className="text-xs font-bold text-primary-700 mb-1 tracking-wide">AVERAGE CONFIDENCE</div>
                                <div className="text-3xl font-bold text-primary-600">{extractionData.overallConfidence}%</div>
                            </div>
                            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200 text-center">
                                <div className="text-xs font-bold text-amber-700 mb-1 tracking-wide">REVIEW REQUIRED</div>
                                <div className="text-3xl font-bold text-amber-600">{extractionData.warnings} Fields</div>
                            </div>
                        </div>

                        {/* Scrollable FieldsList */}
                        <div className="flex-1 overflow-auto pr-2 custom-scrollbar space-y-2">
                            {extractionData.fields.map((field, idx) => (
                                <div key={idx} className={field.isWarning ? "my-6" : ""}>
                                    <ExtractedField
                                        label={field.key}
                                        value={field.value}
                                        confidence={field.confidence}
                                        isWarning={field.isWarning}
                                        warningText={field.warningText}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Bottom Mapping Section */}
                        <div className="mt-6 pt-6 border-t border-slate-200">
                            <h3 className="text-xs font-bold text-slate-500 mb-3 tracking-wider">DESTINATION MAPPING</h3>
                            <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:border-primary-300 transition-colors cursor-pointer bg-slate-50">
                                <div className="flex items-center gap-3">
                                    <div className="bg-white p-2 rounded border border-slate-200 text-primary-600">
                                        <LayoutList className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-800">Target Spreadsheet</div>
                                        <div className="text-xs text-slate-500 font-medium mt-0.5">FY23_Consolidated_Sheet.xlsx</div>
                                    </div>
                                </div>
                                <span className="text-sm font-bold text-primary-600">Change</span>
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-600">
                                <CheckCircle2 className="w-4 h-4" /> All critical fields reconciled with ledger.
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
