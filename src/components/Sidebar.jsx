import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, UserPlus, FolderOpen, BarChart2, Settings, Activity } from 'lucide-react';

const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Entity Onboarding', icon: UserPlus, path: '/onboarding' },
    { name: 'Data Ingestion', icon: FolderOpen, path: '/ingestion' },
    { name: 'Validation', icon: Activity, path: '/validation' },
    { name: 'Analytics', icon: BarChart2, path: '/analytics' },
    { name: 'News Signals', icon: Activity, path: '/signals' },
    { name: 'Settings', icon: Settings, path: '/settings' },
];

export default function Sidebar() {
    return (
        <aside className="w-64 bg-white border-r border-slate-200 h-screen sticky top-0 flex flex-col">
            <div className="p-6 flex items-center gap-3 border-b border-transparent">
                <div className="bg-primary-600 p-1.5 rounded-lg flex-shrink-0">
                    <Activity className="text-white w-5 h-5" />
                </div>
                <span className="font-bold text-xl tracking-tight text-slate-900">FinSight AI</span>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                                    ? 'bg-primary-50 text-primary-700'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`
                            }
                        >
                            <Icon className="w-5 h-5" />
                            {item.name}
                        </NavLink>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-200">
                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors">
                    <span>+</span> New Evaluation
                </button>
            </div>
        </aside>
    );
}
