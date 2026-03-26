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
  User,
  XCircle,
  Plus
} from "lucide-react";
import { INITIAL_PATIENTS } from "../data/initialPatients";
import { INITIAL_ASSIGNMENTS } from "../data/initialAssignments";
import { INITIAL_STAFF } from "../data/initialStaff";
import { Patient, Assignment, Employee } from "../types";
import { formatPhone, validatePhone } from "../lib/dataUtils";

export default function PatientManagement() {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [editingPatient, setEditingPatient] = React.useState<Patient | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [patients, setPatients] = React.useState<Patient[]>(INITIAL_PATIENTS);

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.condition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Patient Management</h1>
          <p className="text-neutral-500 mt-1">Manage patient records and staff assignments</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center space-x-2 shadow-sm"
        >
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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all w-64"
                  />
                </div>
              </div>
            </div>
            <div className="divide-y divide-neutral-100">
              {filteredPatients.map((patient) => (
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
                            <span>{formatPhone(patient.contact)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => {
                          setEditingPatient(patient);
                          setIsAddModalOpen(true);
                        }}
                        className="p-2 rounded-lg hover:bg-indigo-50 text-indigo-400 hover:text-indigo-600 transition-colors"
                      >
                        <Plus size={18} className="rotate-45" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-400 transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-between p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-400">
                        <User size={16} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Assigned Staff</p>
                        <p className="text-sm font-bold text-neutral-700">
                          {(() => {
                            const assignment = INITIAL_ASSIGNMENTS.find(a => a.patientId === patient.id && a.status === "active");
                            const staff = INITIAL_STAFF.find(s => s.id === assignment?.employeeId);
                            return staff?.name || "Unassigned";
                          })()}
                        </p>
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
      {/* Add/Edit Patient Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-8 py-6 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
              <h2 className="text-2xl font-bold text-neutral-900">{editingPatient ? "Edit Patient" : "Add New Patient"}</h2>
              <button 
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingPatient(null);
                }}
                className="p-2 rounded-xl hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <XCircle size={24} />
              </button>
            </div>
            <div className="p-8 max-h-[70vh] overflow-y-auto">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6" id="add-patient-form">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Patient Name</label>
                  <input name="name" required type="text" defaultValue={editingPatient?.name} placeholder="e.g. Mrs. Khan" className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Contact (+92...)</label>
                  <input name="contact" required type="text" defaultValue={editingPatient?.contact} placeholder="+923001234567" className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-mono" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Condition</label>
                  <input name="condition" required type="text" defaultValue={editingPatient?.condition} placeholder="e.g. Post-surgery recovery" className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Address</label>
                  <input name="address" required type="text" defaultValue={editingPatient?.address} placeholder="e.g. Clifton, Karachi" className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                </div>
              </form>
            </div>
            <div className="px-8 py-6 bg-neutral-50/50 border-t border-neutral-100 flex items-center justify-end space-x-4">
              <button 
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingPatient(null);
                }}
                className="px-6 py-2 text-neutral-600 font-bold hover:text-neutral-900 transition-colors"
              >
                Cancel
              </button>
              <button 
                form="add-patient-form"
                type="submit"
                className="px-8 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                onClick={(e) => {
                  e.preventDefault();
                  const form = document.getElementById('add-patient-form') as HTMLFormElement;
                  const formData = new FormData(form);
                  const contact = formData.get('contact') as string;
                  const name = formData.get('name') as string;
                  const condition = formData.get('condition') as string;
                  const address = formData.get('address') as string;
                  
                  if (!validatePhone(contact)) {
                    alert('Invalid Phone format. Please use +92XXXXXXXXXX');
                    return;
                  }
                  
                  const updatedPatient: Patient = {
                    ...(editingPatient || { id: `P-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`, status: 'active' }),
                    name,
                    contact,
                    condition,
                    address
                  };

                  if (editingPatient) {
                    setPatients(prev => prev.map(p => p.id === editingPatient.id ? updatedPatient : p));
                  } else {
                    setPatients(prev => [updatedPatient, ...prev]);
                  }

                  alert(`Patient ${editingPatient ? 'updated' : 'added'} successfully!`);
                  setIsAddModalOpen(false);
                  setEditingPatient(null);
                }}
              >
                {editingPatient ? "Update Patient" : "Save Patient"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
