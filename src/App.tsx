import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OnboardingPage from "./pages/OnboardingPage";
import KanbanPage from "./pages/KanbanPage";
import CalendarPage from "./pages/CalendarPage";
import JournalPage from "./pages/JournalPage";
import OpportunitiesPage from "./pages/OpportunitiesPage";
import RoomsPage from "./pages/RoomsPage";
import ProfilePage from "./pages/ProfilePage";

import routes from "tempo-routes";

function App() {
  return (
    <AuthProvider>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            Loading...
          </div>
        }
      >
        <>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/kanban" element={<KanbanPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/opportunities" element={<OpportunitiesPage />} />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
