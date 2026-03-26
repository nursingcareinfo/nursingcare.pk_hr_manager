import React from "react";
import { 
  ShieldCheck, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  MoreVertical,
  Download,
  Upload
} from "lucide-react";

export default function Compliance() {
  const complianceDocs = [
    { id: "1", name: "Atif Ali", type: "I-9 Form", status: "valid", expiry: "2029-12-31" },
    { id: "2", name: "Theo", type: "W-4 Form", status: "valid", expiry: "N/A" },
    { id: "3", name: "Karim Bhai", type: "Background Check", status: "expired", expiry: "2026-03-20" },
    { id: "4", name: "Mr. Naveed", type: "Medical Certificate", status: "missing", expiry: "N/A" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Compliance Tracking</h1>
          <p className="text-neutral-500 mt-1">Track required employee documents and retention policies</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-white text-neutral-700 px-4 py-2 rounded-xl border border-neutral-200 font-medium hover:bg-neutral-50 transition-colors flex items-center space-x-2 shadow-sm">
            <Download size={18} />
            <span>Export Report</span>
          </button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center space-x-2 shadow-sm">
            <Upload size={18} />
            <span>Upload Document</span>
          </button>
        </div>
      </div>

      {/* Compliance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-emerald-50 rounded-xl">
              <CheckCircle2 size={24} className="text-emerald-600" />
            </div>
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Valid</span>
          </div>
          <p className="text-sm font-medium text-neutral-500">Compliant Documents</p>
          <p className="text-3xl font-bold text-neutral-900 mt-1">92%</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-rose-50 rounded-xl">
              <AlertCircle size={24} className="text-rose-600" />
            </div>
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Action Required</span>
          </div>
          <p className="text-sm font-medium text-neutral-500">Missing/Expired</p>
          <p className="text-3xl font-bold text-neutral-900 mt-1">14</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-indigo-50 rounded-xl">
              <ShieldCheck size={24} className="text-indigo-600" />
            </div>
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Audited</span>
          </div>
          <p className="text-sm font-medium text-neutral-500">Last Audit Date</p>
          <p className="text-3xl font-bold text-neutral-900 mt-1">Mar 20</p>
        </div>
      </div>

      {/* Document Table */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input 
                type="text" 
                placeholder="Search documents..." 
                className="pl-10 pr-4 py-2 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all w-64"
              />
            </div>
            <button className="p-2 rounded-xl border border-neutral-200 hover:bg-neutral-100 transition-colors">
              <Filter size={18} className="text-neutral-500" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50/50 border-b border-neutral-100">
                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Document Type</th>
                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Expiry Date</th>
                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {complianceDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-neutral-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 font-bold text-xs">
                        {doc.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <p className="text-sm font-bold text-neutral-900">{doc.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <FileText size={16} className="text-neutral-400" />
                      <span className="text-sm text-neutral-700 font-medium">{doc.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      doc.status === "valid" ? "bg-emerald-100 text-emerald-700" :
                      doc.status === "expired" ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"
                    }`}>
                      {doc.status === "valid" && <CheckCircle2 size={12} />}
                      {doc.status === "expired" && <AlertCircle size={12} />}
                      {doc.status === "missing" && <Clock size={12} />}
                      <span>{doc.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-500">{doc.expiry}</td>
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
      </div>
    </div>
  );
}
