import React from "react";
import { 
  Users, 
  UserPlus, 
  ClipboardCheck, 
  ShieldCheck, 
  TrendingUp, 
  AlertCircle 
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    { name: "Total Employees", value: "286", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { name: "Open Positions", value: "12", icon: UserPlus, color: "text-indigo-600", bg: "bg-indigo-50" },
    { name: "Onboarding", value: "8", icon: ClipboardCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
    { name: "Compliance Alerts", value: "3", icon: AlertCircle, color: "text-rose-600", bg: "bg-rose-50" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Dashboard</h1>
        <div className="flex items-center space-x-2 text-sm text-neutral-500">
          <TrendingUp size={16} className="text-emerald-500" />
          <span>System performance is optimal</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-xl ${stat.bg}`}>
                <stat.icon size={24} className={stat.color} />
              </div>
              <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Nexus HR</span>
            </div>
            <p className="text-sm font-medium text-neutral-500">{stat.name}</p>
            <p className="text-3xl font-bold text-neutral-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
            <h2 className="font-bold text-lg">Recent Activity</h2>
            <button className="text-indigo-600 text-sm font-medium hover:underline">View all</button>
          </div>
          <div className="divide-y divide-neutral-50">
            {[
              { user: "Atif Ali", action: "approved PTO request", time: "2 hours ago" },
              { user: "Theo", action: "onboarded 3 new staff members", time: "5 hours ago" },
              { user: "Karim Bhai", action: "updated compliance docs", time: "Yesterday" },
              { user: "Aaliya Siddiqui", action: "completed performance review", time: "2 days ago" },
            ].map((activity, i) => (
              <div key={i} className="px-6 py-4 flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center font-bold text-neutral-500 text-sm">
                  {activity.user.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    <span className="text-neutral-900">{activity.user}</span>
                    <span className="text-neutral-500"> {activity.action}</span>
                  </p>
                  <p className="text-xs text-neutral-400 mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
            <h2 className="font-bold text-lg">Compliance Status</h2>
            <ShieldCheck size={20} className="text-emerald-500" />
          </div>
          <div className="p-6 space-y-6">
            {[
              { label: "Staff Training", progress: 92, color: "bg-emerald-500" },
              { label: "Document Verification", progress: 85, color: "bg-indigo-500" },
              { label: "Background Checks", progress: 78, color: "bg-amber-500" },
              { label: "IT Access Audits", progress: 64, color: "bg-rose-500" },
            ].map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-neutral-700">{item.label}</span>
                  <span className="text-neutral-500">{item.progress}%</span>
                </div>
                <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${item.color} rounded-full transition-all duration-1000`} 
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
