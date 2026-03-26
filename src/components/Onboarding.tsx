import React from "react";
import { 
  ClipboardCheck, 
  UserPlus, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  MoreVertical,
  Calendar,
  Laptop,
  ShieldCheck,
  Mail
} from "lucide-react";

export default function Onboarding() {
  const [activeTab, setActiveTab] = React.useState<"active" | "completed">("active");

  const onboardingStaff = [
    { id: "1", name: "Aaliya Siddiqui", role: "Nurse Assistant", startDate: "2026-04-01", progress: 65, tasks: 12, completed: 8 },
    { id: "2", name: "Abbas Ghafoor", role: "Nurse Assistant", startDate: "2026-04-05", progress: 30, tasks: 12, completed: 4 },
    { id: "3", name: "Abdul Rafay", role: "Attendant", startDate: "2026-04-10", progress: 10, tasks: 12, completed: 1 },
  ];

  const tasks = [
    { id: "1", title: "Document Collection", category: "HR", dueDate: "2026-03-28", status: "completed", icon: ClipboardCheck },
    { id: "2", title: "IT Equipment Setup", category: "IT", dueDate: "2026-03-30", status: "pending", icon: Laptop },
    { id: "3", title: "Security Access", category: "Security", dueDate: "2026-03-31", status: "pending", icon: ShieldCheck },
    { id: "4", title: "Welcome Email", category: "HR", dueDate: "2026-03-27", status: "completed", icon: Mail },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Onboarding</h1>
          <p className="text-neutral-500 mt-1">Track new hire progress and checklist automation</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center space-x-2 shadow-sm">
          <UserPlus size={18} />
          <span>New Onboarding</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-1 bg-neutral-100 p-1 rounded-xl w-fit">
        <button 
          onClick={() => setActiveTab("active")}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "active" ? "bg-white text-indigo-600 shadow-sm" : "text-neutral-500 hover:text-neutral-700"}`}
        >
          Active (8)
        </button>
        <button 
          onClick={() => setActiveTab("completed")}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "completed" ? "bg-white text-indigo-600 shadow-sm" : "text-neutral-500 hover:text-neutral-700"}`}
        >
          Completed (42)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* New Hire List */}
        <div className="lg:col-span-2 space-y-4">
          {onboardingStaff.map((staff) => (
            <div key={staff.id} className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition-all group">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-lg">
                    {staff.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-neutral-900">{staff.name}</h3>
                    <p className="text-sm text-neutral-500">{staff.role}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right mr-4">
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Start Date</p>
                    <p className="text-sm font-bold text-neutral-700">{staff.startDate}</p>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-400">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-bold text-neutral-700">Onboarding Progress</span>
                  <span className="text-indigo-600 font-bold">{staff.progress}%</span>
                </div>
                <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 rounded-full transition-all duration-1000" 
                    style={{ width: `${staff.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-neutral-500">
                    <span className="font-bold text-neutral-700">{staff.completed}</span> of {staff.tasks} tasks completed
                  </p>
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-neutral-200 flex items-center justify-center text-[8px] font-bold text-neutral-500">
                        {i === 1 ? "HR" : i === 2 ? "IT" : "M"}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Checklist / Tasks */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden h-fit">
          <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
            <h2 className="font-bold text-lg">Pending Tasks</h2>
            <div className="p-1.5 bg-amber-50 rounded-lg">
              <AlertCircle size={18} className="text-amber-500" />
            </div>
          </div>
          <div className="divide-y divide-neutral-50">
            {tasks.map((task) => (
              <div key={task.id} className="p-6 hover:bg-neutral-50/50 transition-colors group">
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-xl ${task.status === "completed" ? "bg-emerald-50 text-emerald-600" : "bg-neutral-100 text-neutral-400 group-hover:bg-indigo-50 group-hover:text-indigo-600"}`}>
                    <task.icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-bold truncate ${task.status === "completed" ? "text-neutral-400 line-through" : "text-neutral-900"}`}>
                        {task.title}
                      </p>
                      {task.status === "completed" ? (
                        <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                      ) : (
                        <Clock size={16} className="text-neutral-300 flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{task.category}</span>
                      <span className="text-xs text-neutral-500">{task.dueDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-4 text-sm font-bold text-indigo-600 hover:bg-indigo-50 transition-colors border-t border-neutral-100">
            View Full Checklist
          </button>
        </div>
      </div>
    </div>
  );
}
