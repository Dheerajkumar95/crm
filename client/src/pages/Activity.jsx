import { Phone, ListChecks, CalendarDays, Mail, ChevronDown } from 'lucide-react';

export default function ActivityButtons() {
  const buttons = [
    {
      label: "Log a Call",
      icon: <Phone size={12} />,
      color: "bg-teal-500",
    },
    {
      label: "New Task",
      icon: <ListChecks size={12} />,
      color: "bg-green-600",
    },
    {
      label: "New Event",
      icon: <CalendarDays size={12} />,
      color: "bg-purple-500",
    },
    {
      label: "Email",
      icon: <Mail size={12} />,
      color: "bg-gray-500",
    },
  ];

  return (
    <div className="flex gap-2 p-4">
      {buttons.map((btn, index) => (
        <div key={index} className="flex border rounded-md overflow-hidden">
          <button className="flex items-center gap-1 px-3 py-1">
            <span className={`p-1 rounded ${btn.color} text-white`}>
              {btn.icon}
            </span>
            <span className="text-blue-600 font-medium">{btn.label}</span>
          </button>
          <button className="border-l px-2 flex items-center justify-center">
            <ChevronDown size={16} className="text-gray-500" />
          </button>
        </div>
      ))}
    </div>
  );
}
