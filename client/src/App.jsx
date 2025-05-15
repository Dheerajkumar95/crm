import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Leads from "./pages/Leads";
import Contacts from "./pages/Contacts";
import Opportunities from "./pages/Opportunities";
import Cases from "./pages/Cases";
import Contracts from "./pages/Contracts";
import Dashboard from "./pages/Dashboard";
const App = () => {
  return (
    <Router>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <nav className="w-48 p-4 bg-gray-100">
          <ul className="space-y-4">
            <li>
              <Link to="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link>
            </li>
            <li>
              <Link to="/" className="text-blue-600 hover:underline">Leads</Link>
            </li>
            <li>
              <Link to="/contacts" className="text-blue-600 hover:underline">Contacts</Link>
            </li>
            <li>
              <Link to="/opportunities" className="text-blue-600 hover:underline">Opportunities</Link>
            </li>
            <li>
              <Link to="/cases" className="text-blue-600 hover:underline">Cases</Link>
            </li>
            <li>
              <Link to="/contracts" className="text-blue-600 hover:underline">Contracts</Link>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="p-6 flex-1">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Leads />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/contracts" element={<Contracts />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
