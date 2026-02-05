// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import api from "../api";
// import { toast } from "react-toastify";
// import SlotSelector from "../components/SlotSelector";
// import BookingSummary from "../components/BookingSummary";

// export default function TurfDetail() {
//     const { id } = useParams();
//     const navigate = useNavigate();

//     const [turf, setTurf] = useState(null);
//     const [courts, setCourts] = useState([]);
//     const [selectedCourt, setSelectedCourt] = useState(null);

//     const [slots, setSlots] = useState([]);
//     const [selectedSlots, setSelectedSlots] = useState([]);

//     const [activeImage, setActiveImage] = useState(null);

//     const [selectedDate, setSelectedDate] = useState(
//         new Date().toISOString().split("T")[0]
//     );

//     const [loading, setLoading] = useState(true);
//     const [slotLoading, setSlotLoading] = useState(false);
//     const [bookingLoading, setBookingLoading] = useState(false);

//     useEffect(() => {
//         fetchTurf();
//     }, []);

//     useEffect(() => {
//         if (selectedCourt) fetchSlots();
//     }, [selectedDate, selectedCourt]);

//     async function fetchTurf() {
//         try {
//             const turfRes = await api.get(`/turf/${id}/`);
//             const turfData = turfRes.data;

//             setTurf(turfData);

//             const defaultImg =
//                 turfData.images?.find((img) => img.is_default)?.image_url ||
//                 turfData.images?.[0]?.image_url ||
//                 "https://via.placeholder.com/800x400";

//             setActiveImage(defaultImg);

//             const courtsRes = await api.get(`/turf/${id}/courts/`);
//             setCourts(courtsRes.data);
//         } catch (err) {
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     }

//     async function fetchSlots() {
//         setSlotLoading(true);
//         setSelectedSlots([]);

//         try {
//             const res = await api.get(
//                 `/court/${selectedCourt.id}/available-slots/`,
//                 { params: { date: selectedDate } }
//             );
//             setSlots(res.data.available_slots || []);
//         } catch (err) {
//             console.error("Slot fetch error:", err);
//         } finally {
//             setSlotLoading(false);
//         }
//     }

//     async function handleBooking() {
//         if (!selectedCourt || selectedSlots.length === 0) return;

//         // 🔐 NOT LOGGED IN → SAVE INTENT & LOGIN
//         if (!localStorage.getItem("access")) {
//             sessionStorage.setItem(
//                 "pendingBooking",
//                 JSON.stringify({
//                     court: selectedCourt.id,
//                     booking_date: selectedDate,
//                     start_time: selectedSlots[0].start_time,
//                     end_time: selectedSlots[selectedSlots.length - 1].end_time,
//                 })
//             );

//             navigate("/login");
//             return;
//         }

//         setBookingLoading(true);

//         try {
//             const res = await api.post("/booking/create/", {
//                 court: selectedCourt.id,
//                 booking_date: selectedDate,
//                 start_time: selectedSlots[0].start_time,
//                 end_time: selectedSlots[selectedSlots.length - 1].end_time,
//             });

//             navigate(`/booking/${res.data.id}`);
//         } catch (err) {
//             toast.error(err.response?.data?.error || "Booking failed");
//         } finally {
//             setBookingLoading(false);
//         }
//     }

//     if (loading) {
//         return (
//             <div className="flex min-h-screen items-center justify-center text-slate-500">
//                 Loading turf details...
//             </div>
//         );
//     }

//     if (!turf) {
//         return (
//             <div className="flex min-h-screen items-center justify-center text-red-500">
//                 Turf not found
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-slate-50 px-6 py-10">
//             <div className="mx-auto max-w-6xl grid grid-cols-1 gap-8 lg:grid-cols-3">

//                 {/* LEFT */}
//                 <div className="lg:col-span-2 space-y-6">
//                     <div className="rounded-2xl bg-white p-4 shadow-sm space-y-4">
//                         <img
//                             src={activeImage}
//                             alt={turf.name}
//                             className="h-80 w-full rounded-xl object-cover"
//                         />

//                         {turf.images?.length > 1 && (
//                             <div className="flex gap-3 overflow-x-auto">
//                                 {turf.images.map((img) => (
//                                     <button
//                                         key={img.id}
//                                         onClick={() => setActiveImage(img.image_url)}
//                                         className={`h-20 w-28 rounded-lg border ${
//                                             activeImage === img.image_url
//                                                 ? "border-slate-900"
//                                                 : "border-slate-200"
//                                         }`}
//                                     >
//                                         <img
//                                             src={img.image_url}
//                                             className="h-full w-full object-cover"
//                                         />
//                                     </button>
//                                 ))}
//                             </div>
//                         )}
//                     </div>

