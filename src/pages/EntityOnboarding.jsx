import React, { useState } from 'react';
import { Building2, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

const StepIndicator = ({ currentStep }) => (
    <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-bold text-slate-900">
                STEP {currentStep} OF 3
            </div>
            <div className="text-sm font-medium text-slate-500">
                {currentStep === 1 ? '33%' : currentStep === 2 ? '66%' : '100%'} Complete
            </div>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
            <div className={`h-full bg-primary-600 transition-all ${currentStep === 1 ? 'w-1/3' : currentStep === 2 ? 'w-2/3' : 'w-full'}`}></div>
        </div>
        {/* Optional: Step labels, but keeping it clean like the top indicator in the second image */}
        {currentStep === 1 && (
            <div className="flex gap-4 mt-6 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <CheckCircle2 className="w-4 h-4 text-primary-600" />
                    Company Details
                    <div className="h-1 w-24 bg-primary-600 rounded-full mt-1 absolute -bottom-[17px]"></div>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
                    <div className="w-3 h-3 rounded-full border-2 border-slate-300"></div>
                    Financial Context
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
                    <div className="w-3 h-3 rounded-full border-2 border-slate-300"></div>
                    Loan Request
                </div>
            </div>
        )}
    </div>
);

const Step1 = ({ nextStep, formData, updateFormData }) => (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-primary-500 to-primary-400 p-8 text-white flex items-start gap-4">
            <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                <Building2 className="w-8 h-8" />
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-1">Company Identification</h2>
                <p className="text-primary-100 font-medium">Legal entity verification and categorization</p>
            </div>
        </div>
        <div className="p-8 space-y-6">
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Legal Company Name</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building2 className="h-5 w-5 text-slate-400" />
                    </div>
                    <input type="text" value={formData.companyName} onChange={(e) => updateFormData({ companyName: e.target.value })} className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors shadow-sm" placeholder="Enter full legal name as per registration" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">CIN (Corporate Identity Number)</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <ShieldCheck className="h-5 w-5 text-slate-400" />
                        </div>
                        <input type="text" className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-lg text-slate-900 bg-slate-50 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500" defaultValue="U12345DL2023PTC123456" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">PAN Number</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <ShieldCheck className="h-5 w-5 text-slate-400" />
                        </div>
                        <input type="text" value={formData.taxId} onChange={(e) => updateFormData({ taxId: e.target.value })} className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-lg text-slate-900 bg-slate-50 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="ABCDE1234F" />
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Industry Sector</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building2 className="h-5 w-5 text-slate-400" />
                    </div>
                    <select value={formData.industry} onChange={(e) => updateFormData({ industry: e.target.value })} className="block w-full pl-10 pr-10 py-3 border border-slate-200 rounded-lg text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none bg-white">
                        <option value="">Select industry sector</option>
                        <option value="Technology">Technology</option>
                        <option value="Financial Services">Financial Services</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Renewables">Renewables</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <button className="text-sm font-bold text-slate-500 hover:text-slate-700">Cancel</button>
                <div className="flex items-center gap-4">
                    <span className="text-xs italic text-slate-400 font-medium">Saved as draft just now</span>
                    <button onClick={nextStep} disabled={!formData.companyName} className="disabled:opacity-50 disabled:cursor-not-allowed bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg text-sm font-bold shadow-sm transition-colors flex items-center gap-2">
                        Next: Financial Context &rarr;
                    </button>
                </div>
            </div>
        </div>
    </div>
);

const Step2 = ({ prevStep, nextStep, formData, updateFormData }) => (
    <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Financial Context & Loan Request</h2>
            <p className="text-slate-500 font-medium text-sm">Please provide the details for your entity's financial status and the specifics of the loan you are requesting.</p>
        </div>

        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Annual Turnover (USD)</label>
                    <input type="text" className="block w-full px-4 py-3 border border-slate-200 rounded-lg text-slate-900 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="$ 5,000,000" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Loan Type</label>
                    <div className="relative">
                        <select value={formData.loanPurpose} onChange={(e) => updateFormData({ loanPurpose: e.target.value })} className="block w-full px-4 py-3 border border-slate-200 rounded-lg text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none bg-white">
                            <option value="">Select option</option>
                            <option value="Working Capital">Working Capital</option>
                            <option value="Term Loan">Term Loan</option>
                            <option value="Equipment Financing">Equipment Financing</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Requested Loan Amount</label>
                    <input type="number" value={formData.loanAmount} onChange={(e) => updateFormData({ loanAmount: Number(e.target.value) })} className="block w-full px-4 py-3 border border-slate-200 rounded-lg text-slate-900 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="$ 500,000" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Loan Tenure (Months)</label>
                    <input type="number" value={formData.termLength} onChange={(e) => updateFormData({ termLength: Number(e.target.value) })} className="block w-full px-4 py-3 border border-slate-200 rounded-lg text-slate-900 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="e.g. 36" />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Interest Rate (%)</label>
                    <div className="relative">
                        <input type="text" className="block w-full px-4 py-3 border border-slate-200 rounded-lg text-slate-900 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="e.g. 4.5" />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400 font-bold">%</div>
                    </div>
                </div>
            </div>

            <div className="pt-8 mt-8 border-t border-slate-100 flex items-center justify-between">
                <button onClick={prevStep} className="px-6 py-3 border border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
                    &larr; Previous
                </button>
                <button onClick={nextStep} disabled={!formData.loanAmount || !formData.termLength} className="disabled:opacity-50 disabled:cursor-not-allowed bg-primary-600 hover:bg-primary-700 text-white py-3 px-8 rounded-lg text-sm font-bold shadow-sm transition-colors flex items-center gap-2">
                    Complete Onboarding <CheckCircle2 className="w-4 h-4 ml-1" />
                </button>
            </div>
        </div>
    </div>
);

export default function EntityOnboarding() {
    const [step, setStep] = useState(() => {
        const saved = sessionStorage.getItem('onboardingStep');
        return saved ? parseInt(saved, 10) : 1;
    });

    const [formData, setFormData] = useState(() => {
        const saved = sessionStorage.getItem('onboardingFormData');
        return saved ? JSON.parse(saved) : {
            companyName: '',
            taxId: '',
            industry: '',
            incorporationDate: '2020-01-01',
            loanAmount: 0,
            loanPurpose: '',
            termLength: 0
        };
    });

    const [statusText, setStatusText] = useState(() => {
        return sessionStorage.getItem('onboardingStatus') || "IN PROGRESS";
    });

    React.useEffect(() => {
        sessionStorage.setItem('onboardingStep', step);
    }, [step]);

    React.useEffect(() => {
        sessionStorage.setItem('onboardingFormData', JSON.stringify(formData));
    }, [formData]);

    React.useEffect(() => {
        sessionStorage.setItem('onboardingStatus', statusText);
    }, [statusText]);

    const updateFormData = (updates) => {
        setFormData(prev => ({ ...prev, ...updates }));
    };

    const submitForm = async () => {
        setStatusText("SUBMITTING...");
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"}/api/entities`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                setStatusText("COMPLETED - " + data.entityId);
                setStep(3);
            } else {
                setStatusText("ERROR SUBMITTING");
            }
        } catch (err) {
            console.error(err);
            setStatusText("NET ERROR");
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-6">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 mb-1">Entity Onboarding</h1>
                    <p className="text-slate-500 text-sm font-medium">Step {step} of 3: {step === 1 ? 'Provide your registration details' : step === 2 ? 'Final Review & Submission' : 'Success'}</p>
                </div>
                <div className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wide flex items-center gap-2 ${step === 3 ? 'bg-emerald-50 text-emerald-700' : 'bg-primary-50 text-primary-700'}`}>
                    {step < 3 && <span className="w-2 h-2 rounded-full bg-primary-500"></span>}
                    {statusText}
                </div>
            </div>

            <StepIndicator currentStep={step} />

            {step === 1 && <Step1 nextStep={() => setStep(2)} formData={formData} updateFormData={updateFormData} />}
            {step === 2 && <Step2 prevStep={() => setStep(1)} nextStep={submitForm} formData={formData} updateFormData={updateFormData} />}
            {step === 3 && (
                <div className="bg-white rounded-xl border border-emerald-200 p-12 text-center shadow-sm">
                    <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Registration Complete!</h2>
                    <p className="text-slate-500 font-medium mb-8">Your entity has been actively logged into the FinSight network for analysis.</p>
                    <button onClick={() => window.location.href = '/ingestion'} className="bg-primary-600 hover:bg-primary-700 text-white py-3 px-8 rounded-lg text-sm font-bold shadow-sm transition-colors">
                        Proceed to Data Upload
                    </button>
                </div>
            )}

            <div className="mt-12 flex items-center justify-center gap-8 text-xs font-bold text-slate-400">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" /> Secure AES-256 Encryption
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" /> 24/7 Support Available
                </div>
            </div>
        </div>
    );
}
