import React from "react";
import useStore from "../store/useStore";
import DateAccordion from "./DateAccordion";

const HistoryView = () => {
  const { historyDoses, loading } = useStore();

  const takenDoses = historyDoses.filter((dose) => dose.taken);

  // Group by date
  const groups = takenDoses.reduce((acc, dose) => {
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
        <h2 className="text-2xl font-black text-slate-800">History</h2>
        <p className="text-sm text-slate-400 font-medium">
          Record of all taken medications
        </p>
      </div>

      <div>
        {sortedDates.map((date) => (
          <DateAccordion
            key={date}
            date={date}
            doses={groups[date]}
            type="history"
          />
        ))}
        {sortedDates.length === 0 && !loading && (
          <div className="py-20 text-center">
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
              No history found for the last 7 days.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryView;
