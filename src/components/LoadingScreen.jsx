import React from "react";

const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-700">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-indigo-100 rounded-full"></div>
        <div className="absolute top-0 w-16 h-16 border-4 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
      <p className="mt-6 text-slate-400 font-bold uppercase tracking-widest text-xs animate-pulse">
        Fetching Schedule...
      </p>
    </div>
  );
};

export default LoadingScreen;
