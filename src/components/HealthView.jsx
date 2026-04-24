import React, { useState } from "react";
import useStore from "../store/useStore";
import { format, parseISO } from "date-fns";
import {
  Activity,
  Droplets,
  Thermometer,
  Heart,
  Wind,
  Plus,
  History as HistoryIcon,
  AlertTriangle,
  CheckCircle as CheckIcon,
} from "lucide-react";
import AddVitalModal from "./AddVitalModal";
import { ANALYZE_VITAL } from "../utils/healthUtils";

const HealthView = () => {
  const { vitals, loading } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Group vitals by date
  const groups = vitals.reduce((acc, vital) => {
    if (!acc[vital.date]) acc[vital.date] = [];
    acc[vital.date].push(vital);
    return acc;
  }, {});

  const sortedDates = Object.keys(groups).sort(
    (a, b) => new Date(b) - new Date(a),
  );

  const StatIcon = ({ icon: Icon, value, label, type, sys, dia }) => {
    const analysis =
      type === "bp"
        ? ANALYZE_VITAL.bloodPressure(sys, dia)
        : ANALYZE_VITAL[type](value);
    const isNormal = analysis?.status === "Normal";

    return (
      <div
        className={`flex flex-col items-center p-3 rounded-2xl flex-1 min-w-[80px] transition-all ${analysis?.bg || "bg-slate-50"}`}
      >
        <div className="flex items-center gap-1">
          <Icon size={12} className={analysis?.color || "text-slate-400"} />
          {analysis && !isNormal && (
            <AlertTriangle size={10} className="text-rose-500 animate-pulse" />
          )}
        </div>
        <span className="text-sm font-black text-slate-800 mt-1">
          {value || "--"}
        </span>
        <span className="text-[7px] font-black text-slate-400 uppercase tracking-tighter text-center">
          {label}
        </span>
        {analysis && (
          <span
            className={`text-[7px] font-black uppercase mt-1 ${analysis.color}`}
          >
            {analysis.status}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between px-2">
        <div>
          <h2 className="text-2xl font-black text-slate-800">Health Tracker</h2>
          <p className="text-sm text-slate-400 font-medium">
            Monitoring vitals & stats
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-3 bg-emerald-500 text-white rounded-2xl shadow-emerald-100 shadow-xl tappable"
        >
          <Plus size={20} strokeWidth={3} />
        </button>
      </div>

      <div className="space-y-8">
        {sortedDates.map((date) => (
          <div key={date} className="space-y-4">
            <div className="flex items-center gap-3 px-2">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                {format(parseISO(date), "EEEE, MMM do")}
              </span>
              <div className="h-px flex-1 bg-slate-100"></div>
            </div>

            <div className="grid gap-4">
              {groups[date].map((record) => (
                <div
                  key={record._id}
                  className="bg-white border border-slate-100 rounded-[2rem] p-5 shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse"></div>
                      <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">
                        Recorded at {record.time}
                      </span>
                    </div>
                    {record.note && (
                      <span className="text-[9px] font-bold text-slate-400 truncate max-w-[150px]">
                        "{record.note}"
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <StatIcon
                      icon={Droplets}
                      value={record.bloodSugar}
                      label="Sugar"
                      type="bloodSugar"
                    />
                    <StatIcon
                      icon={Activity}
                      value={
                        record.bloodPressure?.systolic
                          ? `${record.bloodPressure.systolic}/${record.bloodPressure.diastolic}`
                          : null
                      }
                      label="BP"
                      type="bp"
                      sys={record.bloodPressure?.systolic}
                      dia={record.bloodPressure?.diastolic}
                    />
                    <StatIcon
                      icon={Thermometer}
                      value={record.temp}
                      label="Temp"
                      type="temp"
                    />
                    <StatIcon
                      icon={Wind}
                      value={record.oxygen}
                      label="SpO2 %"
                      type="oxygen"
                    />
                    <StatIcon
                      icon={Heart}
                      value={record.bpm}
                      label="BPM"
                      type="bpm"
                    />
                    <StatIcon
                      icon={Activity}
                      value={record.pi}
                      label="PI %"
                      type="pi"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {sortedDates.length === 0 && !loading && (
        <div className="py-20 text-center bg-white rounded-[3rem] border border-slate-100 shadow-sm mx-2">
          <HistoryIcon size={32} className="mx-auto text-slate-200 mb-4" />
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
            No records found yet.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 text-emerald-500 text-xs font-black uppercase tracking-widest"
          >
            Add first record
          </button>
        </div>
      )}

      <AddVitalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default HealthView;
