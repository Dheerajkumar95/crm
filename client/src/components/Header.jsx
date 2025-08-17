import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaUser } from "react-icons/fa";
import axios from "axios";

const Header = ({ setSidebarOpen }) => {
  const [user, setUser] = useState(null);
  const [userPopupOpen, setUserPopupOpen] = useState(false);
  const popupRef = useRef(null);

  // Fetch user data from API
  useEffect(() => {
    axios.get("http://localhost:7000/api/auth/profile", { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(err => console.error(err));
  }, []);

  // Close popup if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setUserPopupOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow px-6 py-4 flex items-center justify-between sticky top-0 z-20 h-16 relative">
      {/* Sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(prev => !prev)}
        className="text-[#01080d] focus:outline-none cursor-pointer hover:text-[#1e2b34] transition duration-200"
      >
        <FaBars size={20} />
      </button>

      <h1 className="text-xl font-bold text-[#060000]">SalesTruff</h1>

      {/* User Icon + Popup */}
      <div className="relative" ref={popupRef}>
        <div
          onClick={() => setUserPopupOpen(prev => !prev)}
          className="text-sm text-gray-500 cursor-pointer hover:text-gray-700"
        >
          <FaUser size={20} />
        </div>

        {userPopupOpen && user && (
          <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
            <p className="font-semibold">{user.username}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
