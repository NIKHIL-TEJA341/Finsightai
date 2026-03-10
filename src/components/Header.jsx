import React from 'react';
import { Search, Bell, HelpCircle } from 'lucide-react';

export default function Header() {
    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
            <div className="flex-1 flex max-w-2xl">
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border-none rounded-lg bg-slate-100/80 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors"
                        placeholder="Search entities, reports..."
                    />
                </div>
            </div>

            <div className="flex items-center gap-4 ml-4">
                <button className="text-slate-500 hover:text-slate-700 p-1 relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>
                <button className="text-slate-500 hover:text-slate-700 p-1">
                    <HelpCircle className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-3 ml-2 pl-4 border-l border-slate-200">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-slate-700 leading-none">Alex Rivera</p>
                        <p className="text-xs text-slate-500 mt-1">Onboarding Specialist</p>
                    </div>
                    <img
                        className="h-8 w-8 rounded-full bg-slate-200 object-cover border border-slate-200"
                        src="https://api.dicebear.com/7.x/notionists/svg?seed=Alex"
                        alt="Profile"
                    />
                </div>
            </div>
        </header>
    );
}
