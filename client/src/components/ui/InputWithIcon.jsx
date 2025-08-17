import React from "react";

const InputWithIcon = ({ placeholder, icon: Icon, type = "text", value, onChange }) => (
  <div className="relative">
    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
      <Icon className="w-4 h-4" />
    </span>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full border rounded px-3 py-2 pl-9 text-sm"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default InputWithIcon;
