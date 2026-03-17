import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

import Dashboard from './pages/Dashboard';
import EntityOnboarding from './pages/EntityOnboarding';
import DataIngestion from './pages/DataIngestion';
import DataValidation from './pages/DataValidation';
import Analytics from './pages/Analytics';
import NewsSignals from './pages/NewsSignals';
import CreditReport from './pages/CreditReport';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

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
