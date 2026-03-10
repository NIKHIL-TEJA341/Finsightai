import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// Stubs
const Dashboard = () => <div className="text-xl font-bold">Dashboard View Stub</div>;
const EntityOnboarding = () => <div className="text-xl font-bold">Entity Onboarding View Stub</div>;
const DataIngestion = () => <div className="text-xl font-bold">Data Ingestion View Stub</div>;
const DataValidation = () => <div className="text-xl font-bold">Data Validation View Stub</div>;
const Analytics = () => <div className="text-xl font-bold">Analytics & Risk View Stub</div>;
const NewsSignals = () => <div className="text-xl font-bold">News Signals View Stub</div>;
const CreditReport = () => <div className="text-xl font-bold">Credit Report View Stub</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/onboarding" element={<EntityOnboarding />} />
          <Route path="/ingestion" element={<DataIngestion />} />
          <Route path="/validation" element={<DataValidation />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/signals" element={<NewsSignals />} />
          <Route path="/reports/:id" element={<CreditReport />} />
          <Route path="*" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