//                     <div className="rounded-2xl bg-white p-6 shadow-sm">
//                         <h1 className="text-2xl font-bold">{turf.name}</h1>
//                         <p className="mt-1 text-slate-600">
//                             {turf.location}, {turf.city}, {turf.state}
//                         </p>
//                         <p className="mt-4 text-sm">
//                             Timings: {turf.opening_time} – {turf.closing_time}
//                         </p>
//                     </div>
//                 </div>

//                 {/* RIGHT */}
//                 <div className="lg:sticky lg:top-8 h-fit">
//                     <div className="rounded-2xl bg-white p-6 shadow-md space-y-5">
//                         <h2 className="text-lg font-semibold">Book a Court</h2>

//                         <div className="grid grid-cols-2 gap-3">
//                             {courts.map((court) => (
//                                 <button
//                                     key={court.id}
//                                     onClick={() => setSelectedCourt(court)}
//                                     className={`rounded-xl border px-3 py-2 text-sm font-medium ${
//                                         selectedCourt?.id === court.id
//                                             ? "border-slate-900 bg-slate-900 text-white"
//                                             : "border-slate-200"
//                                     }`}
//                                 >
//                                     {court.sports_type}
//                                     <div className="text-xs">₹{court.price}/hr</div>
//                                 </button>
//                             ))}
//                         </div>

//                         <input
//                             type="date"
//                             value={selectedDate}
//                             onChange={(e) => setSelectedDate(e.target.value)}
//                             className="w-full rounded-xl border px-4 py-2 text-sm"
//                         />

//                         {selectedCourt && (
//                             slotLoading ? (
//                                 <p className="text-sm">Loading slots...</p>
//                             ) : slots.length === 0 ? (
//                                 <p className="text-sm text-red-500">No slots available</p>
//                             ) : (
//                                 <>
//                                     <SlotSelector
//                                         slots={slots}
//                                         selectedSlots={selectedSlots}
//                                         setSelectedSlots={setSelectedSlots}
//                                     />
//                                     <BookingSummary
//                                         selectedSlots={selectedSlots}
//                                         price={selectedCourt.price}
//                                     />
//                                 </>
//                             )
//                         )}

//                         <button
//                             onClick={handleBooking}
//                             disabled={!selectedCourt || selectedSlots.length === 0 || bookingLoading}
//                             className="w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white"
//                         >
//                             {bookingLoading ? "Booking..." : "Confirm Booking"}
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }


import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";
import SlotSelector from "../components/SlotSelector";
import BookingSummary from "../components/BookingSummary";

