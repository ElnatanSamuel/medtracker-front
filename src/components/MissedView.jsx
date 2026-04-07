import React from "react";
import useStore from "../store/useStore";
import DateAccordion from "./DateAccordion";

const MissedView = () => {
  const { historyDoses, loading } = useStore();

  const now = new Date();
  const missedDoses = historyDoses.filter((dose) => {
    const scheduledDate = new Date(`${dose.date}T${dose.scheduledTime}`);
    return !dose.taken && scheduledDate < now;
  });

  // Group by date
  const groups = missedDoses.reduce((acc, dose) => {
    if (!acc[dose.date]) acc[dose.date] = [];
    acc[dose.date].push(dose);
    return acc;
  }, {});

  const sortedDates = Object.keys(groups).sort(
    (a, b) => new Date(b) - new Date(a),
  );

  if (loading && historyDoses.length === 0) return null;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="px-2 mb-2">
        <h2 className="text-2xl font-black text-slate-800">Missed</h2>
        <p className="text-sm text-slate-400 font-medium">
          Review your missed doses
        </p>
      </div>

      <div>
        {sortedDates.map((date) => (
          <DateAccordion
            key={date}
            date={date}
            doses={groups[date]}
            type="missed"
          />
        ))}
        {sortedDates.length === 0 && !loading && (
          <div className="py-20 text-center bg-white rounded-[3rem] border border-slate-100 shadow-sm">
            <p className="text-emerald-500 font-bold uppercase tracking-widest text-xs">
              Well done! No missed meds found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MissedView;
