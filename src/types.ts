export enum ApplicantStatus {
  APPLIED = "applied",
  SCREENING = "screening",
  INTERVIEW = "interview",
  OFFER = "offer",
  HIRED = "hired",
  REJECTED = "rejected"
}

export interface Applicant {
  id: string;
  name: string;
  email: string;
  phone: string;
  resumeUrl: string;
  status: ApplicantStatus;
  appliedAt: string;
  score?: number;
  aiFeedback?: string;
}

export interface Employee {
  id: string; // Assigned ID (e.g., NC-KHI-001)
  name: string;
  fatherHusbandName?: string;
  dob?: string;
  gender?: string;
  cnic?: string;
  designation: string;
  contact: string;
  email?: string;
  residentialAddress?: string;
  permanentAddress?: string;
  religion?: string;
  maritalStatus?: string;
  languageSpoken?: string;
  modeOfPayment?: {
    type: "mobile" | "bank";
    mobile?: {
      provider: string;
      number?: string;
      accountNo?: string;
      network?: string;
      accountName: string;
    };
    bank?: {
      accountName?: string;
      accountTitle?: string;
      bankName: string;
      accountNumber?: string;
      accountNo?: string;
      branch?: string;
    };
  };
  guarantor?: {
    name: string;
    relation: string;
    contact: string;
    cnic: string;
  };
  status: "active" | "onboarding" | "offboarding" | "inactive";
  department?: string;
  joinDate?: string;
  managerId?: string;
  certifications?: string[];
  vaccinationStatus?: string;
  skills?: string[];
  emergencyContact?: string;
  baseRate?: number; // Daily rate for 12h shift
  // Legacy fields for compatibility
  district?: string;
  area?: string;
  fullAddress?: string;
  age?: string;
  paymentMode?: string;
  paymentDetails?: string;
  languages?: string;
}

export interface Patient {
  id: string;
  name: string;
  contact: string;
  address: string;
  condition?: string;
  status: "active" | "discharged" | "pending";
  createdAt: string;
}

export interface Assignment {
  id: string;
  employeeId: string;
  patientId: string;
  startDate: string;
  endDate?: string;
  shift: "day" | "night" | "24h";
  status: "active" | "completed" | "cancelled";
  notes?: string;
}

export interface PTORequest {
  id: string;
  employeeId: string;
  startDate: string;
  endDate: string;
  type: "vacation" | "sick" | "personal";
  status: "pending" | "approved" | "denied";
  reason: string;
  approverId?: string;
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  reviewerId: string;
  period: string;
  status: "pending" | "completed";
  score: number;
  feedback: string;
  createdAt: string;
}

export interface OnboardingTask {
  id: string;
  employeeId: string;
  title: string;
  description: string;
  dueDate: string;
  status: "pending" | "completed";
  assignedTo: "employee" | "manager" | "it" | "hr";
}

export interface ComplianceDoc {
  id: string;
  employeeId: string;
  type: string;
  url: string;
  expiryDate?: string;
  status: "valid" | "expired" | "missing";
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  month: string; // e.g., "2026-03"
  shiftsCount: number;
  baseRate: number;
  totalAmount: number;
  status: "pending" | "paid";
  paidAt?: string;
}
