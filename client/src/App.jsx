import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CustomersPage from './pages/Customers';
import DashboardPage from './pages/Dashboard';
import ProposalPage from './pages/Proposal';
import NewProposalPage from './pages/NewProposal';
import Estimate from './pages/Estimates';
import Opportunities from './pages/Opportunities';
import Leads from './pages/Leads';
import NewLeads from './pages/NewLeads';
import Account from './pages/Accounts';
import AccountDetails from "./pages/AccountDetails";
import{ Toaster } from 'react-hot-toast';
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return ( 
  <>
    <Router>
      <div className="flex h-screen">
        <Sidebar isOpen={sidebarOpen} />
        <div className="flex flex-col flex-1">
          <Header setSidebarOpen={setSidebarOpen} />
          <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/leads" element={<Leads />} />
              <Route path="/newleads" element={<NewLeads />} />
              <Route path="/customers" element={<CustomersPage />} />
              <Route path="/proposal" element={<ProposalPage />} />
              <Route path="/newproposal" element={<NewProposalPage />} />
              <Route path="/estimates" element={<Estimate />} />
              <Route path="/opportunities" element={<Opportunities />} />
              <Route path="/account" element={<Account />} />
              <Route path="/account/:id" element={<AccountDetails />} />
               

            </Routes>
          </main>
        </div>
      </div>
    </Router>
    <Toaster />
   </>
  );
}

export default App;