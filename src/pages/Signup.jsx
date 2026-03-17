import React from 'react';
import { ShieldCheck, UserPlus, Building2, Mail, Lock } from 'lucide-react';

export default function Signup() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center items-center gap-2 mb-6">
                    <div className="bg-primary-600 p-2 rounded-lg shadow-md border border-primary-500">
                        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                    </div>
                    <span className="text-2xl font-black tracking-tight text-slate-900 border-l-2 border-slate-200 pl-2">FinSight AI</span>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">Request Platform Access</h2>
                <p className="mt-2 text-center text-sm text-slate-600 font-medium">
                    Already have an account? <a href="/login" className="font-bold text-primary-600 hover:text-primary-500">Sign in here</a>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-xl sm:px-10 border border-slate-200 overflow-hidden relative">
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
                    <form className="space-y-6" action="#" method="POST" onSubmit={(e) => { e.preventDefault(); window.location.href = "/login"; }}>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700">First Name</label>
                                <input type="text" required className="mt-2 block w-full px-4 py-3 border border-slate-200 rounded-lg text-slate-900 bg-slate-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-colors" placeholder="Jane" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700">Last Name</label>
                                <input type="text" required className="mt-2 block w-full px-4 py-3 border border-slate-200 rounded-lg text-slate-900 bg-slate-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-colors" placeholder="Doe" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700">Corporate Email</label>
                            <div className="mt-2 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-400" />
                                </div>
                                <input type="email" required className="block w-full pl-10 px-4 py-3 border border-slate-200 rounded-lg text-slate-900 bg-slate-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-colors" placeholder="jane.doe@enterprise.com" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700">Institution Name</label>
                            <div className="mt-2 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Building2 className="h-5 w-5 text-slate-400" />
                                </div>
                                <input type="text" required className="block w-full pl-10 px-4 py-3 border border-slate-200 rounded-lg text-slate-900 bg-slate-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-colors" placeholder="Global Capital Bank" />
                            </div>
                        </div>

                        <div className="flex items-start mt-4">
                            <div className="flex items-center h-5">
                                <input id="terms" name="terms" type="checkbox" required className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded" />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="terms" className="font-medium text-slate-600">I agree to the <a href="#" className="font-bold text-emerald-600 hover:text-emerald-500">Terms of Service</a> and <a href="#" className="font-bold text-emerald-600 hover:text-emerald-500">Privacy Policy</a>.</label>
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors">
                                <UserPlus className="w-4 h-4 mr-2" /> Submit Access Request
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 flex justify-center items-center gap-2 text-xs font-bold text-slate-400 bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <ShieldCheck className="w-4 h-4 text-primary-500" /> Requests are manually reviewed within 24h
                    </div>
                </div>
            </div>
        </div>
    );
}
