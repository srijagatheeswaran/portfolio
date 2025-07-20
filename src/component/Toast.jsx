import React, { useEffect, useState } from "react";

export default function Toast({ message, type, onClose }) {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => handleClose(), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => onClose(), 400);
  };

  return (
    <div
      className={`fixed top-5 right-5 z-50 px-6 py-4 rounded-lg shadow-lg text-white text-sm font-medium flex items-center gap-3
        ${closing ? "animate-slide-out" : "animate-slide-in"}
        ${type === "success" ? "bg-gray-800 border-l-4 border-green-500" : "bg-gray-800 border-l-4 border-red-500"}`}
    >
      <div>{type === "success" ? "✔" : "✖"}</div>
      <div>{message}</div>
      <button onClick={handleClose} className="ml-4 text-gray-400 hover:text-white text-lg">
        &times;
      </button>
    </div>
  );
}
