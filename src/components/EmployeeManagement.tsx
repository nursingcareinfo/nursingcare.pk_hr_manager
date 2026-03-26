import React from "react";
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  Calendar, 
  Star, 
  ChevronRight,
  Clock,
  CheckCircle2,
  XCircle,
  FileText
} from "lucide-react";
import { INITIAL_STAFF } from "../data/initialStaff";

export default function EmployeeManagement() {
  const [activeTab, setActiveTab] = React.useState<"directory" | "pto" | "performance" | "assignments">("directory");

  const ptoRequests = [
    { id: "1", name: "Atif Ali", type: "Vacation", duration: "3 days", status: "pending", date: "2026-04-10" },
    { id: "2", name: "Theo", type: "Sick Leave", duration: "1 day", status: "approved", date: "2026-03-25" },
    { id: "3", name: "Karim Bhai", type: "Personal", duration: "2 days", status: "denied", date: "2026-03-20" },
  ];

  const reviews = [
    { id: "1", name: "Aaliya Siddiqui", period: "Q1 2026", score: 4.8, status: "completed" },
    { id: "2", name: "Abbas Ghafoor", period: "Q1 2026", score: 4.2, status: "completed" },
    { id: "3", name: "Abdul Rafay", period: "Q1 2026", score: 0, status: "pending" },
  ];

  const assignments = [
    { id: "1", staffName: "Aaliya Siddiqui", patientName: "Mrs. Khan", shift: "Day", status: "active", startDate: "2026-03-01" },
    { id: "2", staffName: "Abbas Ghafoor", patientName: "Mr. Ahmed", shift: "Night", status: "active", startDate: "2026-03-15" },
    { id: "3", staffName: "Abdul Rafay", patientName: "Ms. Fatima", shift: "24h", status: "completed", startDate: "2026-02-01" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Employee Management</h1>
          <p className="text-neutral-500 mt-1">Directory, time-off requests, and performance reviews</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center space-x-2 shadow-sm">
          <Users size={18} />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-1 bg-neutral-100 p-1 rounded-xl w-fit">
        <button 
          onClick={() => setActiveTab("directory")}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "directory" ? "bg-white text-indigo-600 shadow-sm" : "text-neutral-500 hover:text-neutral-700"}`}
        >
          Directory
        </button>
        <button 
          onClick={() => setActiveTab("assignments")}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "assignments" ? "bg-white text-indigo-600 shadow-sm" : "text-neutral-500 hover:text-neutral-700"}`}
        >
          Staff Assignments
        </button>
        <button 
          onClick={() => setActiveTab("pto")}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "pto" ? "bg-white text-indigo-600 shadow-sm" : "text-neutral-500 hover:text-neutral-700"}`}
        >
          PTO Requests
        </button>
        <button 
          onClick={() => setActiveTab("performance")}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "performance" ? "bg-white text-indigo-600 shadow-sm" : "text-neutral-500 hover:text-neutral-700"}`}
        >
          Performance
        </button>
      </div>

      {activeTab === "directory" && (
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input 
                  type="text" 
                  placeholder="Search directory..." 
                  className="pl-10 pr-4 py-2 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all w-64"
                />
              </div>
              <button className="p-2 rounded-xl border border-neutral-200 hover:bg-neutral-100 transition-colors">
                <Filter size={18} className="text-neutral-500" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1200px]">
              <thead>
                <tr className="bg-neutral-50/50 border-b border-neutral-100">
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Assigned ID</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Designation</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Gender</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">CNIC</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">District</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {INITIAL_STAFF.slice(0, 10).map((staff) => (
                  <tr key={staff.id} className="hover:bg-neutral-50/50 transition-colors group">
                    <td className="px-6 py-4 text-sm font-mono text-neutral-500">{staff.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                          {staff.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <p className="text-sm font-bold text-neutral-900">{staff.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-700 font-medium">{staff.designation}</td>
                    <td className="px-6 py-4 text-sm text-neutral-500">{staff.gender || "N/A"}</td>
                    <td className="px-6 py-4 text-sm text-neutral-500 font-mono">{staff.cnic || "N/A"}</td>
                    <td className="px-6 py-4 text-sm text-neutral-500">{staff.district}</td>
                    <td className="px-6 py-4 text-sm text-neutral-500">{staff.contact || "N/A"}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-between">
            <p className="text-sm text-neutral-500">Showing 10 of 398 employees</p>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 rounded-lg border border-neutral-200 text-sm font-medium hover:bg-white transition-colors disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1 rounded-lg border border-neutral-200 text-sm font-medium hover:bg-white transition-colors">Next</button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "assignments" && (
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
            <h2 className="font-bold text-lg">Active Staff Assignments</h2>
            <button className="text-indigo-600 text-sm font-bold hover:underline">Assign New Staff</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-50/50 border-b border-neutral-100">
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Staff Member</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Assigned Patient</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Shift</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Start Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {assignments.map((assignment) => (
                  <tr key={assignment.id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 font-bold text-xs">
                          {assignment.staffName.split(" ").map(n => n[0]).join("")}
                        </div>
                        <p className="text-sm font-bold text-neutral-900">{assignment.staffName}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-700 font-medium">{assignment.patientName}</td>
                    <td className="px-6 py-4 text-sm text-neutral-500">{assignment.shift}</td>
                    <td className="px-6 py-4 text-sm text-neutral-500">{assignment.startDate}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        assignment.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-neutral-100 text-neutral-700"
                      }`}>
                        {assignment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-indigo-600 text-sm font-bold hover:underline">Modify</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "pto" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ptoRequests.map((request) => (
            <div key={request.id} className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 font-bold text-sm">
                    {request.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-neutral-900">{request.name}</p>
                    <p className="text-xs text-neutral-500">{request.type}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  request.status === "approved" ? "bg-emerald-100 text-emerald-700" :
                  request.status === "denied" ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"
                }`}>
                  {request.status}
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-neutral-600">
                  <Calendar size={16} className="text-neutral-400" />
                  <span className="font-medium">Starts: {request.date}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-neutral-600">
                  <Clock size={16} className="text-neutral-400" />
                  <span className="font-medium">Duration: {request.duration}</span>
                </div>
              </div>
              <div className="mt-6 flex items-center space-x-2">
                {request.status === "pending" ? (
                  <>
                    <button className="flex-1 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2">
                      <CheckCircle2 size={16} />
                      <span>Approve</span>
                    </button>
                    <button className="flex-1 py-2 bg-rose-50 text-rose-600 rounded-xl text-sm font-bold hover:bg-rose-100 transition-colors flex items-center justify-center space-x-2">
                      <XCircle size={16} />
                      <span>Deny</span>
                    </button>
                  </>
                ) : (
                  <button className="w-full py-2 bg-neutral-100 text-neutral-500 rounded-xl text-sm font-bold hover:bg-neutral-200 transition-colors">
                    View Details
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "performance" && (
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
            <h2 className="font-bold text-lg">Q1 2026 Review Cycle</h2>
            <div className="flex items-center space-x-2 text-sm text-neutral-500">
              <Clock size={16} className="text-amber-500" />
              <span>Ends in 12 days</span>
            </div>
          </div>
          <div className="divide-y divide-neutral-100">
            {reviews.map((review) => (
              <div key={review.id} className="px-6 py-4 flex items-center justify-between hover:bg-neutral-50/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-sm">
                    {review.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-neutral-900">{review.name}</p>
                    <p className="text-xs text-neutral-500">{review.period}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-8">
                  {review.status === "completed" ? (
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star size={16} className="text-amber-400 fill-amber-400" />
                        <span className="text-sm font-bold text-neutral-900">{review.score}</span>
                        <span className="text-xs text-neutral-400">/ 5.0</span>
                      </div>
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-[10px] font-black uppercase tracking-widest">Completed</span>
                    </div>
                  ) : (
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-lg text-[10px] font-black uppercase tracking-widest">Pending</span>
                  )}
                  <button className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-indigo-600 transition-colors">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-4 text-sm font-bold text-indigo-600 hover:bg-indigo-50 transition-colors border-t border-neutral-100 flex items-center justify-center space-x-2">
            <FileText size={18} />
            <span>Generate Cycle Report</span>
          </button>
        </div>
      )}
    </div>
  );
}
