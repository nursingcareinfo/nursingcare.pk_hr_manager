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
  FileText,
  Download,
  Plus,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Database
} from "lucide-react";
import { INITIAL_STAFF } from "../data/initialStaff";
import { INITIAL_PATIENTS } from "../data/initialPatients";
import { INITIAL_ASSIGNMENTS } from "../data/initialAssignments";
import { Employee, Patient, Assignment, PayrollRecord } from "../types";
import { 
  exportToGoogleContacts, 
  downloadCSV, 
  formatPhone,
  validateCNIC,
  validatePhone 
} from "../lib/dataUtils";
import { syncStaffToSupabase } from "../lib/supabase";

export default function EmployeeManagement() {
  const [activeTab, setActiveTab] = React.useState<"directory" | "pto" | "performance" | "assignments" | "skills" | "payroll">("directory");
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [selectedEmployee, setSelectedEmployee] = React.useState<Employee | null>(null);
  const [editingEmployee, setEditingEmployee] = React.useState<Employee | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [staff, setStaff] = React.useState<Employee[]>(INITIAL_STAFF as any[] as Employee[]);
  
  const filteredStaff = staff.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.cnic?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.department?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const assignments = INITIAL_ASSIGNMENTS.map(a => {
    const staffMember = staff.find(s => s.id === a.employeeId);
    const patient = INITIAL_PATIENTS.find(p => p.id === a.patientId);
    return {
      id: a.id,
      staffName: staffMember?.name || "Unknown",
      patientName: patient?.name || "Unknown",
      shift: a.shift.charAt(0).toUpperCase() + a.shift.slice(1),
      status: a.status,
      startDate: a.startDate
    };
  });

  const handleSyncToSupabase = async () => {
    try {
      await syncStaffToSupabase(staff);
      alert('Staff data synced to Supabase successfully!');
    } catch (error) {
      console.error('Sync failed:', error);
      alert('Failed to sync data to Supabase. Check console for details.');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Employee Management</h1>
          <p className="text-neutral-500 mt-1">Directory, time-off requests, and performance reviews</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleSyncToSupabase}
            className="bg-emerald-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-emerald-700 transition-colors flex items-center space-x-2 shadow-sm"
          >
            <Database size={18} />
            <span>Sync Supabase</span>
          </button>
          <button 
            onClick={() => exportToGoogleContacts(INITIAL_STAFF)}
            className="bg-white text-neutral-700 border border-neutral-200 px-4 py-2 rounded-xl font-medium hover:bg-neutral-50 transition-colors flex items-center space-x-2 shadow-sm"
          >
            <Download size={18} />
            <span>Export Contacts</span>
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center space-x-2 shadow-sm"
          >
            <Plus size={18} />
            <span>Add Employee</span>
          </button>
        </div>
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
        <button 
          onClick={() => setActiveTab("skills")}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "skills" ? "bg-white text-indigo-600 shadow-sm" : "text-neutral-500 hover:text-neutral-700"}`}
        >
          Skills & Certs
        </button>
        <button 
          onClick={() => setActiveTab("payroll")}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "payroll" ? "bg-white text-indigo-600 shadow-sm" : "text-neutral-500 hover:text-neutral-700"}`}
        >
          Payroll
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all w-64"
                />
              </div>
              <button className="p-2 rounded-xl border border-neutral-200 hover:bg-neutral-100 transition-colors">
                <Filter size={18} className="text-neutral-500" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[3500px]">
              <thead>
                <tr className="bg-neutral-50/50 border-b border-neutral-100">
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Assigned ID</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Father/Husband</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Designation</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Last Patient</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Patient Address</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">DOB</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Age</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Gender</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Religion</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Marital Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">CNIC</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">District</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Join Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Manager ID</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Vaccination</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Base Rate</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Payment Mode</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Languages</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Emergency Contact</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Guarantor</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Certifications</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Skills</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredStaff.slice(0, 10).map((staff) => {
                  const lastAssignment = INITIAL_ASSIGNMENTS
                    .filter(a => a.employeeId === staff.id)
                    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())[0];
                  const lastPatient = lastAssignment ? INITIAL_PATIENTS.find(p => p.id === lastAssignment.patientId) : null;

                  return (
                    <tr 
                      key={staff.id} 
                      className="hover:bg-neutral-50/50 transition-colors group cursor-pointer"
                      onClick={() => setSelectedEmployee(staff)}
                    >
                      <td className="px-6 py-4 text-sm font-mono text-neutral-500">{staff.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs group-hover:bg-indigo-600 group-hover:text-white transition-all">
                            {staff.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <p className="text-sm font-bold text-neutral-900">{staff.name}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-500">{staff.fatherHusbandName || "N/A"}</td>
                      <td className="px-6 py-4 text-sm text-neutral-700 font-medium">{staff.designation}</td>
                      <td className="px-6 py-4 text-sm text-neutral-500">{staff.department || "N/A"}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${staff.status === 'active' ? "bg-emerald-50 text-emerald-600" : "bg-neutral-100 text-neutral-500"}`}>
                          {staff.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-500">{lastPatient?.name || "None"}</td>
                      <td className="px-6 py-4 text-sm text-neutral-500">{lastPatient?.address || "N/A"}</td>
                      <td className="px-6 py-4 text-sm text-neutral-500 font-mono">
                      <div className="flex items-center space-x-1">
                        <Phone size={12} className="text-neutral-300" />
                        <span>{staff.contact ? formatPhone(staff.contact) : "N/A"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-500">{staff.email || "N/A"}</td>
                    <td className="px-6 py-4 text-sm text-neutral-500">{staff.dob || "N/A"}</td>
                    <td className="px-6 py-4 text-sm text-neutral-500">{staff.age || "N/A"}</td>
                    <td className="px-6 py-4 text-sm text-neutral-500">{staff.gender || "N/A"}</td>
                    <td className="px-6 py-4 text-sm text-neutral-500">{staff.religion || "N/A"}</td>
                    <td className="px-6 py-4 text-sm text-neutral-500">{staff.maritalStatus || "N/A"}</td>
                    <td className="px-6 py-4 text-sm text-neutral-500 font-mono">
                      <div className="flex items-center space-x-1">
                        <CreditCard size={12} className="text-neutral-300" />
                        <span>{staff.cnic || "N/A"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-500">
                      <div className="flex items-center space-x-1">
                        <MapPin size={12} className="text-neutral-300" />
                        <span>{staff.district}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-500">{staff.joinDate || "N/A"}</td>
                    <td className="px-6 py-4 text-sm text-neutral-500 font-mono">{staff.managerId || "N/A"}</td>
                    <td className="px-6 py-4 text-sm text-neutral-500">{staff.vaccinationStatus || "N/A"}</td>
                    <td className="px-6 py-4 text-sm text-neutral-500 font-mono">Rs. {staff.baseRate || 0}</td>
                    <td className="px-6 py-4 text-sm text-neutral-500">
                      {staff.modeOfPayment?.type === 'mobile' ? 
                        `${staff.modeOfPayment.mobile?.provider} (${staff.modeOfPayment.mobile?.number || staff.modeOfPayment.mobile?.accountNo})` : 
                        staff.modeOfPayment?.bank ? `${staff.modeOfPayment.bank.bankName}` : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-500">{staff.languageSpoken || "N/A"}</td>
                    <td className="px-6 py-4 text-sm text-neutral-500 font-mono">{staff.emergencyContact || "N/A"}</td>
                    <td className="px-6 py-4 text-sm text-neutral-500">
                      {staff.guarantor ? `${staff.guarantor.name} (${staff.guarantor.relation})` : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-500">{staff.certifications?.join(", ") || "N/A"}</td>
                    <td className="px-6 py-4 text-sm text-neutral-500">{staff.skills?.join(", ") || "N/A"}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingEmployee(staff);
                            setIsAddModalOpen(true);
                          }}
                          className="p-2 rounded-lg hover:bg-indigo-50 text-indigo-400 hover:text-indigo-600 transition-colors"
                        >
                          <Plus size={18} className="rotate-45" />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEmployee(staff);
                          }}
                          className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors"
                        >
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-between">
            <p className="text-sm text-neutral-500">Showing {filteredStaff.length > 10 ? 10 : filteredStaff.length} of {filteredStaff.length} employees</p>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 rounded-lg border border-neutral-200 text-sm font-medium hover:bg-white transition-colors disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1 rounded-lg border border-neutral-200 text-sm font-medium hover:bg-white transition-colors">Next</button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Employee Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-8 py-6 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
              <h2 className="text-2xl font-bold text-neutral-900">{editingEmployee ? "Edit Employee" : "Add New Employee"}</h2>
              <button 
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingEmployee(null);
                }}
                className="p-2 rounded-xl hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <XCircle size={24} />
              </button>
            </div>
            <div className="p-8 max-h-[70vh] overflow-y-auto">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6" id="add-employee-form">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Full Name</label>
                  <input name="name" required type="text" defaultValue={editingEmployee?.name} placeholder="e.g. Muhammad Ahmed" className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Father/Husband Name</label>
                  <input name="fatherHusbandName" type="text" defaultValue={editingEmployee?.fatherHusbandName} placeholder="e.g. Ali Khan" className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Designation</label>
                  <select name="designation" defaultValue={editingEmployee?.designation} className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all">
                    <option>Nursing Manager</option>
                    <option>Staff Nurse</option>
                    <option>Midwife</option>
                    <option>Attendant</option>
                    <option>Physiotherapist</option>
                    <option>EMT Tech</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">CNIC (XXXXX-XXXXXXX-X)</label>
                  <input name="cnic" required type="text" defaultValue={editingEmployee?.cnic} placeholder="42101-1234567-1" className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-mono" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Contact (+92...)</label>
                  <input name="contact" required type="text" defaultValue={editingEmployee?.contact} placeholder="+923001234567" className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-mono" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Email (Optional)</label>
                  <input name="email" type="email" defaultValue={editingEmployee?.email} placeholder="email@example.com" className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Religion</label>
                  <input name="religion" type="text" defaultValue={editingEmployee?.religion} placeholder="e.g. Islam" className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Language Spoken</label>
                  <input name="languageSpoken" type="text" defaultValue={editingEmployee?.languageSpoken} placeholder="e.g. Urdu, English" className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Marital Status</label>
                  <select name="maritalStatus" defaultValue={editingEmployee?.maritalStatus} className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all">
                    <option>Single</option>
                    <option>Married</option>
                    <option>Divorced</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">District</label>
                  <input name="district" required type="text" defaultValue={editingEmployee?.district} placeholder="e.g. Karachi South" className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Residential Address</label>
                  <input name="residentialAddress" required type="text" defaultValue={editingEmployee?.residentialAddress} placeholder="Current living address..." className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Permanent Address</label>
                  <input name="permanentAddress" type="text" defaultValue={editingEmployee?.permanentAddress} placeholder="Home town address..." className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Date of Birth</label>
                  <input name="dob" type="date" defaultValue={editingEmployee?.dob} className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Age</label>
                  <input name="age" type="number" defaultValue={editingEmployee?.age} placeholder="e.g. 25" className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Gender</label>
                  <select name="gender" defaultValue={editingEmployee?.gender} className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Emergency Contact</label>
                  <input name="emergencyContact" type="text" defaultValue={editingEmployee?.emergencyContact} placeholder="0300-1234567" className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-mono" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Department</label>
                  <input name="department" type="text" defaultValue={editingEmployee?.department} placeholder="e.g. Nursing" className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Join Date</label>
                  <input name="joinDate" type="date" defaultValue={editingEmployee?.joinDate} className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Vaccination Status</label>
                  <select name="vaccinationStatus" defaultValue={editingEmployee?.vaccinationStatus} className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all">
                    <option>Fully Vaccinated</option>
                    <option>Partially Vaccinated</option>
                    <option>Not Vaccinated</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Base Rate (12h)</label>
                  <input name="baseRate" type="number" defaultValue={editingEmployee?.baseRate} placeholder="e.g. 2500" className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-mono" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Certifications (Comma separated)</label>
                  <input name="certifications" type="text" defaultValue={editingEmployee?.certifications?.join(", ")} placeholder="e.g. BLS, ACLS" className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Skills (Comma separated)</label>
                  <input name="skills" type="text" defaultValue={editingEmployee?.skills?.join(", ")} placeholder="e.g. Management, Patient Care" className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                </div>

                <div className="md:col-span-2 pt-4 border-t border-neutral-100">
                  <h3 className="text-sm font-bold text-neutral-900 mb-4 uppercase tracking-widest">Mode of Payment</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Payment Type</label>
                      <select name="paymentType" defaultValue={editingEmployee?.modeOfPayment?.type?.toLowerCase() || "mobile"} className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all">
                        <option value="mobile">Mobile Money (Easypaisa/JazzCash)</option>
                        <option value="bank">Bank Account</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Account Name</label>
                      <input name="accountName" type="text" defaultValue={editingEmployee?.modeOfPayment?.type === "Bank" ? editingEmployee.modeOfPayment.bank?.accountTitle : editingEmployee?.name} placeholder="Name on account" className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Account/Mobile Number</label>
                      <input name="accountNumber" type="text" defaultValue={editingEmployee?.modeOfPayment?.type === "Bank" ? editingEmployee.modeOfPayment.bank?.accountNo : editingEmployee?.modeOfPayment?.mobile?.accountNo} placeholder="Number or A/C #" className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Bank/Provider Name</label>
                      <input name="bankName" type="text" defaultValue={editingEmployee?.modeOfPayment?.type === "Bank" ? editingEmployee.modeOfPayment.bank?.bankName : editingEmployee?.modeOfPayment?.mobile?.provider} placeholder="e.g. HBL, Easypaisa, etc." className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 pt-4 border-t border-neutral-100">
                  <h3 className="text-sm font-bold text-neutral-900 mb-4 uppercase tracking-widest">Guarantor Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Guarantor Name</label>
                      <input name="guarantorName" type="text" defaultValue={editingEmployee?.guarantor?.name} placeholder="Full Name" className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Relation</label>
                      <input name="guarantorRelation" type="text" defaultValue={editingEmployee?.guarantor?.relation} placeholder="e.g. Father, Brother" className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Guarantor Contact</label>
                      <input name="guarantorContact" type="text" defaultValue={editingEmployee?.guarantor?.contact} placeholder="+92..." className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Guarantor CNIC</label>
                      <input name="guarantorCnic" type="text" defaultValue={editingEmployee?.guarantor?.cnic} placeholder="XXXXX-XXXXXXX-X" className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="px-8 py-6 bg-neutral-50/50 border-t border-neutral-100 flex items-center justify-end space-x-4">
              <button 
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingEmployee(null);
                }}
                className="px-6 py-2 text-neutral-600 font-bold hover:text-neutral-900 transition-colors"
              >
                Cancel
              </button>
              <button 
                form="add-employee-form"
                type="submit"
                className="px-8 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                onClick={(e) => {
                  e.preventDefault();
                  const form = document.getElementById('add-employee-form') as HTMLFormElement;
                  const formData = new FormData(form);
                  const cnic = formData.get('cnic') as string;
                  const contact = formData.get('contact') as string;
                  const name = formData.get('name') as string;
                  const designation = formData.get('designation') as string;
                  const district = formData.get('district') as string;
                  
                  if (!validateCNIC(cnic)) {
                    alert('Invalid CNIC format. Please use XXXXX-XXXXXXX-X');
                    return;
                  }
                  if (!validatePhone(contact)) {
                    alert('Invalid Phone format. Please use +92XXXXXXXXXX');
                    return;
                  }
                  
                  const updatedEmployee: Employee = {
                    ...(editingEmployee || { id: `NC-KHI-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`, status: 'active' }),
                    name,
                    designation,
                    cnic,
                    contact,
                    district,
                    email: formData.get('email') as string,
                    fatherHusbandName: formData.get('fatherHusbandName') as string,
                    religion: formData.get('religion') as string,
                    languageSpoken: formData.get('languageSpoken') as string,
                    maritalStatus: formData.get('maritalStatus') as string,
                    residentialAddress: formData.get('residentialAddress') as string,
                    permanentAddress: formData.get('permanentAddress') as string,
                    dob: formData.get('dob') as string,
                    age: formData.get('age') as string,
                    gender: formData.get('gender') as string,
                    emergencyContact: formData.get('emergencyContact') as string,
                    department: formData.get('department') as string,
                    joinDate: formData.get('joinDate') as string,
                    vaccinationStatus: formData.get('vaccinationStatus') as string,
                    baseRate: Number(formData.get('baseRate')),
                    certifications: (formData.get('certifications') as string)?.split(',').map(s => s.trim()).filter(Boolean),
                    skills: (formData.get('skills') as string)?.split(',').map(s => s.trim()).filter(Boolean),
                    modeOfPayment: {
                      type: formData.get('paymentType') === 'mobile' ? 'mobile' : 'bank',
                      mobile: formData.get('paymentType') === 'mobile' ? {
                        provider: formData.get('bankName') as string,
                        accountNo: formData.get('accountNumber') as string,
                        network: '',
                        accountName: formData.get('accountName') as string
                      } : undefined,
                      bank: formData.get('paymentType') === 'bank' ? {
                        bankName: formData.get('bankName') as string,
                        accountTitle: formData.get('accountName') as string,
                        accountNo: formData.get('accountNumber') as string,
                        accountNumber: formData.get('accountNumber') as string,
                        branch: ''
                      } : undefined
                    },
                    guarantor: {
                      name: formData.get('guarantorName') as string,
                      relation: formData.get('guarantorRelation') as string,
                      contact: formData.get('guarantorContact') as string,
                      cnic: formData.get('guarantorCnic') as string
                    }
                  };

                  if (editingEmployee) {
                    setStaff(prev => prev.map(s => s.id === editingEmployee.id ? updatedEmployee : s));
                  } else {
                    setStaff(prev => [updatedEmployee, ...prev]);
                  }
                  
                  alert(`Employee ${editingEmployee ? 'updated' : 'added'} successfully!`);
                  setIsAddModalOpen(false);
                  setEditingEmployee(null);
                }}
              >
                {editingEmployee ? "Update Employee" : "Save Employee"}
              </button>
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

      {activeTab === "skills" && (
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-100 bg-neutral-50/50">
            <h2 className="font-bold text-lg">Staff Skills & Certifications</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-neutral-50/50 border-b border-neutral-100">
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Staff Member</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Certifications</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Vaccination</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Primary Skills</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Emergency Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredStaff.slice(0, 10).map((staff: any) => (
                  <tr key={staff.id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs">
                          {staff.name.split(" ").map((n: string) => n[0]).join("")}
                        </div>
                        <p className="text-sm font-bold text-neutral-900">{staff.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {(staff.certifications || ["N/A"]).map((cert: string) => (
                          <span key={cert} className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[10px] font-bold">{cert}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        staff.vaccinationStatus === "Fully Vaccinated" ? "bg-emerald-50 text-emerald-600" : "bg-neutral-50 text-neutral-500"
                      }`}>
                        {staff.vaccinationStatus || "Unknown"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs text-neutral-600">{(staff.skills || ["General Nursing"]).join(", ")}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-500 font-mono">{staff.emergencyContact || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {activeTab === "payroll" && (
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
            <h2 className="font-bold text-lg">Staff Payroll (March 2026)</h2>
            <div className="flex items-center space-x-3">
              <span className="text-xs text-neutral-500 font-medium uppercase tracking-wider">Default Shift: 12h</span>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors">Generate Monthly Payroll</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-50/50 border-b border-neutral-100">
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Staff Member</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Base Rate (12h)</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Shifts</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Total Earnings</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Payment Mode</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {staff.filter(s => s.baseRate).map((s) => (
                  <tr key={s.id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs">
                          {s.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-neutral-900">{s.name}</p>
                          <p className="text-[10px] text-neutral-400">{s.designation}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-neutral-700">PKR {s.baseRate?.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-neutral-500">26</td>
                    <td className="px-6 py-4 text-sm font-bold text-neutral-900">PKR {((s.baseRate || 0) * 26).toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-neutral-500">{s.paymentMode || "N/A"}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-lg text-[10px] font-black uppercase tracking-widest">Pending</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Employee Card Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-[32px] w-full max-w-4xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
            <div className="px-8 py-6 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-xl font-black">
                  {selectedEmployee.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-neutral-900 leading-tight">{selectedEmployee.name}</h2>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest">{selectedEmployee.designation}</p>
                    <button 
                      onClick={() => {
                        setEditingEmployee(selectedEmployee);
                        setIsAddModalOpen(true);
                        setSelectedEmployee(null);
                      }}
                      className="text-[10px] font-black text-neutral-400 hover:text-indigo-600 uppercase tracking-widest transition-colors"
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedEmployee(null)}
                className="p-3 rounded-2xl hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <XCircle size={28} />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left Column: Personal & Contact */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-4">Personal Information</h3>
                  <div className="space-y-4">
                    <InfoItem label="Father/Husband" value={selectedEmployee.fatherHusbandName} />
                    <InfoItem label="DOB" value={selectedEmployee.dob} />
                    <InfoItem label="Gender" value={selectedEmployee.gender} />
                    <InfoItem label="CNIC" value={selectedEmployee.cnic} mono />
                    <InfoItem label="Religion" value={selectedEmployee.religion} />
                    <InfoItem label="Marital Status" value={selectedEmployee.maritalStatus} />
                    <InfoItem label="Language Spoken" value={selectedEmployee.languageSpoken} />
                    <InfoItem label="Age" value={selectedEmployee.age} />
                    <InfoItem label="Languages (Legacy)" value={selectedEmployee.languages} />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-4">Contact Details</h3>
                  <div className="space-y-4">
                    <InfoItem label="Phone" value={selectedEmployee.contact} mono />
                    <InfoItem label="Email" value={selectedEmployee.email} />
                    <InfoItem label="Emergency Contact" value={selectedEmployee.emergencyContact} mono />
                  </div>
                </div>
              </div>

              {/* Middle Column: Employment & Skills */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-4">Employment Details</h3>
                  <div className="space-y-4">
                    <InfoItem label="Employee ID" value={selectedEmployee.id} mono />
                    <InfoItem label="Department" value={selectedEmployee.department || "Nursing"} />
                    <InfoItem label="Join Date" value={selectedEmployee.joinDate || "N/A"} />
                    <div className="flex flex-col space-y-1">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Status</span>
                      <span className={`w-fit px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                        selectedEmployee.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-neutral-100 text-neutral-500"
                      }`}>
                        {selectedEmployee.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-4">Skills & Certifications</h3>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {selectedEmployee.certifications?.map(c => (
                        <span key={c} className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-bold">{c}</span>
                      ))}
                    </div>
                    <InfoItem label="Vaccination" value={selectedEmployee.vaccinationStatus} />
                    <div className="flex flex-wrap gap-1">
                      {selectedEmployee.skills?.map(s => (
                        <span key={s} className="px-2 py-1 bg-neutral-100 text-neutral-600 rounded-lg text-[10px] font-medium">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Address, Payment & Assignment */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-4">Address & Location</h3>
                  <div className="space-y-4">
                    <InfoItem label="Residential Address" value={selectedEmployee.residentialAddress} />
                    <InfoItem label="Permanent Address" value={selectedEmployee.permanentAddress} />
                    <div className="pt-2 border-t border-neutral-100">
                      <InfoItem label="District (Legacy)" value={selectedEmployee.district} />
                      <InfoItem label="Area (Legacy)" value={selectedEmployee.area} />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-4">Payment Information</h3>
                  <div className="space-y-4">
                    <InfoItem label="Mode of Payment" value={selectedEmployee.modeOfPayment?.type} />
                    {selectedEmployee.modeOfPayment?.type === "Mobile" && (
                      <div className="pl-4 border-l-2 border-indigo-100 space-y-2">
                        <InfoItem label="Provider" value={selectedEmployee.modeOfPayment.mobile?.provider} />
                        <InfoItem label="Account No" value={selectedEmployee.modeOfPayment.mobile?.accountNo} mono />
                      </div>
                    )}
                    {selectedEmployee.modeOfPayment?.type === "Bank" && (
                      <div className="pl-4 border-l-2 border-indigo-100 space-y-2">
                        <InfoItem label="Bank Name" value={selectedEmployee.modeOfPayment.bank?.bankName} />
                        <InfoItem label="Account Title" value={selectedEmployee.modeOfPayment.bank?.accountTitle} />
                        <InfoItem label="Account No" value={selectedEmployee.modeOfPayment.bank?.accountNo} mono />
                      </div>
                    )}
                    <InfoItem label="Base Rate (12h)" value={selectedEmployee.baseRate ? `PKR ${selectedEmployee.baseRate.toLocaleString()}` : "N/A"} mono />
                  </div>
                </div>

                {selectedEmployee.guarantor && (
                  <div>
                    <h3 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-4">Guarantor Details</h3>
                    <div className="space-y-4 bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
                      <InfoItem label="Name" value={selectedEmployee.guarantor.name} />
                      <InfoItem label="Relation" value={selectedEmployee.guarantor.relation} />
                      <InfoItem label="Contact" value={selectedEmployee.guarantor.contact} mono />
                      <InfoItem label="CNIC" value={selectedEmployee.guarantor.cnic} mono />
                    </div>
                  </div>
                )}

                {/* Assignment Info */}
                <div className="p-5 bg-indigo-50 rounded-3xl border border-indigo-100">
                  <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-4">Current Assignment</h3>
                  {(() => {
                    const assignment = INITIAL_ASSIGNMENTS.find(a => a.employeeId === selectedEmployee.id && a.status === "active");
                    const patient = assignment ? INITIAL_PATIENTS.find(p => p.id === assignment.patientId) : null;
                    
                    if (!patient) return <p className="text-xs text-indigo-300 italic">No active assignment</p>;
                    
                    return (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-indigo-600 shadow-sm">
                            <Users size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-black text-indigo-900">{patient.name}</p>
                            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{assignment?.shift} Shift</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <MapPin size={14} className="text-indigo-400 mt-0.5 shrink-0" />
                          <p className="text-xs text-indigo-700 font-medium leading-relaxed">{patient.address}</p>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoItem({ label, value, mono }: { label: string; value?: string | number; mono?: boolean }) {
  return (
    <div className="flex flex-col space-y-1">
      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{label}</span>
      <span className={`text-sm font-bold text-neutral-800 ${mono ? "font-mono" : ""}`}>{value || "N/A"}</span>
    </div>
  );
}
