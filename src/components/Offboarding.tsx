import React from "react";
import { 
  LogOut, 
  AlertCircle, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  MoreVertical,
  UserMinus,
  Key,
  Laptop,
  FileText
} from "lucide-react";

export default function Offboarding() {
  const offboardingStaff = [
    { id: "1", name: "Atif Ali", role: "CEO & Managing Director", lastDay: "2026-04-30", status: "planning", accessRevoked: false },
    { id: "2", name: "Theo", role: "Office Coordinator & HR Manager", lastDay: "2026-03-31", status: "last-week", accessRevoked: false },
    { id: "3", name: "Karim Bhai", role: "Manager", lastDay: "2026-03-26", status: "last-day", accessRevoked: true },
  ];

  const revocationTasks = [
    { id: "1", title: "Email Account", status: "revoked", icon: Key },
    { id: "2", title: "VPN Access", status: "revoked", icon: ShieldAlert },
    { id: "3", title: "Slack / Teams", status: "pending", icon: Key },
    { id: "4", title: "IT Equipment Return", status: "pending", icon: Laptop },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Offboarding</h1>
          <p className="text-neutral-500 mt-1">Manage resignations, terminations, and access revocation</p>
        </div>
        <button className="bg-rose-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-rose-700 transition-colors flex items-center space-x-2 shadow-sm">
          <UserMinus size={18} />
          <span>New Offboarding</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Offboarding List */}
        <div className="lg:col-span-2 space-y-4">
          {offboardingStaff.map((staff) => (
            <div key={staff.id} className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition-all group">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 font-bold text-lg">
                    {staff.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-neutral-900">{staff.name}</h3>
                    <p className="text-sm text-neutral-500">{staff.role}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right mr-4">
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Last Day</p>
                    <p className="text-sm font-bold text-neutral-700">{staff.lastDay}</p>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-400">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                    staff.status === "last-day" ? "bg-rose-100 text-rose-700" :
                    staff.status === "last-week" ? "bg-amber-100 text-amber-700" : "bg-neutral-100 text-neutral-700"
                  }`}>
                    {staff.status}
                  </span>
                  {staff.accessRevoked && (
                    <span className="flex items-center space-x-1 px-2 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-[10px] font-black uppercase tracking-widest">
                      <CheckCircle2 size={10} />
                      <span>Access Revoked</span>
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-xl text-sm font-bold hover:bg-neutral-200 transition-colors">
                    Exit Interview
                  </button>
                  <button className="px-4 py-2 bg-rose-600 text-white rounded-xl text-sm font-bold hover:bg-rose-700 transition-colors">
                    Revoke Access
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Access Revocation Checklist */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden h-fit">
          <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
            <h2 className="font-bold text-lg">Revocation Audit</h2>
            <div className="p-1.5 bg-rose-50 rounded-lg">
              <ShieldAlert size={18} className="text-rose-500" />
            </div>
          </div>
          <div className="divide-y divide-neutral-50">
            {revocationTasks.map((task) => (
              <div key={task.id} className="p-6 hover:bg-neutral-50/50 transition-colors group">
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-xl ${task.status === "revoked" ? "bg-emerald-50 text-emerald-600" : "bg-neutral-100 text-neutral-400 group-hover:bg-rose-50 group-hover:text-rose-600"}`}>
                    <task.icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-bold truncate ${task.status === "revoked" ? "text-neutral-400 line-through" : "text-neutral-900"}`}>
                        {task.title}
                      </p>
                      {task.status === "revoked" ? (
                        <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                      ) : (
                        <Clock size={16} className="text-neutral-300 flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Compliance Trail</span>
                      <span className="text-xs text-neutral-500">System Auto</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-4 text-sm font-bold text-rose-600 hover:bg-rose-50 transition-colors border-t border-neutral-100 flex items-center justify-center space-x-2">
            <FileText size={18} />
            <span>Generate Audit Report</span>
          </button>
        </div>
      </div>
    </div>
  );
}
