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
  id: string;
  name: string;
  email: string;
  designation: string;
  department: string;
  joinDate: string;
  status: "active" | "onboarding" | "offboarding" | "inactive";
  managerId?: string;
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
