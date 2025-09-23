import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Building, User, CheckCircle, Activity, FileText, ArrowLeft } from 'lucide-react';
import OpportunitiesDetails from "./OpportunitiesDetails";
import ActivityButtons from './OppActivity';

export default function App() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [account, setAccount] = useState(null);
    const [relatedContacts, setRelatedContacts] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [relatedProposals, setRelatedProposals] = useState([]);
    const [leadData, setLeadData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isComplete, setIsComplete] = useState(false);
    const [message, setMessage] = useState('');
    const [activeTab, setActiveTab] = useState("relate");
    const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`http://localhost:7000/api/opportunities/${id}`);
                setLeadData(res.data);
                if (res.data.Status?.toLowerCase() === "completed") {
                    setIsComplete(true);
                }
            } catch (error) {
                console.error('Error fetching opportunity:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchAccount = async () => {
            try {
                const res = await axios.get(`http://localhost:7000/api/opportunities/${id}/account`);
                setAccount(res.data);
            } catch (error) {
                console.error("Error fetching account:", error);
            }
        };

        const fetchContacts = async () => {
            try {
                const res = await axios.get(`http://localhost:7000/api/opportunities/${id}/contact`);
                setRelatedContacts(res.data || []);
            } catch (error) {
                console.error("Error fetching related contacts:", error);
            }
        };
        const fetchProducts = async () => {
                    try {
                        const res = await axios.get(`http://localhost:7000/api/opportunityProducts/${id}`);
                        setRelatedProducts(res.data || []);
                    } catch (error) {
                        console.error("Error fetching related products:", error);
                    }
                    };

        const fetchProposals = async () => {
        try {
            const res = await axios.get(`http://localhost:7000/api/opportunities/proposals/${id}`);
            setRelatedProposals(res.data);
        } catch (err) {
            console.error("Error fetching proposals:", err);
            setLoading(false);
        }
        };

        fetchProposals();
        fetchProducts();
        fetchAccount();
        fetchContacts();
        fetchData();
    }, [id]);

    const handleMarkComplete = async () => {
        if (leadData.Status?.toLowerCase() === "completed") return;
        setLoading(true);
        try {
            const res = await axios.patch(`http://localhost:7000/api/opportunities/${id}`, { Status: "Completed" });
            if (res.status === 200) {
                setLeadData((prev) => ({ ...prev, Status: "Completed" }));
                setIsComplete(true);
                setMessage('Lead successfully marked as complete!');
            }
        } catch (error) {
            console.error("Failed to mark complete:", error);
            setMessage("Failed to mark complete");
        } finally {
            setLoading(false);
            setTimeout(() => setMessage(''), 3000);
        }
    };

    const handleStageClick = (newStage) => {
        if (leadData.Status?.toLowerCase() === "completed") return;
        if (newStage === "Closed") {
            setIsCloseModalOpen(true);
        } else {
            updateStage(newStage);
        }
    };

    const updateStage = async (newStage) => {
        try {
            const res = await axios.patch(`http://localhost:7000/api/opportunities/${id}`, { Status: newStage });
            if (res.status === 200) {
    setLeadData((prev) => ({ ...prev, Status: newStage }));
    setMessage(`Status updated to "${newStage}"`);
    setTimeout(() => setMessage(''), 3000);
}

        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    const handleCloseStatusSelect = (Status) => {
        updateStage(Status);
        setIsCloseModalOpen(false);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-zinc-100">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    if (!leadData) {
        return (
            <div className="flex justify-center items-center h-screen bg-zinc-100 text-zinc-700">
                No data available.
            </div>
        );
    }

  const ProgressBar = ({ currentStage }) => {
  const stages = ["Prospect", "Qualify", "Secure", "Contacted", "Closed"];

  const currentIndex = stages.findIndex(
    (stage) => stage.toLowerCase() === currentStage?.toLowerCase()
  );
  const effectiveIndex = currentIndex === -1 ? 0 : currentIndex;

  const isCompleted = currentStage?.toLowerCase() === "completed";

  return (
    <div className="flex">
      {stages.map((stage, index) => {
        let stageColor = "";
        let displayText = stage;

        // handle Close Won / Close Lost separately
        if (currentStage === "Close Won") {
          stageColor = "bg-green-600 text-white";
          if (stage === "Closed") displayText = "Close Won";
        } else if (currentStage === "Close Lost") {
          stageColor =
            index < stages.length - 1
              ? "bg-gray-400 text-white"
              : "bg-red-600 text-white";
          if (stage === "Closed") displayText = "Close Lost";
        } else if (isCompleted) {
          stageColor = "bg-green-500 text-white";
        } else if (index <= effectiveIndex) {
          stageColor = "bg-green-600 text-white";
        } else {
          stageColor = "bg-zinc-300 text-zinc-700";
        }

        return (
          <div
            key={stage}
            onClick={() => handleStageClick(stage)}
            className={`relative flex-grow h-8 flex items-center justify-center text-xs font-bold cursor-pointer transition ${stageColor}
              ${index === 0 ? "rounded-l-lg" : "-ml-2"}
              ${index === stages.length - 1 ? "rounded-r-lg" : ""}
              hover:scale-105 hover:brightness-105`}
            style={{
              clipPath: `polygon(0 0, ${
                index === stages.length - 1 ? "100%" : "calc(100% - 1rem)"
              } 0, 100% 50%, ${
                index === stages.length - 1 ? "100%" : "calc(100% - 1rem)"
              } 100%, 0 100%, ${index === 0 ? "0" : "1rem"} 50%)`,
            }}
          >
            <span className="z-10">{displayText}</span>
          </div>
        );
      })}
    </div>
  );
};


    const CloseStatusModal = ({ isOpen, onClose, onSelect }) => {
        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div
                    className="absolute inset-0 bg-black opacity-50"
                    onClick={onClose}
                ></div>

                <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-80">
                    <h2 className="text-lg font-bold mb-4">Select Close Status</h2>
                    <div className="flex flex-col space-y-3">
                        <button
                            className={`px-4 py-2 rounded text-white ${
                                leadData.Status === "Close Lost" 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-green-600 hover:bg-green-700'
                            }`}
                            disabled={leadData.Status === "Close Lost"}
                            onClick={() => onSelect("Close Won")}
                        >
                            Close Won
                        </button>
                        <button
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            onClick={() => onSelect("Close Lost")}
                        >
                            Close Lost
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full max-w-8xl min-h-screen bg-white p-4 rounded-2xl shadow-2xl">
           <div className="mb-3 bg-blue-50 border rounded-lg shadow-sm p-4">
                 <div className="flex justify-between items-start mb-5">
                   <div className="flex items-center gap-1">
                     <Building size={48} className="text-purple-500" />
                     <div className="cursor-pointer"
                            onClick={() => navigate(`/account/${account._id}`)}>
                       <h1 className="text-sm font-bold text-slate-800">Account</h1>
                       {account && (
                         <p className="text-xl font-semibold text-slate-800">
                           {account.Company}
                         </p>
                       )}
                     </div>
                   </div>
                 </div>
                 <div className="grid grid-cols-4 gap-4 px-2">
                   <div>
                     <p className="text-sm font-medium text-gray-600">Phone</p>
                     <p className="text-base text-blue-600">{account?.Phone}</p>
                   </div>
                   <div>
                    <p className="text-sm font-medium text-gray-600">Website</p>
                    <a
                        href={account?.Website?.startsWith("http") ? account.Website : `https://${account?.Website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base text-blue-600 cursor-pointer hover:underline"
                    >
                        {account?.Website}
                    </a>
                    </div>
                   <div>
                     <p className="text-sm font-medium text-gray-600">Account Owner</p>
                     <p className="text-base text-blue-600">{account?.Name}</p>
                   </div>
                   <div>
                     <p className="text-sm font-medium text-gray-600">Email</p>
                     <p className="text-base text-blue-600">{account?.Email}</p>
                   </div>
                 </div>
               </div>

            {/* PROGRESS BAR + COMPLETE BUTTON */}
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-1 sm:space-y-0 sm:space-x-8 mb-2 p-1 bg-zinc-100 rounded-xl shadow-inner">
                <div className="flex-grow w-full">
                    <ProgressBar currentStage={leadData.Status} />
                </div>

                {!isComplete && (
                    <button
                        onClick={handleMarkComplete}
                        className="px-10 py-1 rounded-xl text-white font-bold shadow-lg transition duration-300 transform whitespace-nowrap bg-blue-600 hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                        Mark Complete
                    </button>
                )}

                {isComplete && (
                    <div className="px-10 py-1 rounded-xl bg-green-500 text-white font-bold shadow-lg">
                        Complete
                    </div>
                )}
            </div>

            {/* TABS */}
                <div className="bg-white rounded-t-2xl shadow-sm overflow-hidden border-b">
                <div className="flex">
                    <button
                    onClick={() => setActiveTab("relate")}
                    className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all duration-200 ${
                        activeTab === "relate"
                        ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50 cursor-pointer"
                        : "text-gray-600 hover:text-blue-600 cursor-pointer"
                    }`}
                    >
                    <User size={18} />
                    Related Info
                    </button>

                    <button
                    onClick={() => setActiveTab("activity")}
                    className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all duration-200 ${
                        activeTab === "activity"
                        ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50 cursor-pointer"
                        : "text-gray-600 hover:text-blue-600 cursor-pointer"
                    }`}
                    >
                    <Activity size={18} /> Activity
                    </button>

                    <button
                    onClick={() => setActiveTab("details")}
                    className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all duration-200 ${
                        activeTab === "details"
                        ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50 cursor-pointer"
                        : "text-gray-600 hover:text-blue-600 cursor-pointer"
                    }`}
                    >
                    <FileText size={18} /> Opportunity Details
                    </button>
                </div>
                </div>

                <div className="bg-white min-h-[300px] mt-0 rounded-b-2xl">
              {activeTab === "relate" && (
                <div className="space-y-6">
                    <div className="border rounded-b-lg bg-gray-50">
                    <div className="flex justify-between items-center p-3 border-b bg-gray-100">
                        <h2 className="font-semibold text-sm text-slate-700">
                        Contacts ({relatedContacts?.length || 0})
                        </h2>
                        <button 
                        onClick={() => navigate(`/contacts/new/${account._id}`)}
                        className="px-2 py-1 text-xs font-medium border rounded hover:bg-blue-100">
                        New
                        </button>
                    </div>
                    <div className="p-4 text-sm text-slate-700">
                        {relatedContacts?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {relatedContacts.map((contact, index) => (
                            <div
                                key={index}
                                onClick={() => navigate(`/contacts/${contact._id}`)}
                                className="p-3 rounded shadow-sm hover:shadow-md bg-white cursor-pointer"
                            >
                                <p className="text-blue-600 font-medium hover:underline">
                                {contact.Name}
                                </p>
                                <p>
                                Email:{" "}
                                <a
                                    href={`mailto:${contact.Email}`}
                                    className="text-blue-600"
                                >
                                    {contact.Email}
                                </a>
                                </p>
                                <p>
                                Phone:{" "}
                                <a
                                    href={`tel:${contact.Phone}`}
                                    className="text-blue-600"
                                >
                                    {contact.Phone}
                                </a>
                                </p>
                            </div>
                            ))}
                        </div>
                        ) : (
                        <p>No contacts found.</p>
                        )}
                    </div>

                    <div className="px-4 py-2 text-sm text-blue-600 hover:underline cursor-pointer">
                        View All
                    </div>
                    
                    </div>
                    
                   <div className="border rounded-b-lg bg-gray-50">
                    <div className="flex justify-between items-center p-3 border-b bg-gray-100">
                        <h2 className="font-semibold text-sm text-slate-700">
                        Product ({relatedProducts?.length || 0})
                        </h2>
                        <div className="flex gap-2">
                        <button
                            onClick={() => navigate(`/productlist/${id}`)}
                            className="px-2 py-1 text-xs font-medium border rounded hover:bg-blue-100 cursor-pointer"
                        >
                            Add
                        </button>
                       <button
                        onClick={async () => {
                            const proposalLink = `${window.location.origin}/proposal/${id}`;
                            navigator.clipboard.writeText(proposalLink);
                            alert("Proposal link copied: " + proposalLink)
                            try {
                            const res = await axios.post("http://localhost:7000/api/proposals/send-proposal", {
                                proposalId: id,
                            });
                            alert(res.data.message);
                            } catch (err) {
                            console.error("Error sending proposal:", err);
                            alert("Failed to send proposal.");
                            }
                            navigate(`/proposal/${id}`);
                        }}
                        className="px-2 py-1 text-xs font-medium border rounded bg-green-500 text-white hover:bg-green-600 cursor-pointer"
                        >
                        Generate Proposal
                        </button>
                        </div>
                    </div>

                    {/* Product List */}
                    <div className="p-4 text-sm text-slate-700">
                        {relatedProducts?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {relatedProducts.map((product, index) => (
                            <div
                                key={index}
                                className="p-3 rounded shadow-sm hover:shadow-md bg-white cursor-pointer"
                            >
                                <p className="text-blue-600 font-medium hover:underline">
                                {product.productName}
                                </p>
                                <p className="text-gray-600 text-sm">
                                Category: {product.category}
                                </p>
                                <p className="text-gray-500 text-xs">
                                ID: {product.productId?.productId}
                                </p>

                                {showDetails && (
                                <div className="mt-2 text-xs text-slate-600 border-t pt-2 space-y-1">
                                    <p>
                                    <span className="font-semibold">Quantity:</span>{" "}
                                    {product.quantity}
                                    </p>
                                    <p>
                                    <span className="font-semibold">Price:</span> {product.sellingPrice}{" "}
                                    {product.currency}
                                    </p>
                                    <p>
                                    <span className="font-semibold">Total Price:</span>{" "}
                                    <span>{product.quantity? product.sellingPrice * product.quantity: product.sellingPrice}{" "}{product.currency}
</span>
                                    </p>
                                    <p>
                                    <span className="font-semibold">Start Date:</span>{" "}
                                    {new Date(product.startDate).toLocaleDateString()}
                                    </p>
                                    <p>
                                    <span className="font-semibold">Delivery Date:</span>{" "}
                                    {new Date(product.deliveryDate).toLocaleDateString()}
                                    </p>
                                    <p>
                                    <span className="font-semibold">Created At:</span>{" "}
                                    {new Date(product.createdAt).toLocaleString()}
                                    </p>
                                </div>
                                )}
                            </div>
                            ))}
                        </div>
                        ) : (
                        <p>No Products found.</p>
                        )}
                    </div>

                    <div
                        className="px-4 py-2 text-sm text-blue-600 hover:underline cursor-pointer"
                        onClick={() => setShowDetails(!showDetails)}
                    >
                        {showDetails ? "Hide Details" : "See Details"}
                    </div>
                    </div>
                 <div className="border rounded-b-lg bg-gray-50">
                    <div className="flex justify-between items-center p-3 border-b bg-gray-100">
                        <h2 className="font-semibold text-sm text-slate-700">
                        Proposal ({relatedProposals?.length || 0})
                    </h2>
                    </div>
                    <div className="p-4 text-sm text-slate-700">
                        {relatedProposals?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {relatedProposals.map((proposals, index) => (
                            <div
                                key={index}
                                onClick={() => navigate(`/proposals/${proposals._id}`)}
                                className="p-3 rounded shadow-sm hover:shadow-md bg-white cursor-pointer"
                            >
                                <p className="text-blue-600 font-medium hover:underline">
                                {proposals.Name}
                                </p>
                                <p>
                                Email:{" "}
                                <a
                                    href={`mailto:${proposals.Email}`}
                                    className="text-blue-600"
                                >
                                    {proposals.Email}
                                </a>
                                </p>
                                <p>
                                Phone:{" "}
                                <a
                                    href={`tel:${proposals.Phone}`}
                                    className="text-blue-600"
                                >
                                    {proposals.Phone}
                                </a>
                                </p>
                            </div>
                            ))}
                        </div>
                        ) : (
                        <p>No proposals found.</p>
                        )}
                    </div>

                    <div className="px-4 py-2 text-sm text-blue-600 hover:underline cursor-pointer">
                        View All
                    </div>
                    
                    </div>
              
                </div>
                )}
                {activeTab === "activity" && (
                    <div className="space-y-6 p-4">
                    <ActivityButtons />
                    </div>
                )}
                {activeTab === "details" && <OpportunitiesDetails leadData={leadData} />}
                </div>
            <div
                className={`fixed bottom-8 left-1/2 -translate-x-1/2 p-2 rounded-xl shadow-2xl transition-transform duration-500 ease-out z-50 ${
                    message ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                } bg-green-500 text-white flex items-center space-x-3`}
            >
                <CheckCircle size={20} />
                <span>{message}</span>
            </div>
            <CloseStatusModal
                isOpen={isCloseModalOpen}
                onClose={() => setIsCloseModalOpen(false)}
                onSelect={handleCloseStatusSelect}
            />
        </div>
    );
}
