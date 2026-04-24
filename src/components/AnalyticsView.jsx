import React from "react";
import useStore from "../store/useStore";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  LabelList,
} from "recharts";
import { format, parseISO } from "date-fns";
import {
  TrendingUp,
  Activity,
  Droplets,
  Thermometer,
  Heart,
  Wind,
} from "lucide-react";

const AnalyticsView = () => {
  const { vitals, loading } = useStore();

  const chartData = [...vitals].reverse().map((v) => ({
    ...v,
    displayDate: format(parseISO(v.date), "MMM d"),
    bloodSugarVal: parseFloat(v.bloodSugar) || 0,
    bpSys: v.bloodPressure?.systolic || 0,
    bpDia: v.bloodPressure?.diastolic || 0,
    tempVal: v.temp || 0,
    oxygenVal: v.oxygen || 0,
    bpmVal: v.bpm || 0,
    piVal: v.pi || 0,
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/90 backdrop-blur-md p-4 rounded-3xl border border-slate-700 shadow-2xl">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
            {label}
          </p>
          {payload.map((p, i) => (
            <div key={i} className="flex items-center gap-2 mb-1">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: p.color }}
              ></div>
              <span className="text-xs font-bold text-white">
                {p.name}: {p.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const ChartSection = ({
    title,
    icon: Icon,
    data,
    dataKey,
    color,
    colorDark,
    unit,
  }) => (
    <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl bg-slate-50 ${color}`}>
            <Icon size={18} />
          </div>
          <h3 className="font-black text-slate-800 tracking-tight">{title}</h3>
        </div>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Last 14 Days
        </span>
      </div>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 20, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id={`color${dataKey}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={colorDark} stopOpacity={0.1} />
                <stop offset="95%" stopColor={colorDark} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />
            <XAxis
              dataKey="displayDate"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fontWeight: 700, fill: "#94a3b8" }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fontWeight: 700, fill: "#cbd5e1" }}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={colorDark}
              strokeWidth={3}
              fillOpacity={1}
              fill={`url(#color${dataKey})`}
              dot={{ r: 4, fill: "white", stroke: colorDark, strokeWidth: 2 }}
              activeDot={{
                r: 6,
                fill: colorDark,
                stroke: "white",
                strokeWidth: 2,
              }}
            >
              <LabelList
                dataKey={dataKey}
                position="top"
                offset={10}
                style={{ fontSize: "10px", fontWeight: "900", fill: colorDark }}
              />
            </Area>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="px-2">
        <h2 className="text-2xl font-black text-slate-800">Health Analytics</h2>
        <p className="text-sm text-slate-400 font-medium">
          Trends and patterns
        </p>
      </div>

      {loading && vitals.length === 0 ? (
        <div className="py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">
          Loading analytics...
        </div>
      ) : (
        <div className="grid gap-6">
          <ChartSection
            title="Blood Sugar"
            icon={Droplets}
            data={chartData}
            dataKey="bloodSugarVal"
            color="text-rose-400"
            colorDark="#fb7185"
            unit="mg/dL"
          />
          <ChartSection
            title="Oxygen Saturation"
            icon={Wind}
            data={chartData}
            dataKey="oxygenVal"
            color="text-blue-400"
            colorDark="#60a5fa"
            unit="%"
          />
          <ChartSection
            title="Heart Rate"
            icon={Heart}
            data={chartData}
            dataKey="bpmVal"
            color="text-rose-600"
            colorDark="#e11d48"
            unit="bpm"
          />
          <ChartSection
            title="Perfusion Index (PI)"
            icon={Activity}
            data={chartData}
            dataKey="piVal"
            color="text-purple-400"
            colorDark="#c084fc"
            unit="%"
          />
          <ChartSection
            title="Body Temp"
            icon={Thermometer}
            data={chartData}
            dataKey="tempVal"
            color="text-orange-400"
            colorDark="#fb923c"
            unit="°C"
          />
        </div>
      )}

      {vitals.length === 0 && !loading && (
        <div className="py-20 text-center bg-white rounded-[3rem] border border-slate-100 shadow-sm mx-2">
          <TrendingUp size={32} className="mx-auto text-slate-200 mb-4" />
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
            Not enough data for analytics yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default AnalyticsView;
