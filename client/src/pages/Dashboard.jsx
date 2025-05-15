import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [counts, setCounts] = useState({
    leadsCount: 0,
    contactsCount: 0,
    opportunitiesCount: 0,
    casesCount: 0,
    contractsCount: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/dashboard");
        setCounts(res.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      }
    };
    fetchCounts();
  }, []);

  const cardData = [
    { title: "Total Leads", count: counts.leadsCount, color: "bg-blue-500" },
    { title: "Total Contacts", count: counts.contactsCount, color: "bg-green-500" },
    { title: "Total Opportunities", count: counts.opportunitiesCount, color: "bg-yellow-500" },
    { title: "Total Cases", count: counts.casesCount, color: "bg-red-500" },
    { title: "Total Contracts", count: counts.contractsCount, color: "bg-purple-500" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {cardData.map(({ title, count, color }) => (
          <div key={title} className={`rounded-lg shadow-lg p-6 text-white ${color}`}>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-4xl font-bold">{count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
