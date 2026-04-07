import React, { useEffect, useState } from "react";
import useStore from "./store/useStore";
import DailyView from "./components/DailyView";
import { Pill, Plus, Calendar, CheckCircle, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import AddMedicationModal from "./components/AddMedicationModal";
import LoadingScreen from "./components/LoadingScreen";
import HistoryView from "./components/HistoryView";
import MissedView from "./components/MissedView";

function App() {
  const {
    fetchDoses,
    fetchMedications,
    selectedDate,
    setSelectedDate,
    currentTab,
    setTab,
    loading,
  } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchMedications();
    fetchDoses();
  }, [fetchMedications, fetchDoses]);

  const renderContent = () => {
    if (loading && currentTab !== "schedule") return <LoadingScreen />;
    switch (currentTab) {
      case "history":
        return <HistoryView />;
      case "missed":
        return <MissedView />;
      default:
        return loading ? <LoadingScreen /> : <DailyView />;
    }
  };

  return (
    <div className="min-h-screen pb-32 max-w-lg mx-auto bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/70 backdrop-blur-md px-6 py-6 flex items-center justify-between border-b border-slate-100">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            SamiTracker
          </h1>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
            {format(new Date(selectedDate), "EEEE, MMMM do")}
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-3 bg-indigo-600 text-white rounded-2xl shadow-indigo-200 shadow-xl tappable"
        >
          <Plus size={24} strokeWidth={3} />
        </button>
      </header>

      <AddMedicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <main className="px-4 mt-6">{renderContent()}</main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-6 inset-x-6 h-20 bg-slate-900 rounded-[2.5rem] shadow-2xl flex items-center justify-around px-2 z-30 max-w-md mx-auto">
        <button
          onClick={() => setTab("schedule")}
          className={`flex flex-col items-center gap-1.5 px-4 py-2 transition-all duration-300 ${currentTab === "schedule" ? "text-white" : "text-slate-500 hover:text-slate-300"}`}
        >
          <Calendar
            size={20}
            className={currentTab === "schedule" ? "scale-110" : ""}
          />
          <span className="text-[9px] font-black uppercase tracking-widest">
            Schedule
          </span>
        </button>
        <button
          onClick={() => setTab("history")}
          className={`flex flex-col items-center gap-1.5 px-4 py-2 transition-all duration-300 ${currentTab === "history" ? "text-white" : "text-slate-500 hover:text-slate-300"}`}
        >
          <CheckCircle
            size={20}
            className={currentTab === "history" ? "scale-110" : ""}
          />
          <span className="text-[9px] font-black uppercase tracking-widest">
            History
          </span>
        </button>
        <button
          onClick={() => setTab("missed")}
          className={`flex flex-col items-center gap-1.5 px-4 py-2 transition-all duration-300 ${currentTab === "missed" ? "text-rose-400" : "text-slate-500 hover:text-slate-300"}`}
        >
          <AlertCircle
            size={20}
            className={currentTab === "missed" ? "scale-110" : ""}
          />
          <span className="text-[9px] font-black uppercase tracking-widest">
            Missed
          </span>
        </button>
      </nav>
    </div>
  );
}

export default App;
