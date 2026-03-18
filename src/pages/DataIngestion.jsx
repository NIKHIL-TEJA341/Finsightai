import React from 'react';
import { UploadCloud, FileText, FileSpreadsheet, CheckCircle2, Circle, Sparkles, ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';



const RequiredDocuments = () => (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-6">
            <FileText className="w-5 h-5 text-primary-600" />
            <h3 className="text-lg font-bold text-slate-900">Required Documents</h3>
        </div>
        <div className="space-y-3">
            {/* Doc 1 */}
            <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                    <div className="text-sm font-bold text-emerald-900">ALM Report</div>
                    <div className="text-xs font-medium text-emerald-700 mt-0.5">Uploaded on Oct 24, 2023</div>
                </div>
            </div>
            {/* Doc 2 */}
            <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                    <div className="text-sm font-bold text-emerald-900">Shareholding Pattern</div>
                    <div className="text-xs font-medium text-emerald-700 mt-0.5">Uploaded on Oct 22, 2023</div>
                </div>
            </div>
            {/* Doc 3 */}
            <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                <div className="flex items-start gap-3">
                    <Circle className="w-5 h-5 text-slate-300 mt-0.5 shrink-0" />
                    <div>
                        <div className="text-sm font-bold text-slate-700">Borrowing Schedule</div>
                        <div className="text-xs font-medium text-slate-500 mt-0.5">Awaiting upload...</div>
                    </div>
                </div>
                <button className="text-xs font-bold text-primary-600 uppercase tracking-wider">Upload</button>
            </div>
            {/* Doc 4 */}
            <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                <div className="flex items-start gap-3">
                    <Circle className="w-5 h-5 text-slate-300 mt-0.5 shrink-0" />
                    <div>
                        <div className="text-sm font-bold text-slate-700">Annual Reports (3yrs)</div>
                        <div className="text-xs font-medium text-slate-500 mt-0.5">Awaiting upload...</div>
                    </div>
                </div>
                <button className="text-xs font-bold text-primary-600 uppercase tracking-wider">Upload</button>
            </div>
        </div>
    </div>
);

const AIInfoBox = () => (
    <div className="bg-primary-600 rounded-xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary-500 rounded-full opacity-50 blur-2xl"></div>
        <div className="relative z-10">
            <Sparkles className="w-6 h-6 text-primary-200 mb-4" />
            <h3 className="text-lg font-bold mb-2">AI Extraction</h3>
            <p className="text-primary-100 text-sm font-medium leading-relaxed mb-6">
                Our AI will automatically extract balance sheet items, cash flows, and key performance indicators from your uploaded files.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span> ACTIVE LEARNING ENABLED
            </div>
        </div>
    </div>
);

export default function DataIngestion() {
    const [uploads, setUploads] = React.useState([
        { id: 1, filename: "Q4_Revenue_Statement.pdf", size: "4.2 MB", status: "Uploading", progress: 65, type: 'pdf' },
        { id: 2, filename: "Vendor_Master_Data_2023.xlsx", size: "12.8 MB", status: "Processing", progress: 100, type: 'excel' }
    ]);
    const fileInputRef = React.useRef(null);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Add to UI as uploading
        const newUploadId = Date.now();
        const newUpload = {
            id: newUploadId,
            filename: file.name,
            size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
            status: "Uploading",
            progress: 10,
            // be case‑insensitive when categorising the file type
            type: file.name.toLowerCase().endsWith('.pdf') ? 'pdf' : 'excel'
        };

        setUploads(prev => [newUpload, ...prev]);

        // Upload to backend
        const formData = new FormData();
        formData.append("file", file);

        try {
            // Simulate progress bump
            setUploads(prev => prev.map(u => u.id === newUploadId ? { ...u, progress: 40 } : u));

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"}/api/upload`, {
                method: "POST",
                body: formData
            });
            const data = await response.json();

            if (response.ok) {
                setUploads(prev => prev.map(u => u.id === newUploadId ? { ...u, progress: 100, status: data.status } : u));
                // Optional: Store documentId somewhere globally if needed for the validation page
                localStorage.setItem('latestDocumentId', data.documentId);
            } else {
                setUploads(prev => prev.map(u => u.id === newUploadId ? { ...u, status: "Failed", progress: 0 } : u));
                alert(data.detail || "Upload failed");
            }
        } catch (error) {
            console.error("Upload error:", error);
            setUploads(prev => prev.map(u => u.id === newUploadId ? { ...u, status: "Error", progress: 0 } : u));
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="max-w-6xl mx-auto py-6">
            <div className="mb-8">
                <h1 className="text-2xl font-extrabold text-slate-900 mb-1">Data Hub</h1>
                <p className="text-slate-500 font-medium">Upload and organize your financial source files for AI-powered processing.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                    <div onClick={triggerFileInput} className="border-2 border-dashed border-slate-300 rounded-xl p-12 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer">
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx,.xls,.xlsx" />
                        <div className="bg-primary-100 p-4 rounded-full mb-4">
                            <UploadCloud className="w-8 h-8 text-primary-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Drag and drop files here</h3>
                        <p className="text-sm font-medium text-slate-500 mb-6">PDF, Excel (XLSX, CSV), and Images (Max 50MB)</p>
                        <button className="bg-primary-600 hover:bg-primary-700 text-white py-2.5 px-6 rounded-lg text-sm font-bold shadow-sm flex items-center gap-2 transition-colors pointer-events-none">
                            <span className="text-lg leading-none">+</span> Browse Files
                        </button>
                    </div>

                    <div className="mt-8 border border-slate-200 rounded-xl bg-white overflow-hidden shadow-sm">
                        <div className="flex justify-between items-center p-4 border-b border-slate-200 bg-slate-50">
                            <h3 className="text-sm font-bold text-slate-900">Current Uploads</h3>
                            <span className="text-xs font-bold text-slate-500 bg-slate-200 px-2 py-1 rounded-md">{uploads.length} Active</span>
                        </div>
                        <div className="divide-y divide-slate-100 max-h-[300px] overflow-y-auto">
                            {uploads.map((upload) => (
                                <div key={upload.id} className="p-4 flex items-center gap-4">
                                    {upload.type === 'pdf' ? <FileText className="w-8 h-8 text-emerald-500 flex-shrink-0" /> : <FileSpreadsheet className="w-8 h-8 text-emerald-500 flex-shrink-0" />}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-bold text-slate-900 truncate">{upload.filename}</span>
                                            <div className="flex items-center gap-4">
                                                <span className="text-xs font-medium text-slate-500">{upload.size}</span>
                                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full inline-flex items-center ${upload.status === 'PROCESSING' || upload.status === 'Processing' || upload.status === 'Complete' ? 'text-emerald-700 bg-emerald-50' : upload.status === 'Uploading' ? 'text-primary-700 bg-primary-50' : upload.status === 'Failed' || upload.status === 'Error' ? 'text-red-700 bg-red-50' : 'text-slate-700 bg-slate-50'}`}>
                                                    {upload.status === 'PROCESSING' || upload.status === 'Processing' ? 'Complete' : upload.status}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden">
                                                <div className={`h-full rounded-full ${upload.status === 'Failed' || upload.status === 'Error' ? 'bg-red-500' : 'bg-primary-600'}`} style={{ width: `${upload.progress}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Action Bar that appears if there are completed uploads */}
                        {uploads.some(u => u.status === 'PROCESSING' || u.status === 'Processing' || u.status === 'Complete') && (
                            <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end">
                                <NavLink to="/validation" className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm rounded-lg shadow-sm flex items-center gap-2 transition-colors">
                                    Proceed to Validation <ArrowRight className="w-4 h-4" />
                                </NavLink>
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full lg:w-[360px]">
                    <RequiredDocuments />
                    <AIInfoBox />
                </div>
            </div>
        </div>
    );
}
