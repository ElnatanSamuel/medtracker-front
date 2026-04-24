export const ANALYZE_VITAL = {
  bloodSugar: (val) => {
    if (!val) return null;
    const n = parseFloat(val);
    if (n < 70)
      return { status: "Low", color: "text-blue-500", bg: "bg-blue-50" };
    if (n <= 140)
      return {
        status: "Normal",
        color: "text-emerald-500",
        bg: "bg-emerald-50",
      };
    if (n <= 199)
      return { status: "High", color: "text-orange-500", bg: "bg-orange-50" };
    return { status: "Very High", color: "text-rose-600", bg: "bg-rose-50" };
  },
  bloodPressure: (sys, dia) => {
    if (!sys || !dia) return null;
    if (sys < 90 || dia < 60)
      return { status: "Low", color: "text-blue-500", bg: "bg-blue-50" };
    if (sys <= 120 && dia <= 80)
      return {
        status: "Normal",
        color: "text-emerald-500",
        bg: "bg-emerald-50",
      };
    if (sys <= 129 && dia < 80)
      return {
        status: "Elevated",
        color: "text-orange-400",
        bg: "bg-orange-50",
      };
    if (sys <= 139 || dia <= 89)
      return {
        status: "Stage 1",
        color: "text-orange-600",
        bg: "bg-orange-50",
      };
    return { status: "Stage 2", color: "text-rose-600", bg: "bg-rose-50" };
  },
  temp: (val) => {
    if (!val) return null;
    if (val < 36.1)
      return { status: "Low", color: "text-blue-500", bg: "bg-blue-50" };
    if (val <= 37.2)
      return {
        status: "Normal",
        color: "text-emerald-500",
        bg: "bg-emerald-50",
      };
    if (val <= 38.3)
      return { status: "Fever", color: "text-orange-500", bg: "bg-orange-50" };
    return { status: "High Fever", color: "text-rose-600", bg: "bg-rose-50" };
  },
  oxygen: (val) => {
    if (!val) return null;
    if (val >= 95)
      return {
        status: "Normal",
        color: "text-emerald-500",
        bg: "bg-emerald-50",
      };
    if (val >= 90)
      return { status: "Low", color: "text-orange-500", bg: "bg-orange-50" };
    return { status: "Very Low", color: "text-rose-600", bg: "bg-rose-50" };
  },
  bpm: (val) => {
    if (!val) return null;
    if (val < 60)
      return { status: "Low", color: "text-blue-500", bg: "bg-blue-50" };
    if (val <= 100)
      return {
        status: "Normal",
        color: "text-emerald-500",
        bg: "bg-emerald-50",
      };
    return { status: "High", color: "text-rose-600", bg: "bg-rose-50" };
  },
  pi: (val) => {
    if (!val) return null;
    if (val < 1.1)
      return { status: "Low", color: "text-rose-500", bg: "bg-rose-50" };
    if (val <= 20)
      return {
        status: "Normal",
        color: "text-emerald-500",
        bg: "bg-emerald-50",
      };
    return { status: "High", color: "text-orange-500", bg: "bg-orange-50" };
  },
};
