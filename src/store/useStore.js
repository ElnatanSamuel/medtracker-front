import { create } from "zustand";
import { MedicationAPI, DoseAPI, VitalAPI } from "../api";
import { format } from "date-fns";

const useStore = create((set, get) => ({
  medications: [],
  doses: [],
  selectedDate: format(new Date(), "yyyy-MM-dd"),
  currentTab: "schedule", // schedule, history, health
  historyDoses: [], // Range data
  vitals: [],
  loading: false,
  error: null,

  setTab: (tab) => {
    set({ currentTab: tab });
    if (tab === "history") {
      get().fetchHistory();
    } else if (tab === "health") {
      get().fetchVitals();
    } else {
      get().fetchDoses();
    }
  },

  fetchVitals: async () => {
    set({ loading: true });
    try {
      // Fetch last 14 days of health data
      const end = format(new Date(), "yyyy-MM-dd");
      const start = format(
        new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        "yyyy-MM-dd",
      );
      const res = await VitalAPI.getAll(start, end);
      set({ vitals: res.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  addVital: async (data) => {
    try {
      const res = await VitalAPI.create(data);
      set((state) => ({ vitals: [res.data, ...state.vitals] }));
      return res.data;
    } catch (err) {
      set({ error: err.message });
      throw err;
    }
  },

  fetchHistory: async () => {
    set({ loading: true });
    try {
      // Fetch last 7 days including today
      const end = format(new Date(), "yyyy-MM-dd");
      const start = format(
        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        "yyyy-MM-dd",
      );
      const res = await DoseAPI.getRange(start, end);
      set({ historyDoses: res.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  setSelectedDate: (date) => {
    set({ selectedDate: date });
    get().fetchDoses();
  },

  fetchMedications: async () => {
    try {
      const res = await MedicationAPI.getAll();
      set({ medications: res.data });
    } catch (err) {
      set({ error: err.message });
    }
  },

  fetchDoses: async () => {
    set({ loading: true });
    try {
      const res = await DoseAPI.getByDate(get().selectedDate);
      set({ doses: res.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  toggleDose: async (doseId) => {
    // Optimistic update
    const previousDoses = get().doses;
    const updatedDoses = previousDoses.map((d) =>
      d._id === doseId
        ? { ...d, taken: !d.taken, takenAt: !d.taken ? new Date() : null }
        : d,
    );
    set({ doses: updatedDoses });

    try {
      await DoseAPI.toggleTake(doseId);
    } catch (err) {
      // Rollback on error
      set({ doses: previousDoses, error: "Failed to update dose" });
    }
  },

  addMedication: async (medData) => {
    try {
      const res = await MedicationAPI.create(medData);
      set((state) => ({ medications: [...state.medications, res.data] }));
      get().fetchDoses(); // Refresh doses for current date
    } catch (err) {
      set({ error: err.message });
    }
  },
}));

export default useStore;
