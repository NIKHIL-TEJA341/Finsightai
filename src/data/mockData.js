export const dashboardStats = {
    totalPendingReviews: { value: 124, trend: '+12%', isPositive: false }, // Pending going up might be neutral/negative, UI shows +12% in green so we'll just parse the string
    averageRiskScore: { value: 42.5, trend: '-5%', isPositive: true },
    documentsProcessedToday: { value: '1,892', trend: '+24%', isPositive: true },
};

export const riskSummary = {
    critical: 12,
    medium: 45,
    safe: 67
};

export const recentOnboardings = [
    { id: 'ENT-8921', name: 'Stellar Dynamics Ltd', sector: 'Technology', riskScore: 18, riskLevel: 'Low', date: 'Oct 24, 2023', status: 'Analysis' },
    { id: 'ENT-3304', name: 'GreenGrid Energy', sector: 'Renewables', riskScore: 42, riskLevel: 'Med', date: 'Oct 23, 2023', status: 'Ingestion' },
    { id: 'ENT-1129', name: 'MediCorp Global', sector: 'Healthcare', riskScore: null, riskLevel: 'N/A', date: 'Oct 23, 2023', status: 'Onboarding' },
    { id: 'ENT-0092', name: 'Horizon Ventures', sector: 'Financial Services', riskScore: 12, riskLevel: 'Low', date: 'Oct 21, 2023', status: 'Complete' },
];

export const sectorDistribution = [
    { name: 'TECH', value: 35 },
    { name: 'FINANCE', value: 25 },
    { name: 'ENERGY', value: 15 },
    { name: 'HEALTH', value: 15 },
    { name: 'RETAIL', value: 5 },
    { name: 'MANU', value: 3 },
    { name: 'OTHER', value: 2 },
];
