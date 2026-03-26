import React from "react";
import { 
  UserPlus, 
  Search, 
  Filter, 
  MoreVertical, 
  Calendar, 
  Clock,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Phone,
  User
} from "lucide-react";

interface Patient {
  id: string;
  name: string;
  contact: string;
  address: string;
  condition: string;
  status: "active" | "discharged" | "pending";
  assignedStaff?: string;
}

export default function PatientManagement() {
  const [patients, setPatients] = React.useState<Patient[]>([
    { id: "P-001", name: "Mrs. Khan", contact: "0300-1234567", address: "Clifton, Karachi", condition: "Post-surgery recovery", status: "active", assignedStaff: "Aaliya Siddiqui" },
    { id: "P-002", name: "Mr. Ahmed", contact: "0321-7654321", address: "Gulshan, Karachi", condition: "Elderly care", status: "active", assignedStaff: "Abbas Ghafoor" },
    { id: "P-003", name: "Ms. Fatima", contact: "0333-9876543", address: "DHA, Karachi", condition: "Physiotherapy", status: "pending" },
  ]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Patient Management</h1>
          <p className="text-neutral-500 mt-1">Manage patient records and staff assignments</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center space-x-2 shadow-sm">
          <UserPlus size={18} />
          <span>Add Patient</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Patient List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input 
                    type="text" 
                    placeholder="Search patients..." 
                    className="pl-10 pr-4 py-2 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all w-64"
                  />
                </div>
              </div>
            </div>
            <div className="divide-y divide-neutral-100">
              {patients.map((patient) => (
                <div key={patient.id} className="p-6 hover:bg-neutral-50/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <User size={24} />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-bold text-neutral-900">{patient.name}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            patient.status === "active" ? "bg-emerald-100 text-emerald-700" :
                            patient.status === "pending" ? "bg-amber-100 text-amber-700" : "bg-neutral-100 text-neutral-700"
                          }`}>
                            {patient.status}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-500 font-medium">{patient.condition}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-1 text-xs text-neutral-400">
                            <MapPin size={14} />
                            <span>{patient.address}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-xs text-neutral-400">
                            <Phone size={14} />
                            <span>{patient.contact}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-400 transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-between p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-400">
                        <User size={16} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Assigned Staff</p>
                        <p className="text-sm font-bold text-neutral-700">{patient.assignedStaff || "Unassigned"}</p>
                      </div>
                    </div>
                    <button className="text-xs font-bold text-indigo-600 hover:underline">
                      {patient.assignedStaff ? "Change Assignment" : "Assign Staff"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar / Quick Actions */}
        <div className="space-y-6">
          <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200">
            <h3 className="font-bold text-lg mb-2">Assignment Status</h3>
            <div className="space-y-4 mt-4">
              <div className="flex items-center justify-between text-indigo-100">
                <span className="text-sm">Active Patients</span>
                <span className="font-bold">24</span>
              </div>
              <div className="flex items-center justify-between text-indigo-100">
                <span className="text-sm">Pending Assignments</span>
                <span className="font-bold text-amber-300">5</span>
              </div>
              <div className="w-full bg-indigo-500/30 h-2 rounded-full mt-2">
                <div className="bg-white h-full rounded-full w-[80%]"></div>
              </div>
              <p className="text-xs text-indigo-100/70">80% of patients have assigned staff</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
            <h3 className="font-bold text-neutral-900 mb-4">Recent Assignments</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-neutral-800">Staff Assigned</p>
                    <p className="text-xs text-neutral-500">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
