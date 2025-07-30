import React, { useEffect, useState } from "react";
import axios from "axios";

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    const fetchOpportunities = async () => {
      const res = await axios.get("http://localhost:5000/api/opportunities");
      setOpportunities(res.data);
    };
    fetchOpportunities();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Opportunities</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Source</th>
            <th className="px-4 py-2 border">Stage</th>
            <th className="px-4 py-2 border">Requirement</th>
          </tr>
        </thead>
        <tbody>
          {opportunities.map((opp) => (
            <tr key={opp._id}>
              <td className="px-4 py-2 border">{opp.name}</td>
              <td className="px-4 py-2 border">{opp.source}</td>
              <td className="px-4 py-2 border">{opp.stage}</td>
              <td className="px-4 py-2 border">{opp.requirement}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Opportunities;
