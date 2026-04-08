import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "./components/layout/Navbar";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import ExerciseLibrary from "./pages/ExerciseLibrary";
import ExerciseSession from "./pages/ExerciseSession";
import ClinicianDashboard from "./pages/ClinicianDashboard";
import Auth from "./pages/Auth";
import { useState } from "react";

function App() {
  const [user, setUser] = useState<{ role: 'patient' | 'clinician' } | null>(null);

  const login = (role: 'patient' | 'clinician') => setUser({ role });
  const logout = () => setUser(null);

  return (
    <Router>
      <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-foreground">
        <Navbar user={user} logout={logout} />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<Auth login={login} />} />
            
            {/* Patient Routes */}
            <Route 
              path="/dashboard" 
              element={user?.role === 'patient' ? <Dashboard /> : <Navigate to="/auth" />} 
            />
            <Route 
              path="/library" 
              element={user ? <ExerciseLibrary /> : <Navigate to="/auth" />} 
            />
            <Route 
              path="/session/:exerciseId" 
              element={user ? <ExerciseSession /> : <Navigate to="/auth" />} 
            />

            {/* Clinician Routes */}
            <Route 
              path="/clinician" 
              element={user?.role === 'clinician' ? <ClinicianDashboard /> : <Navigate to="/auth" />} 
            />
          </Routes>
        </main>
        <Toaster position="top-right" richColors />
      </div>
    </Router>
  );
}

export default App;