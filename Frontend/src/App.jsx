import { Routes, Route } from "react-router-dom";
import TurfDetail from "./pages/SingleTurf";
import TurfPage from "./pages/Turfs";
import AuthPage from "./pages/Auth/AuthPage";
import LandingPage from "./pages/LandingPage";
import BookingDetail from "./pages/BookingDetail";
import MyBookings from "./pages/Mybooking";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import AddCourt from "./pages/owner/AddCourt";
import MyCourts from "./pages/owner/MyCourts";
import MyTurfs from "./pages/owner/MyTurfs";
import EditCourt from "./pages/owner/EditCourt";
import AddTurf from "./pages/owner/AddTurf";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/turf/:id" element={<TurfDetail />} />
            <Route path="/turfs" element={<TurfPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/booking/:id" element={<BookingDetail />} />
            <Route path="/my-bookings" element={<MyBookings />} />

            <Route path="/owner">
                <Route index element={<OwnerDashboard />} />
                <Route path="turfs" element={<MyTurfs />} />
                <Route path="add-turf" element={<AddTurf />} />
                <Route path="turf/:turfId/courts/add" element={<AddCourt />} />
                <Route path="turf/:turfId/courts" element={<MyCourts />} />
                <Route path="court/:courtId/edit" element={<EditCourt />} />
            </Route>
        </Routes>
    );
}