import { Assignment } from "../types";

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  { 
    id: "A-001", 
    employeeId: "NC-KHI-005", // Aaliya Siddiqui
    patientId: "P-001", // Mrs. Khan
    startDate: "2026-03-01", 
    shift: "day", 
    status: "active" 
  },
  { 
    id: "A-002", 
    employeeId: "NC-KHI-009", // Abdul Rehman
    patientId: "P-002", // Mr. Ahmed
    startDate: "2026-03-15", 
    shift: "night", 
    status: "active" 
  },
];
