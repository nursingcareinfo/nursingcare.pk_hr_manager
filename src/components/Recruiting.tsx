import React from "react";
import { 
  UserPlus, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  BrainCircuit,
  FileText
} from "lucide-react";
import { motion } from "motion/react";
import { screenResume } from "../services/geminiService";

export default function Recruiting() {
  const [isScreening, setIsScreening] = React.useState(false);
  const [screeningResult, setScreeningResult] = React.useState<any>(null);

  const applicants = [
    { id: "1", name: "Ahmed Saeed", email: "ahmed@example.com", status: "screening", score: 85, appliedAt: "2026-03-20" },
    { id: "2", name: "Aisha Bibi", email: "aisha@example.com", status: "interview", score: 92, appliedAt: "2026-03-18" },
    { id: "3", name: "Amina Bibi", email: "amina@example.com", status: "applied", score: null, appliedAt: "2026-03-25" },
    { id: "4", name: "Anam Shabir", email: "anam@example.com", status: "rejected", score: 45, appliedAt: "2026-03-15" },
  ];

  const handleScreening = async () => {
    setIsScreening(true);
    // Mock resume text for demo
    const resumeText = "Experienced nurse assistant with 5 years in patient care. Skilled in basic medical procedures, patient monitoring, and documentation. Certified in CPR and First Aid.";
    const jobReqs = "Looking for a nurse assistant with at least 3 years of experience, medical certifications, and strong communication skills.";
    
    const result = await screenResume(resumeText, jobReqs);
    setScreeningResult(result);
    setIsScreening(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Recruiting</h1>
          <p className="text-neutral-500 mt-1">Manage your applicant pipeline and AI screening</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center space-x-2 shadow-sm">
          <UserPlus size={18} />
          <span>Add Applicant</span>
        </button>
      </div>

      {/* AI Screening Section */}
      <div className="bg-indigo-900 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <BrainCircuit size={24} className="text-indigo-300" />
              </div>
              <span className="text-indigo-200 font-semibold tracking-wider uppercase text-xs">AI-Powered Screening</span>
            </div>
            <h2 className="text-2xl font-bold mb-4">Automate your initial resume evaluation</h2>
            <p className="text-indigo-100/80 leading-relaxed">
              Our AI module analyzes resumes against job requirements, providing match scores, strengths, and recommendations in seconds.
            </p>
          </div>
          <div className="flex-shrink-0">
            <button 
              onClick={handleScreening}
              disabled={isScreening}
              className="bg-white text-indigo-900 px-8 py-4 rounded-2xl font-bold hover:bg-indigo-50 transition-all shadow-xl disabled:opacity-50 flex items-center space-x-3"
            >
              {isScreening ? (
                <>
                  <div className="w-5 h-5 border-2 border-indigo-900 border-t-transparent rounded-full animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <BrainCircuit size={20} />
                  <span>Run AI Screening</span>
                </>
              )}
            </button>
          </div>
        </div>
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
      </div>

      {screeningResult && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl border border-indigo-200 p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold flex items-center space-x-2">
              <FileText size={20} className="text-indigo-600" />
              <span>Screening Result: Ahmed Saeed</span>
            </h3>
            <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              screeningResult.recommendation === "Yes" ? "bg-emerald-100 text-emerald-700" : 
              screeningResult.recommendation === "Maybe" ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700"
            }`}>
              Recommendation: {screeningResult.recommendation}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-neutral-50 rounded-2xl border border-neutral-100">
              <p className="text-sm text-neutral-500 mb-1">Match Score</p>
              <p className="text-5xl font-black text-indigo-600">{screeningResult.score}%</p>
            </div>
            <div className="md:col-span-2 space-y-4">
              <div>
                <p className="text-sm font-bold text-neutral-900 mb-2">Strengths</p>
                <div className="flex flex-wrap gap-2">
                  {screeningResult.strengths?.map((s: string) => (
                    <span key={s} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-medium">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-900 mb-2">Summary</p>
                <p className="text-sm text-neutral-600 leading-relaxed">{screeningResult.summary}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Pipeline Table */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input 
                type="text" 
                placeholder="Search applicants..." 
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
                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Applicant</th>
                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">AI Score</th>
                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Applied Date</th>
                <th className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {applicants.map((applicant) => (
                <tr key={applicant.id} className="hover:bg-neutral-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                        {applicant.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-neutral-900">{applicant.name}</p>
                        <p className="text-xs text-neutral-500">{applicant.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      applicant.status === "interview" ? "bg-indigo-100 text-indigo-700" :
                      applicant.status === "screening" ? "bg-amber-100 text-amber-700" :
                      applicant.status === "rejected" ? "bg-rose-100 text-rose-700" : "bg-neutral-100 text-neutral-700"
                    }`}>
                      {applicant.status === "interview" && <Clock size={12} />}
                      {applicant.status === "rejected" && <XCircle size={12} />}
                      <span>{applicant.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {applicant.score ? (
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 h-1.5 w-16 bg-neutral-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${applicant.score > 80 ? "bg-emerald-500" : applicant.score > 50 ? "bg-amber-500" : "bg-rose-500"}`}
                            style={{ width: `${applicant.score}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-neutral-700">{applicant.score}%</span>
                      </div>
                    ) : (
                      <span className="text-xs text-neutral-400 font-medium italic">Not screened</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-500">{applicant.appliedAt}</td>
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
