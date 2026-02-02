import { Routes, Route } from "react-router-dom";
import TurfDetail from "./pages/SingleTurf";
import TurfPage from "./pages/Turfs";
import AuthPage from "./pages/Auth/AuthPage";
import LandingPage from "./pages/LandingPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/turf/:id" element={<TurfDetail />} />
      <Route path="/turfs" element={<TurfPage />} />
      <Route path="/login" element={<AuthPage />} />
    </Routes>
  );
}
