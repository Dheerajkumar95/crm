import React from "react";

 
const OverviewCardItem = ({ label, count, percent, color }) => {
   
  const displayPercent =
    percent !== undefined ? `${percent.toFixed(2)}%` : "0.00%";
  const hasProgress = percent !== undefined && percent > 0;

  return (
    <div className="mb-2">  
      <div className="flex justify-between text-sm">
        
        <span className={`${"text-gray-700"}`}>{`${count} ${label}`}</span>
        <span className="text-gray-500">{displayPercent}</span>
      </div>
      {hasProgress && (
        <div className="w-full bg-gray-200 h-1 rounded-full mt-1 overflow-hidden">  
          <div
            className={`${color || "bg-green-500"} h-full rounded-full`}  
            style={{ width: `${percent}%` }}
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
      )}
    </div>
  );
};

// Helper component for the main overview cards (Invoice, Estimate, Proposal)
const OverviewCard = ({ title, data }) => (
  <div className="bg-white p-4 shadow rounded-lg h-full"> {/* Card styling: white background, padding, shadow, rounded corners */}
    <h2 className="font-semibold text-lg mb-3 text-gray-800">{title}</h2> {/* Title styling */}
    {data.map((item, i) => (
      <OverviewCardItem key={i} {...item} />
    ))}
  </div>
);

const Dashboard = () => {
  // Data for the top stat cards
  const stats = [
    { title: "Invoices Awaiting Payment", count: "0 / 0", icon: "💵", hasBorder: true },
    { title: "Converted Leads", count: "3 / 3", progress: 100, icon: "📈" },
    { title: "Projects In Progress", count: "0 / 0", icon: "🛠️" },
    { title: "Tasks Not Finished", count: "2 / 2", progress: 100, icon: "📝", hasBorder: true },
  ];

  // Data for the overview sections (Invoice, Estimate, Proposal)
  const overviewData = {
    invoice: [
      { label: "Draft", count: 1, percent: 100.00,color:"bg-gray-500"},  
      { label: "Not Sent", count: 1, percent: 100.00, },  
      { label: "Unpaid", count: 0, percent: 0.00, color: "text-red-500" },  
      { label: "Partially Paid", count: 0, percent: 0.00, color: "text-yellow-500" },  
      { label: "Overdue", count: 0, percent: 0.00, color: "text-orange-600" }, 
      { label: "Paid", count: 0, percent: 0.00, color: "text-green-500" },  
    ],
    estimate: [
      { label: "Draft", count: 0, percent: 0.00 },  
      { label: "Not Sent", count: 0, percent: 0.00 },
      { label: "Sent", count: 0, percent: 0.00 },
      { label: "Expired", count: 0, percent: 0.00 },
      { label: "Declined", count: 0, percent: 0.00 },
      { label: "Accepted", count: 1, percent: 100.00 },
    ],
    proposal: [
      { label: "Draft", count: 0, percent: 0.00 },
      { label: "Sent", count: 0, percent: 0.00 },
      { label: "Open", count: 0, percent: 0.00 },
      { label: "Revised", count: 0, percent: 0.00 },
      { label: "Declined", count: 0, percent: 0.00 },
      { label: "Accepted", count: 1, percent: 100.00,   }, 
    ],
  };

  // Data for the invoice summary at the bottom
  const invoiceSummary = [
    { label: "Outstanding Invoices", value: "$0.00", color: "text-yellow-600" },
    { label: "Past Due Invoices", value: "$0.00", color: "text-red-500" },
    { label: "Paid Invoices", value: "$0.00", color: "text-green-500" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans">  
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-white shadow rounded-lg p-4 flex flex-col ${
              stat.hasBorder ? "border border-gray-200" : ""
            }`}
          >
          <div className="flex items-center justify-between">
            <span className="text-1xl flex items-center gap-2">
              {stat.icon}
              <span className="text-gray-500 text-sm font-medium">{stat.title}</span>
            </span>
            <span className="text-sm font-semibold text-gray-900">{stat.count}</span>
          </div>
            {stat.progress !== undefined && (
              <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2">
                <div
                  className="bg-green-500 h-full rounded-full"  
                  style={{ width: `${stat.progress}%` }}
                  role="progressbar"
                  aria-valuenow={stat.progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Overview Sections (Invoice, Estimate, Proposal) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"> {/* Grid layout for overview cards */}
        <OverviewCard title="Invoice overview" data={overviewData.invoice} />
        <OverviewCard title="Estimate overview" data={overviewData.estimate} />
        <OverviewCard title="Proposal overview" data={overviewData.proposal} />
      </div>

      {/* Invoice Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">  
        {invoiceSummary.map((item, index) => (
          <div key={index} className="bg-white p-4 shadow rounded-lg text-center">
            <div className={`text-sm font-semibold mb-1 ${item.color}`}>
              {item.label}
            </div>
            <div className="text-xl font-bold text-gray-900">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
