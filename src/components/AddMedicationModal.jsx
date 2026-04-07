import React, { useState } from "react";
import useStore from "../store/useStore";
import { X, Plus, Clock } from "lucide-react";

const AddMedicationModal = ({ isOpen, onClose }) => {
  const { addMedication } = useStore();
  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    frequency: "once",
    times: ["08:00"],
    instructions: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addMedication(formData);
    onClose();
  };

  const addTime = () =>
    setFormData({ ...formData, times: [...formData.times, "08:00"] });
  const updateTime = (val, idx) => {
    const newTimes = [...formData.times];
    newTimes[idx] = val;
    setFormData({ ...formData, times: newTimes });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in transition-all duration-300">
      <div className="bg-white w-full max-w-lg rounded-t-[3rem] sm:rounded-[3rem] shadow-2xl p-8 pb-12 sm:pb-8 animate-in slide-in-from-bottom-20 duration-500">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black text-slate-800">New Medication</h2>
          <button
            onClick={onClose}
            className="p-2 bg-slate-100 rounded-full text-slate-400"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">
              Medicine Name
            </label>
            <input
              required
              className="w-full bg-slate-50 border-0 rounded-2xl px-5 py-4 text-slate-800 font-semibold focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
              placeholder="e.g. Panadol"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">
                Dosage
              </label>
              <input
                required
                className="w-full bg-slate-50 border-0 rounded-2xl px-5 py-4 text-slate-800 font-semibold focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="e.g. 1 pill"
                value={formData.dosage}
                onChange={(e) =>
                  setFormData({ ...formData, dosage: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">
                Frequency
              </label>
              <select
                className="w-full bg-slate-50 border-0 rounded-2xl px-5 py-4 text-slate-800 font-semibold focus:ring-2 focus:ring-indigo-500 outline-none appearance-none"
                value={formData.frequency}
                onChange={(e) =>
                  setFormData({ ...formData, frequency: e.target.value })
                }
              >
                <option value="once">Once Daily</option>
                <option value="twice">Twice Daily</option>
                <option value="custom">Custom</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">
              Schedule Times
            </label>
            <div className="space-y-3">
              {formData.times.map((time, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <div className="relative flex-1">
                    <Clock
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                    />
                    <input
                      type="time"
                      className="w-full bg-slate-50 border-0 rounded-2xl pl-12 pr-5 py-4 text-slate-800 font-semibold focus:ring-2 focus:ring-indigo-500 outline-none"
                      value={time}
                      onChange={(e) => updateTime(e.target.value, idx)}
                    />
                  </div>
                  {idx === formData.times.length - 1 && (
                    <button
                      type="button"
                      onClick={addTime}
                      className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl font-bold"
                    >
                      <Plus size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">
              Instructions
            </label>
            <input
              className="w-full bg-slate-50 border-0 rounded-2xl px-5 py-4 text-slate-800 font-semibold focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="e.g. Before food"
              value={formData.instructions}
              onChange={(e) =>
                setFormData({ ...formData, instructions: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-5 rounded-3xl shadow-xl shadow-indigo-200 mt-4 active:scale-95 transition-transform"
          >
            Save Medication
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMedicationModal;
