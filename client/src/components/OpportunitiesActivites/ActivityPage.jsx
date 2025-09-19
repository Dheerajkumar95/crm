import React, { useState, useEffect } from "react";
import axios from "axios";
import { Phone, Calendar,Mail, ClipboardList, Trash2 } from "lucide-react";
import TimelineItem from "./TimelineItem";
import RightSideForm from "./RightSideForm";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function ActivityPage() {
  const {id } = useParams();
  const [activities, setActivities] = useState([]);
  const [activeForm, setActiveForm] = useState(null);
  const Id=id;
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await axios.get(`http://localhost:7000/api/opportunitiesactivities/${Id}`);
        setActivities(res.data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };
    fetchActivities();
  }, [Id]);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/api/opportunitiesactivities/${id}`);
      setActivities(activities.filter((a) => a._id !== id));
      toast.success("Activity deleted!");
    } catch (error) {
      toast.error("Error deleting activity");
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "call":
        return Phone;
      case "task":
        return ClipboardList;
      case "meet":
        return Calendar;
      default:
        return ClipboardList;
    }
  };
  const meetings = activities.filter((a) => a.type === "meet"); 
  const callsTasks = activities.filter((a) => a.type !== "meet"); 

  return (
    <div >
      <div></div>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveForm("call")}
          className="flex items-center gap-2 px-3 py-2 border rounded hover:bg-gray-100"
        >
          <Phone className="w-4 h-4 text-green-500" />
          <span className="text-sm font-medium">Call</span>
        </button>
        <button
          onClick={() => setActiveForm("task")}
          className="flex items-center gap-2 px-3 py-2 border rounded hover:bg-gray-100"
        >
          <ClipboardList className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium">Task</span>
        </button>
        <button
          onClick={() => setActiveForm("meet")}
          className="flex items-center gap-2 px-3 py-2 border rounded hover:bg-gray-100"
        >
          <Calendar className="w-4 h-4 text-purple-500" />
          <span className="text-sm font-medium">Meeting</span>
        </button>
        <button
          onClick={() => setActiveForm("mail")}
          className="flex items-center gap-2 px-3 py-2 border rounded hover:bg-gray-100"
        >
          <Mail className="w-4 h-4 text-teal-600" />
          <span className="text-sm font-medium">Mail</span>
        </button>
      </div>

      {/* Upcoming & Overdue Meetings */}
      {meetings.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between bg-gray-100 px-10 py-2 font-semibold text-gray-700 rounded">
            <span>Upcoming & Overdue</span>
          </div>
          {meetings.map((activity) => (
            <div key={activity._id} className="flex items-center justify-between">
              <TimelineItem
                icon={getIcon("meet")}
                iconColor="text-purple-600 border-purple-600"
                title={activity.subject || "Meeting"}
                description={activity.description || activity.comments}
                time={new Date(activity.createdAt).toLocaleString()}
                dueDate={
                  activity.dueDate
                    ? new Date(activity.dueDate).toLocaleDateString()
                    : null
                }
                createdDate={new Date(activity.createdAt).toLocaleDateString()}
                createdBy={activity.user?.username || "Unknown User"}
                startDateTime={activity.startDateTime}
                endDateTime={activity.endDateTime}
                location={activity.location}
                type={activity.type}
              />
              <button
                onClick={() => handleDelete(activity._id)}
                className=" bg-white p-5 text-red-500 hover:text-red-700 cursor-pointer"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Calls + Tasks */}
      {callsTasks.length > 0 && (
        <div>
          <div className="flex justify-between bg-gray-100 px-3 py-2 font-semibold text-gray-700 rounded">
            <span>
              {new Date().toLocaleString("default", { month: "long" })} •{" "}
              {new Date().getFullYear()}
            </span>
          </div>
          {callsTasks.map((activity) => (
            <div key={activity._id} className="flex items-center justify-between">
              <TimelineItem
                icon={getIcon(activity.type)}
                iconColor={
                  activity.type === "call"
                    ? "text-green-600 border-green-600"
                    : "text-blue-600 border-blue-600"
                }
                title={activity.subject || activity.type}
                description={activity.description || activity.comments}
                time={new Date(activity.createdAt).toLocaleString()}
                dueDate={
                  activity.dueDate
                    ? new Date(activity.dueDate).toLocaleDateString()
                    : null
                }
                createdDate={new Date(activity.createdAt).toLocaleDateString()}
                createdBy={activity.user?.username || "Unknown User"}
                startDateTime={activity.startDateTime}
                endDateTime={activity.endDateTime}
                location={activity.location}
                type={activity.type}
              />
              <button
                onClick={() => handleDelete(activity._id)}
                className="text-red-500 hover:text-red-700 cursor-pointer"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Slide-in Form */}
      {activeForm && (
        <RightSideForm type={activeForm} onClose={() => setActiveForm(null)} />
      )}
    </div>
  );
}
