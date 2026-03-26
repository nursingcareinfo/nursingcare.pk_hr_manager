import { Patient } from "../types";

export const INITIAL_PATIENTS: Patient[] = [
  { 
    id: "P-001", 
    name: "Mrs. Khan", 
    contact: "+923001234567", 
    address: "House 45, Street 2, Clifton Block 5, Karachi", 
    condition: "Post-surgery recovery", 
    status: "active", 
    createdAt: "2026-03-01T10:00:00Z" 
  },
  { 
    id: "P-002", 
    name: "Mr. Ahmed", 
    contact: "+923217654321", 
    address: "Apartment 12, Gulshan Block 13-D, Karachi", 
    condition: "Elderly care", 
    status: "active", 
    createdAt: "2026-03-15T14:30:00Z" 
  },
  { 
    id: "P-003", 
    name: "Ms. Fatima", 
    contact: "+923339876543", 
    address: "House 78, DHA Phase 6, Karachi", 
    condition: "Physiotherapy", 
    status: "pending", 
    createdAt: "2026-03-20T09:15:00Z" 
  },
];
