import React, { useState } from "react";
import useStore from "../store/useStore";
import { ChevronDown, ChevronUp, CheckCircle, Clock } from "lucide-react";
import { format, isToday, isYesterday } from "date-fns";

const DateAccordion = ({ date, doses, type }) => {
  const [isOpen, setIsOpen] = useState(isToday(new Date(date)));

  const getDateLabel = (d) => {
    const dt = new Date(d);
    if (isToday(dt)) return "Today";
    if (isYesterday(dt)) return "Yesterday";
    return format(dt, "EEEE, MMM do");
  };

  return (
    <div className="mb-4 bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left"
      >
        <div>
          <h3 className="text-lg font-bold text-slate-800">
            {getDateLabel(date)}
          </h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
            {doses.length} {type === "history" ? "completed" : "missed"}
          </p>
        </div>
        <div
          className={`p-2 rounded-xl transition-colors ${isOpen ? "bg-indigo-50 text-indigo-600" : "bg-slate-50 text-slate-400"}`}
        >
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      {isOpen && (
        <div className="px-6 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
          {doses.map((dose) => (
            <div
              key={dose._id}
              className="flex items-center justify-between py-3 border-t border-slate-50 first:border-0"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`h-8 w-8 rounded-xl flex items-center justify-center ${type === "history" ? "bg-emerald-50 text-emerald-500" : "bg-rose-50 text-rose-500"}`}
                >
                  {type === "history" ? (
                    <CheckCircle size={16} />
                  ) : (
                    <Clock size={16} />
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-700">
                    {dose.medicationId?.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-medium">
                    {type === "history"
                      ? `Taken at ${format(new Date(dose.takenAt), "HH:mm")}`
                      : `Scheduled for ${dose.scheduledTime}`}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-black text-slate-300 uppercase">
                {dose.scheduledTime}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DateAccordion;
