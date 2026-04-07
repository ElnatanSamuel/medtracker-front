import React from "react";
import useStore from "../store/useStore";
import { Check, Clock, AlertCircle } from "lucide-react";
import { format } from "date-fns";

const MedicationCard = ({ dose }) => {
  const { toggleDose } = useStore();
  const med = dose.medicationId;

  if (!med) return null;

  const isTaken = dose.taken;
  const scheduledDate = new Date(`${dose.date}T${dose.scheduledTime}`);
  const now = new Date();
  const isMissed = !isTaken && scheduledDate < now;

  return (
    <div
      onClick={() => toggleDose(dose._id)}
      className={`relative overflow-hidden group transition-all duration-300 rounded-3xl p-5 border-2 tappable
        ${
          isTaken
            ? "bg-emerald-50 border-emerald-500/20"
            : isMissed
              ? "bg-rose-50 border-rose-500/20"
              : "bg-white border-slate-100 shadow-sm"
        }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3
              className={`text-lg font-bold ${isTaken ? "text-emerald-900 line-through opacity-60" : "text-slate-800"}`}
            >
              {med.name}
            </h3>
            {isMissed && (
              <AlertCircle size={16} className="text-rose-500 animate-pulse" />
            )}
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider
               ${isTaken ? "bg-emerald-200 text-emerald-800" : "bg-slate-100 text-slate-500"}`}
            >
              {med.dosage}
            </span>
            {med.instructions && (
              <span className="text-xs font-medium text-slate-400 italic">
                {med.instructions}
              </span>
            )}
          </div>
        </div>

        <div
          className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-500 border-2
          ${
            isTaken
              ? "bg-emerald-500 border-emerald-500 scale-110"
              : "bg-white border-slate-200 group-active:border-indigo-500"
          }`}
        >
          {isTaken && (
            <Check className="text-white" size={24} strokeWidth={4} />
          )}
        </div>
      </div>

      {isTaken && dose.takenAt && (
        <div className="mt-3 flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
          <Clock size={10} />
          Taken at {format(new Date(dose.takenAt), "HH:mm")}
        </div>
      )}
    </div>
  );
};

export default MedicationCard;
