import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import CustomersPage from "./pages/Customers";
import DashboardPage from "./pages/Dashboard";
import ProposalPages from "./pages/Proposal";
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
import OpportunityForm from "./pages/OpportunityForm";
import ContactsForm from "./pages/ContactForm";
import Cases from "./pages/CaseList";
import CaseForm from "./pages/CaseForm";
import CaseDetail from "./pages/CaseDetail";
import Contracts from "./pages/Contracts";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import AddProduct from "./pages/AddProduct";
import ProductList from "./pages/ProductList";
import ProposalPage from "./pages/ProposalPage";
import ProposalDetail from "./pages/ProposalDetail";
import AgreementPage from "./pages/AgreementPage";
function ProtectedRoute({ element }) {
  const authenticated = useAuthStore((state) => state.authenticated);
  const loading = useAuthStore((state) => state.loading);
  const location = useLocation();

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  if (!authenticated) {
    // agar user login nahi hai to /login bhejo aur current location save karo
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return element;
}

function AppRoutes() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const setLoading = useAuthStore((state) => state.setLoading);
  const location = useLocation();

  useEffect(() => {
    (async () => {
      setLoading(true);
      await checkAuth();
      setLoading(false);
    })();
  }, [checkAuth, setLoading, location.pathname]);

  const isLoginPage = location.pathname === "/login";

  return (
    <div className="flex h-screen">
      {!isLoginPage && <Sidebar isOpen={sidebarOpen} />}
      <div className="flex flex-col flex-1">
        {!isLoginPage && <Header setSidebarOpen={setSidebarOpen} />}
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <Routes>
            {/* Public Route */}
            <Route path="/login" element={<Login />} />

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
            <Route path="/contacts/:id" element={<ProtectedRoute element={<ContactDetails />} />} />
            <Route path="/proposal" element={<ProtectedRoute element={<ProposalPages />} />} />
            <Route path="/newproposal" element={<ProtectedRoute element={<NewProposalPage />} />} />
            <Route path="/estimates" element={<ProtectedRoute element={<Estimate />} />} />
            <Route path="/opportunitieslist" element={<ProtectedRoute element={<OpportunitiesList />} />} />
            <Route path="/account" element={<ProtectedRoute element={<Account />} />} />
            <Route path="/account/:id" element={<ProtectedRoute element={<AccountView />} />} />
            <Route path="/newaccount" element={<ProtectedRoute element={<NewAccount />} />} />
            <Route path="/opportunities/:id" element={<ProtectedRoute element={<OpportunitiesView />} />} />
            <Route path="/opportunities/new/:accountId" element={<ProtectedRoute element={<OpportunityForm />} />} />
            <Route path="/contacts/new/:accountId" element={<ProtectedRoute element={<ContactsForm />} />} />
            <Route path="/cases" element={<ProtectedRoute element={<Cases />} />} />
            <Route path="/cases/new" element={<ProtectedRoute element={<CaseForm />} />} />
            <Route path="/case/:id" element={<ProtectedRoute element={<CaseDetail />} />} />
            <Route path="/addproduct" element={<ProtectedRoute element={<AddProduct />} />} />
            <Route path="/productlist" element={<ProtectedRoute element={<ProductList />} />} />
            <Route path="/productlist/:id" element={<ProtectedRoute element={<ProductList />} />} />
            <Route path="/proposal/:id" element={<ProtectedRoute element={<ProposalPage />} />} />
            <Route path="/proposaldetail/:id" element={<ProtectedRoute element={<ProposalDetail />} />} />
            <Route path="/agreement/:id" element={<ProtectedRoute element={<AgreementPage />} />} />
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
