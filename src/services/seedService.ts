import { db } from "../firebase";
import { collection, setDoc, doc, getDocs, query, limit } from "firebase/firestore";
import { INITIAL_STAFF } from "../data/initialStaff";

export async function seedInitialStaff() {
  const staffCollection = collection(db, "employees");
  const q = query(staffCollection, limit(1));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    console.log("Seeding initial staff data...");
    for (const staff of INITIAL_STAFF) {
      const employeeData = {
        id: staff.id,
        name: staff.name,
        email: `${staff.name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
        designation: staff.designation,
        department: "General",
        joinDate: new Date().toISOString().split("T")[0],
        status: "active",
        district: staff.district || "",
        contact: staff.contact || "",
        cnic: staff.cnic || "",
        gender: staff.gender || ""
      };
      
      try {
        await setDoc(doc(db, "employees", staff.id), employeeData);
      } catch (error) {
        console.error(`Error seeding staff ${staff.id}:`, error);
      }
    }
    console.log("Initial staff data seeded successfully.");
  } else {
    console.log("Staff data already exists, skipping seed.");
  }
}
