import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function TimelineItem({ 
  icon: Icon, 
  iconColor, 
  title, 
  description, 
  time,  
  dueDate, 
  createdBy,
  startDateTime,
  endDateTime,
  location,
  type
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" w-full p-3 mb-3 bg-white">
      {/* Title Row */}
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center gap-2">
          <Icon className={`w-6 h-6 ${iconColor} border rounded-full p-1`} />
          <span className="font-semibold text-gray-800">{title}</span>
        </div>
      </div>

      {isOpen && (
        <div className="mt-3 text-sm text-gray-600 space-y-1 pt-2">
          <p><span className="font-medium">Type:</span> {type}</p>
          {description && <p><span className="font-medium">Description:</span> {description}</p>}
          {dueDate && <p><span className="font-medium">Due Date:</span> {dueDate}</p>}
          {startDateTime && <p><span className="font-medium">Start:</span> {new Date(startDateTime).toLocaleString()}</p>}
          {endDateTime && <p><span className="font-medium">End:</span> {new Date(endDateTime).toLocaleString()}</p>}
          {location && <p><span className="font-medium">Location/Link:</span> {location}</p>}
          <p><span className="font-medium">Created By:</span> {createdBy}</p>
          <p><span className="font-medium">Created Date:</span> {time}</p>
        </div>
      )}
    </div>
  );
}
