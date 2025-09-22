import React, { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";

export default function RightSideForm({ type, onClose, leadId }) {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState(""); 
  const [comments, setComments] = useState("");
  const [dueDate, setDueDate] = useState(""); 
  const [startDate, setStartDate] = useState(""); 
  const [startTime, setStartTime] = useState(""); 
  const [endDate, setEndDate] = useState(""); 
  const [endTime, setEndTime] = useState(""); 
  const [location, setLocation] = useState("");
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const getTitle = () => {
    switch (type) {
      case "call": return "Call History";
      case "task": return "New Task";
      case "meet": return "Meeting";
      default: return "";
    }
  };

  const combineToISO = (d, t) => {
    if (!d || !t) return null;
    const dt = new Date(`${d}T${t}`);
    return isNaN(dt.getTime()) ? null : dt.toISOString();
  };

  const handleSave = async () => {
    try {
      setErrorMsg("");
      setSaving(true);

      if (!subject.trim()) {
        setErrorMsg("Subject is required.");
        setSaving(false);
        return;
      }

      let payload = { type, subject, leadId };

      if (type === "task") {
        payload.description = description || "";
        payload.dueDate = dueDate ? new Date(`${dueDate}T00:00:00`).toISOString() : null;
      }

      if (type === "call") {
        payload.comments = comments || "";
      }

      if (type === "meet") {
        const startISO = combineToISO(startDate, startTime);
        const endISO = combineToISO(endDate, endTime);

        if (!startISO || !endISO) {
          setErrorMsg("Please provide both Start and End date & time.");
          setSaving(false);
          return;
        }
        if (new Date(endISO) <= new Date(startISO)) {
          setErrorMsg("End time must be greater than start time.");
          setSaving(false);
          return;
        }

        payload.description = description || "";
        payload.startDateTime = startISO;
        payload.endDateTime = endISO;
        payload.location = location || "";
      }

      const res = await axios.post("http://localhost:7000/api/activities", payload, {
                withCredentials: true,
              });
      console.log("Saved:", res.data);
      toast.success("Successfully Saved");
      setSaving(false);
      onClose?.();
    } catch (error) {
      console.error(error);
      const msg = error?.response?.data?.message || error?.message || "Failed to save activity.";
      setErrorMsg(msg);
      setSaving(false);
    }
  };

  return (
    <div className="fixed top-17 right-0 w-[380px] h-full bg-white rounded-lg shadow-xl z-50 overflow-y-auto border-l border-gray-300 transition-transform duration-300 translate-x-0">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700">{getTitle()}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 cursor-pointer">
          <X className="w-5 h-5" />
        </button>
      </div>

        <div className="p-4 space-y-5">
         <div>
           <label className="block text-xs font-semibold text-gray-600 mb-1">
             Subject
           </label>
           <input
             type="text"
             placeholder="Enter subject"
             className="w-full border rounded px-3 py-2 pr-1 text-sm"
             value={subject}
             onChange={(e) => setSubject(e.target.value)}
           />
         </div>

         {type === "task" && (
           <div>
             <label className="block text-xs font-semibold text-gray-600 mb-1">
               Description
             </label>
             <textarea
               className="w-full border rounded px-2 py-1 text-sm resize-none mb-2 h-24 align-top"
               placeholder="Add task details..."
               value={description}
               onChange={(e) => setDescription(e.target.value)}
             ></textarea>

             <label className="block text-xs font-semibold text-gray-600 mb-1">
               Due Date
             </label>
             <div className="relative">
               <input
                 type="date"
                 className="w-full border rounded px-3 py-2 pr-1 text-sm"
                 value={dueDate}
                 onChange={(e) => setDueDate(e.target.value)}
               />
             </div>
           </div>
         )}

         {type === "call" && (
           <div>
             <label className="block text-xs font-semibold text-gray-600 mb-1">
               Comments
             </label>
             <textarea
               className="w-full border rounded px-2 py-1 text-sm resize-none mb-2 h-24 align-top"
               placeholder="Add call details..."
               value={comments}
               onChange={(e) => setComments(e.target.value)}
             ></textarea>
           </div>
         )}

         {type === "meet" && (
           <div className="space-y-4">
             <div>
               <label className="block text-xs font-semibold text-gray-600 mb-1">
                 Description
               </label>
               <textarea
                 className="w-full border rounded px-2 py-1 text-sm resize-none mb-2 h-24 align-top"
                 placeholder="Add meeting details..."
                 value={description}
                 onChange={(e) => setDescription(e.target.value)}
               ></textarea>
             </div>

             {/* Start Date & Time */}
             <div className="grid grid-cols-2 gap-2">
               <div>
                 <label className="block text-xs font-semibold text-gray-600 mb-1">
                   Start Date
                 </label>
                 <input
                   type="date"
                   className="w-full border rounded px-3 py-2 text-sm"
                   value={startDate}
                   onChange={(e) => setStartDate(e.target.value)}
                 />
               </div>
               <div>
                 <label className="block text-xs font-semibold text-gray-600 mb-1">
                   Start Time
                 </label>
                 <input
                   type="time"
                   className="w-full border rounded px-3 py-2 text-sm"
                   value={startTime}
                   onChange={(e) => setStartTime(e.target.value)}
                 />
               </div>
             </div>

             {/* End Date & Time */}
             <div className="grid grid-cols-2 gap-2">
               <div>
                 <label className="block text-xs font-semibold text-gray-600 mb-1">
                   End Date
                 </label>
                 <input
                   type="date"
                   className="w-full border rounded px-3 py-2 text-sm"
                   value={endDate}
                   onChange={(e) => setEndDate(e.target.value)}
                 />
               </div>
               <div>
                 <label className="block text-xs font-semibold text-gray-600 mb-1">
                   End Time
                 </label>
                 <input
                   type="time"
                   className="w-full border rounded px-3 py-2 text-sm"
                   value={endTime}
                   onChange={(e) => setEndTime(e.target.value)}
                 />
               </div>
             </div>

             {/* Location */}
             <div>
               <label className="block text-xs font-semibold text-gray-600 mb-1">
                 Location / Link
               </label>
               <input
                 type="text"
                 className="w-full border rounded px-3 py-2 text-sm"
                 placeholder="Enter meeting location or Zoom/Meet link"
                 value={location}
                 onChange={(e) => setLocation(e.target.value)}
               />
             </div>
           </div>
         )}

         {/* Error message */}
         {errorMsg && (
           <div className="text-red-600 text-xs font-medium">{errorMsg}</div>
         )}
       </div>

      {/* Footer */}
      <div className="border-t p-4 flex justify-end bg-gray-50">
        <button
          onClick={handleSave}
          disabled={saving}
          className={`${saving ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"} bg-blue-600 text-white px-5 py-2 rounded`}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
