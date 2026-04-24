import React, { useState } from "react";
import useStore from "../store/useStore";
import { X, Activity, Thermometer, Droplets, Heart, Wind } from "lucide-react";
import { format } from "date-fns";

const AddVitalModal = ({ isOpen, onClose }) => {
  const { addVital } = useStore();
  const [formData, setFormData] = useState({
    bloodSugar: "",
    systolic: "",
    diastolic: "",
    temp: "",
    oxygen: "",
    bpm: "",
    pi: "",
    note: "",
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const now = new Date();
      const payload = {
        date: format(now, "yyyy-MM-dd"),
        time: format(now, "HH:mm"),
      };

      if (formData.bloodSugar) payload.bloodSugar = formData.bloodSugar;
      if (formData.temp) payload.temp = Number(formData.temp);
      if (formData.oxygen) payload.oxygen = Number(formData.oxygen);
      if (formData.bpm) payload.bpm = Number(formData.bpm);
      if (formData.pi) payload.pi = Number(formData.pi);
      if (formData.note) payload.note = formData.note;

      if (formData.systolic || formData.diastolic) {
        payload.bloodPressure = {};
        if (formData.systolic)
          payload.bloodPressure.systolic = Number(formData.systolic);
        if (formData.diastolic)
          payload.bloodPressure.diastolic = Number(formData.diastolic);
      }

      // Check if at least one vital was entered
      if (Object.keys(payload).length <= 2) {
        // Only date/time present
        console.warn("No vitals entered");
        setLoading(false);
        return;
      }

      await addVital(payload);
      onClose();
      setFormData({
        bloodSugar: "",
        systolic: "",
        diastolic: "",
        temp: "",
        oxygen: "",
        bpm: "",
        pi: "",
        note: "",
      });
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-slate-50 border-none rounded-2xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 transition-all font-medium mb-1";
  const labelClass =
    "text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block";

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
        <div className="px-8 pt-8 pb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
              Track Vitals
            </h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
              Daily Health Stats
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={24} className="text-slate-400" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="px-8 pb-8 space-y-4 overflow-y-auto max-h-[70vh] no-scrollbar"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Blood Sugar</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. 120"
                  className={inputClass}
                  value={formData.bloodSugar}
                  onChange={(e) =>
                    setFormData({ ...formData, bloodSugar: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Body Temp (°C)</label>
              <div className="relative">
                <input
                  type="text"
                  step="0.1"
                  placeholder="e.g. 36.5"
                  className={inputClass}
                  value={formData.temp}
                  onChange={(e) =>
                    setFormData({ ...formData, temp: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div>
            <label className={labelClass}>
              Blood Pressure (Systolic / Diastolic)
            </label>
            <div className="flex gap-3 items-center">
              <input
                type="text"
                placeholder="Sys"
                className={inputClass}
                value={formData.systolic}
                onChange={(e) =>
                  setFormData({ ...formData, systolic: e.target.value })
                }
              />
              <span className="text-slate-300 text-xl font-light mb-1">/</span>
              <input
                type="text"
                placeholder="Dia"
                className={inputClass}
                value={formData.diastolic}
                onChange={(e) =>
                  setFormData({ ...formData, diastolic: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Oxygen (SpO2 %)</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="98"
                  className={inputClass}
                  value={formData.oxygen}
                  onChange={(e) =>
                    setFormData({ ...formData, oxygen: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Heart Rate (BPM)</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="72"
                  className={inputClass}
                  value={formData.bpm}
                  onChange={(e) =>
                    setFormData({ ...formData, bpm: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Perfusion Index (PI %)</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. 2.0"
                  className={inputClass}
                  value={formData.pi}
                  onChange={(e) =>
                    setFormData({ ...formData, pi: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* <div>
            <label className={labelClass}>Note (Optional)</label>
            <textarea
              placeholder="How are you feeling?"
              className={`${inputClass} resize-none h-20`}
              value={formData.note}
              onChange={(e) =>
                setFormData({ ...formData, note: e.target.value })
              }
            ></textarea>
          </div> */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white font-black uppercase tracking-widest text-sm py-4 rounded-3xl shadow-xl shadow-slate-200 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 mt-4"
          >
            {loading ? "Saving..." : "Save Vitals"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVitalModal;
