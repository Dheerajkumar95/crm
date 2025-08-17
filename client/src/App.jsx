import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import CustomersPage from "./pages/Customers";
import DashboardPage from "./pages/Dashboard";
import ProposalPage from "./pages/Proposal";
import NewProposalPage from "./pages/NewProposal";
import Estimate from "./pages/Estimates";
import Leads from "./pages/Leads";
import NewLeads from "./pages/NewLeads";
import NewAccount from "./pages/NewAccount";
import LeadDetails from "./pages/LeadDetails";
import TaskPage from "./pages/TaskPage";
import MessagePage from "./pages/MessagePage";
import LeadImport from "./pages/LeadImport";
import Account from "./pages/Accounts";
import Contact from "./pages/Contacts";
import ContactDetails from "./pages/ContactDetails";
import AccountView from "./pages/AccountView";
import OpportunitiesList from "./pages/OpportunitiesList";
import OpportunitiesView from "./pages/OpportunitiesView";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";


function ProtectedRoute({ element }) {
  const authenticated = useAuthStore((state) => state.authenticated);
  const loading = useAuthStore((state) => state.loading); // optional if you add loading state

  if (loading) return <div>Loading...</div>;
  return authenticated ? element : <Navigate to="/login" replace />;
}


function AppRoutes() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const authenticated = useAuthStore((state) => state.authenticated);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const isAuth = await checkAuth();
      if (!isAuth && location.pathname !== "/login") {
        navigate("/login");
      }
    })();
  }, [checkAuth, navigate, location.pathname]);

  const isLoginPage = location.pathname === "/login";

  return (
    <div className="flex h-screen">
      {!isLoginPage && <Sidebar isOpen={sidebarOpen} />}
      <div className="flex flex-col flex-1">
        {!isLoginPage && <Header setSidebarOpen={setSidebarOpen} />}
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <Routes>
            {/* Public Route */}
            <Route
              path="/login"
              element={
                authenticated ? <Navigate to="/" replace /> : <Login />
              }
            />

            {/* Protected Routes */}
            <Route path="/" element={<ProtectedRoute element={<DashboardPage />} />} />
            <Route path="/customers" element={<ProtectedRoute element={<CustomersPage />} />} />
            <Route path="/leads" element={<ProtectedRoute element={<Leads />} />} />
            <Route path="/newleads" element={<ProtectedRoute element={<NewLeads />} />} />
            <Route path="/leads/:id" element={<ProtectedRoute element={<LeadDetails />} />} />
            <Route path="/tasks/:leadId" element={<ProtectedRoute element={<TaskPage />} />} />
            <Route path="/messages/:leadId" element={<ProtectedRoute element={<MessagePage />} />} />
            <Route path="/leadimport" element={<ProtectedRoute element={<LeadImport />} />} />
            <Route path="/contact" element={<ProtectedRoute element={<Contact />} />} />
            <Route path="/contacts/:id" element={<ContactDetails />} />
            <Route path="/proposal" element={<ProtectedRoute element={<ProposalPage />} />} />
            <Route path="/newproposal" element={<ProtectedRoute element={<NewProposalPage />} />} />
            <Route path="/estimates" element={<ProtectedRoute element={<Estimate />} />} />
            <Route path="/opportunitieslist" element={<ProtectedRoute element={<OpportunitiesList />} />} />
            <Route path="/account" element={<ProtectedRoute element={<Account />} />} />
            <Route path="/account/:id" element={<ProtectedRoute element={<AccountView />} />} />
            <Route path="/newaccount" element={<ProtectedRoute element={<NewAccount />} />} />
            <Route path="/opportunities/:id" element={<ProtectedRoute element={<OpportunitiesView />} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Router>
        <AppRoutes />
      </Router>
      <Toaster />
    </>
  );
}
