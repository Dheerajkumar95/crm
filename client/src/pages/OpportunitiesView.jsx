import { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    BadgeDollarSign, Building, User, CheckCircle,
     Activity, FileText,ArrowLeft
} from 'lucide-react';
import OpportunitiesDetails from "./OpportunitiesDetails";
import ActivityButtons from './Activity';

export default function App() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [account, setAccount] = useState(null);
    const [relatedContacts, setRelatedContacts] = useState([]);
    const [leadData, setLeadData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isComplete, setIsComplete] = useState(false);
    const [message, setMessage] = useState('');
    const [activeTab, setActiveTab] = useState("relate");
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`http://localhost:7000/api/opportunities/${id}`);
                setLeadData(res.data);
                if (res.data.status?.toLowerCase() === "completed") {
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
        fetchAccount();
        fetchContacts();
        fetchData();
    }, [id]);

    const handleMarkComplete = async () => {
        if (leadData.status?.toLowerCase() === "completed") return;

        setLoading(true);
        try {
            const res = await axios.patch(`http://localhost:7000/api/opportunities/${id}`, {
                status: "Completed"
            });

            if (res.status === 200) {
                setLeadData((prev) => ({ ...prev, status: "Completed" }));
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

    const handleStageClick = async (newStage) => {
        if (leadData.status?.toLowerCase() === "completed") return;

        try {
            const res = await axios.patch(`http://localhost:7000/api/opportunities/${id}`, {
                status: newStage,
            });
            if (res.status === 200) {
                setLeadData((prev) => ({ ...prev, status: newStage }));
                setMessage(`Status updated to "${newStage}"`);
                setTimeout(() => setMessage(''), 3000);
            }
        } catch (error) {
            console.error("Failed to update status", error);
        }
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
        const stages = ["Prospect", "Qualify", "Secure", "Contracted", "Closed Won", "Closed Lost"];
        const currentIndex = stages.findIndex(
            stage => stage.toLowerCase() === currentStage?.toLowerCase()
        );
        const isCompleted = currentStage?.toLowerCase() === "completed";

        return (
            <div className="flex">
                {stages.map((stage, index) => (
                    <div
                        key={stage}
                        onClick={() => {
                            if (!isCompleted) handleStageClick(stage);
                        }}
                        className={`relative flex-grow h-8 flex items-center justify-center text-xs font-bold cursor-pointer transition
                            ${isCompleted ? 'bg-green-500 text-white' :
                                index <= currentIndex ? 'bg-blue-600 text-white' : 'bg-zinc-300 text-zinc-700'}
                            ${index === 0 ? 'rounded-l-lg' : '-ml-2'}
                            ${index === stages.length - 1 ? 'rounded-r-lg' : ''}
                            hover:scale-105 hover:brightness-105`}
                        style={{
                            clipPath: `polygon(0 0, ${index === stages.length - 1 ? '100%' : 'calc(100% - 1rem)'} 0, 100% 50%, ${index === stages.length - 1 ? '100%' : 'calc(100% - 1rem)'} 100%, 0 100%, ${index === 0 ? '0' : '1rem'} 50%)`
                        }}
                    >
                        <span className="z-10">{stage}</span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="w-full max-w-8xl bg-white p-4 rounded-2xl shadow-2xl">
            {/* TOP HEADER */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-4 ">
                <div className="flex items-center space-x-2 p-2 h-10 text-black">
                    <button
                      onClick={() => navigate(-1)}
                        className="text-sm text-gray-600 hover:text-blue-600 flex items-center cursor-pointer"
                     >
                     <ArrowLeft className="h-5 w-5" />
                    </button>
                    <Building size={28} />
                    <div className="cursor-pointer" onClick={() => navigate(`/account/${account._id}`)}>
                        <span className="block text-sm opacity-80">Company</span>
                        <span className="block font-bold text-lg">{leadData.company}</span>
                    </div>
                </div>
                <div className="flex items-center space-x-4 p-5 h-10  text-zinc-800">
                    <User size={28} className="text-zinc-500" />
                    <div className="cursor-pointer" onClick={() => navigate(`/account/${account._id}`)}>
                        <span className="block text-sm text-zinc-500">Account ID</span>
                        <span className="block font-semibold text-lg">{leadData.accountId}</span>
                    </div>
                </div>
                <div className="flex items-center space-x-4 p-5 h-10   text-zinc-800">
                    <BadgeDollarSign size={28} className="text-zinc-500" />
                    <div>
                        <span className="block text-sm text-zinc-500">Lead Value</span>
                        <span className="block font-semibold text-lg">{leadData.leadValue}</span>
                    </div>
                </div>
            </div>

            {/* PROGRESS BAR + COMPLETE BUTTON */}
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-1 sm:space-y-0 sm:space-x-8 mb-2 p-1 bg-zinc-100 rounded-xl shadow-inner">
                <div className="flex-grow w-full">
                    <ProgressBar currentStage={leadData.status} />
                </div>
                {!isComplete && (
                    <button
                        onClick={handleMarkComplete}
                        className="px-10 py-1 rounded-xl text-white font-bold shadow-lg transition duration-300 transform whitespace-nowrap
                            bg-blue-600 hover:bg-blue-700 hover:scale-105
                            focus:outline-none focus:ring-4 focus:ring-blue-300"
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
                                ? "text-blue-600  border-b-2 border-blue-600 bg-blue-50 cursor-pointer"
                                : "text-gray-600 hover:text-blue-600 cursor-pointer"
                        }`}
                    >
                        <Activity size={18} />
                       Activity
                    </button>
                    <button
                        onClick={() => setActiveTab("details")}
                        className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all duration-200 ${
                            activeTab === "details"
                                ? "text-blue-600 border-b-2 border-blue-600  bg-blue-50 cursor-pointer"
                                : "text-gray-600 hover:text-blue-600 cursor-pointer"
                        }`}
                    >
                        <FileText size={18} />
                        Opportunity Details
                    </button>
                </div>
            </div>

            {/* TAB CONTENT */}
            <div className="bg-white min-h-[300px] mt-0 rounded-b-2xl">
                {activeTab === "relate" ? (
                    <div className="space-y-6">
                        <div className="">
                             <ActivityButtons/>
                        </div>      
                    </div>
                ) : (
                    <OpportunitiesDetails leadData={leadData} />
                )}
            </div>
            <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 p-4 rounded-xl shadow-2xl transition-transform duration-500 ease-out z-50
                ${message ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
                bg-green-500 text-white flex items-center space-x-3`}>
                <CheckCircle size={20} />
                <span>{message}</span>
            </div>
        </div>
    );
}