export default function TurfDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [turf, setTurf] = useState(null);
    const [courts, setCourts] = useState([]);
    const [selectedCourt, setSelectedCourt] = useState(null);

    const [slots, setSlots] = useState([]);
    const [selectedSlots, setSelectedSlots] = useState([]);

    const [activeImage, setActiveImage] = useState(null);

    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    const [loading, setLoading] = useState(true);
    const [slotLoading, setSlotLoading] = useState(false);
    const [bookingLoading, setBookingLoading] = useState(false);

    useEffect(() => {
        fetchTurf();
    }, []);

    useEffect(() => {
        if (selectedCourt) fetchSlots();
    }, [selectedDate, selectedCourt]);

    // ✅ OPEN / CLOSE CHECK
    function isTurfOpenNow(turf) {
        if (!turf?.is_open) return false;
        if (!turf.opening_time || !turf.closing_time) return false;

        const now = new Date();

        const [openH, openM] = turf.opening_time.split(":").map(Number);
        const [closeH, closeM] = turf.closing_time.split(":").map(Number);

        const openTime = new Date();
        openTime.setHours(openH, openM, 0, 0);

        const closeTime = new Date();
        closeTime.setHours(closeH, closeM, 0, 0);

        return now >= openTime && now <= closeTime;
    }

    async function fetchTurf() {
        try {
            const turfRes = await api.get(`/turf/${id}/`);
            const turfData = turfRes.data;

            setTurf(turfData);

            const defaultImg =
                turfData.images?.find((img) => img.is_default)?.image_url ||
                turfData.images?.[0]?.image_url ||
                "https://via.placeholder.com/800x400";

            setActiveImage(defaultImg);

            const courtsRes = await api.get(`/turf/${id}/courts/`);
            setCourts(courtsRes.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function fetchSlots() {
        setSlotLoading(true);
        setSelectedSlots([]);

        try {
            const res = await api.get(
                `/court/${selectedCourt.id}/available-slots/`,
                { params: { date: selectedDate } }
            );
            setSlots(res.data.available_slots || []);
        } catch (err) {
            console.error("Slot fetch error:", err);
        } finally {
            setSlotLoading(false);
        }
    }

async function handleBooking() {
    if (!selectedCourt || selectedSlots.length === 0) return;

    // ✅ CHECK LOGIN CORRECTLY
    if (!localStorage.getItem("token")) {
        sessionStorage.setItem(
            "pendingBooking",
            JSON.stringify({
                court: selectedCourt.id,
                booking_date: selectedDate,
                start_time: selectedSlots[0].start_time,
                end_time: selectedSlots[selectedSlots.length - 1].end_time,
            })
        );
        navigate("/login");
        return;
    }

    setBookingLoading(true);

    try {
        const res = await api.post("/booking/create/", {
            court: selectedCourt.id,
            booking_date: selectedDate,
            start_time: selectedSlots[0].start_time,
            end_time: selectedSlots[selectedSlots.length - 1].end_time,
        });

        navigate(`/booking/${res.data.id}`);
    } catch (err) {
        toast.error(err.response?.data?.error || "Booking failed");
    } finally {
        setBookingLoading(false);
    }
}


    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center text-slate-500">
                Loading turf details...
            </div>
        );
    }

    if (!turf) {
        return (
            <div className="flex min-h-screen items-center justify-center text-red-500">
                Turf not found
            </div>
        );
    }

    const openNow = isTurfOpenNow(turf);

    return (
        <div className="min-h-screen bg-slate-50 px-6 py-10">
            <div className="mx-auto max-w-6xl grid grid-cols-1 gap-8 lg:grid-cols-3">

                {/* LEFT */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="rounded-2xl bg-white p-4 shadow-sm space-y-4">
                        <img
                            src={activeImage}
                            alt={turf.name}
                            className="h-80 w-full rounded-xl object-cover"
                        />

                        {turf.images?.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto">
                                {turf.images.map((img) => (
                                    <button
                                        key={img.id}
                                        onClick={() => setActiveImage(img.image_url)}
                                        className={`h-20 w-28 rounded-lg border ${
                                            activeImage === img.image_url
                                                ? "border-slate-900"
                                                : "border-slate-200"
                                        }`}
                                    >
                                        <img
                                            src={img.image_url}
                                            className="h-full w-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-sm space-y-2">
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold">{turf.name}</h1>

                            <span
                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                    openNow
                                        ? "bg-green-600 text-white"
                                        : "bg-red-600 text-white"
                                }`}
                            >
                                {openNow ? "Open Now" : "Closed"}
                            </span>
                        </div>

                        <p className="text-slate-600">
                            {turf.location}, {turf.city}, {turf.state}
                        </p>

                        <p className="text-sm text-slate-500">
                            Timings: {turf.opening_time} – {turf.closing_time}
                        </p>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="lg:sticky lg:top-8 h-fit">
                    <div className="rounded-2xl bg-white p-6 shadow-md space-y-5">
                        <h2 className="text-lg font-semibold">Book a Court</h2>

                        {!openNow && (
                            <p className="text-sm text-red-600">
                                Turf is currently closed for bookings
                            </p>
                        )}

                        <div className="grid grid-cols-2 gap-3">
                            {courts.map((court) => (
                                <button
                                    key={court.id}
                                    onClick={() => setSelectedCourt(court)}
                                    disabled={!openNow}
                                    className={`rounded-xl border px-3 py-2 text-sm font-medium ${
                                        selectedCourt?.id === court.id
                                            ? "border-slate-900 bg-slate-900 text-white"
                                            : "border-slate-200"
                                    }`}
                                >
                                    {court.sports_type}
                                    <div className="text-xs">₹{court.price}/hr</div>
                                </button>
                            ))}
                        </div>

                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full rounded-xl border px-4 py-2 text-sm"
                        />

                        {selectedCourt && openNow && (
                            slotLoading ? (
                                <p className="text-sm">Loading slots...</p>
                            ) : slots.length === 0 ? (
                                <p className="text-sm text-red-500">No slots available</p>
                            ) : (
                                <>
                                    <SlotSelector
                                        slots={slots}
                                        selectedSlots={selectedSlots}
                                        setSelectedSlots={setSelectedSlots}
                                    />
                                    <BookingSummary
                                        selectedSlots={selectedSlots}
                                        price={selectedCourt.price}
                                    />
                                </>
                            )
                        )}

                        <button
                            onClick={handleBooking}
                            disabled={
                                !openNow ||
                                !selectedCourt ||
                                selectedSlots.length === 0 ||
                                bookingLoading
                            }
                            className="w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white disabled:bg-slate-300"
                        >
                            {bookingLoading ? "Booking..." : "Confirm Booking"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
