import React from "react";
import useStore from "../store/useStore";
import MedicationCard from "./MedicationCard";

const getTimeLabel = (time) => {
  const map = {
    "00:00": "12 Morning",
    "06:00": "6 Morning",
    "12:00": "12 Afternoon",
    "18:00": "6 Night",
  };
  return map[time] || time;
};

const DailyView = () => {
  const { doses, loading, error } = useStore();

  if (loading && doses.length === 0)
    return (
      <div className="p-10 text-center text-slate-400">Loading schedule...</div>
    );
  if (error)
    return <div className="p-10 text-center text-red-500">{error}</div>;

  // Group doses by time
  const groups = doses.reduce((acc, dose) => {
    if (!acc[dose.scheduledTime]) acc[dose.scheduledTime] = [];
    acc[dose.scheduledTime].push(dose);
    return acc;
  }, {});

  const sortedTimes = Object.keys(groups).sort();

  return (
    <div className="space-y-8 pb-10">
      {sortedTimes.map((time) => (
        <section
          key={time}
          className="animate-in fade-in slide-in-from-bottom-2 duration-500"
        >
          <div className="flex items-center gap-3 mb-4 px-2">
            <span className="text-xl font-black text-slate-800 uppercase tracking-tight">
              {getTimeLabel(time)}
            </span>
            <div className="h-px flex-1 bg-slate-200"></div>
          </div>
          <div className="grid gap-4">
            {groups[time].map((dose) => (
              <MedicationCard key={dose._id} dose={dose} />
            ))}
          </div>
        </section>
      ))}
      {sortedTimes.length === 0 && !loading && (
        <div className="py-20 text-center">
          <p className="text-slate-400">No medications scheduled for today.</p>
        </div>
      )}
    </div>
  );
};

export default DailyView;
