import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Recruiting from "./components/Recruiting";
import Onboarding from "./components/Onboarding";
import EmployeeManagement from "./components/EmployeeManagement";
import PatientManagement from "./components/PatientManagement";
import Offboarding from "./components/Offboarding";
import Compliance from "./components/Compliance";
import Login from "./components/Login";
import { seedInitialStaff } from "./services/seedService";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        seedInitialStaff();
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/recruiting" element={<Recruiting />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/employees" element={<EmployeeManagement />} />
          <Route path="/patients" element={<PatientManagement />} />
          <Route path="/offboarding" element={<Offboarding />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
}
