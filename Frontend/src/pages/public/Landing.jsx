// import React from 'react';
// import { Link } from 'react-router-dom';
// import Button from '../../components/ui/Button.jsx';

// const Landing = () => (
//     <div className="space-y-10">
//         {/* Hero Section */}
//         <section className="flex flex-col gap-6 rounded-2xl bg-linear-to-r from-emerald-600 to-emerald-500 px-6 py-12 text-white shadow-lg md:flex-row md:items-center md:justify-between">
//             <div className="md:max-w-xl">
//                 <h1 className="text-3xl font-bold leading-tight md:text-5xl">
//                     Book top-quality sports turfs in minutes
//                 </h1>
//                 <p className="mt-3 text-lg text-emerald-50">
//                     Search nearby turfs, check real-time slots, and reserve instantly.
//                 </p>
//                 <div className="mt-6 flex gap-4">
//                     <Button as={Link} to="/turfs"  className="hover:scale-105 transition">
//                         Browse Turfs
//                     </Button>
//                     <Button as={Link} to="/register" className="hover:scale-105 transition">
//                         Get Started
//                     </Button>
//                 </div>
//             </div>
//         </section>

//         {/* Features Section */}
//         <section className="grid gap-6 md:grid-cols-3">
//             {[
//                 { title: 'Discover', desc: 'Filter by city, price, and distance.', color: 'emerald' },
//                 { title: 'Book', desc: 'See available slots and confirm quickly.', color: 'sky' },
//                 { title: 'Manage', desc: 'Owners manage turfs, courts, and bookings.', color: 'violet' },
//             ].map((item) => (
//                 <div
//                     key={item.title}
//                     className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-lg hover:scale-105`}
//                 >
//                     <div className={`mb-3 h-2 w-12 rounded-full bg-${item.color}-500`} />
//                     <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
//                     <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
//                 </div>
//             ))}
//         </section>
//     </div>
// );

// export default Landing;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button.jsx';
import { api } from '../../api';
import { toast } from "react-toastify";

const Landing = () => {
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState("");
    const [turfId, setTurfId] = useState("");
    const [sending, setSending] = useState(false);
    const [turfs, setTurfs] = useState([]);


    useEffect(() => {
        const loadTurfs = async () => {
            const { data } = await api.get("/turf/list/");
            setTurfs(data.results || data);
        };
        loadTurfs();
    }, []);


    const submitFeedback = async (e) => {
        e.preventDefault();

        if (!turfId || !rating || !message) {
            toast.error("Please complete all fields");
            return;
        }

        try {
            setSending(true);

            await api.post("/feedback/create/", {
                turf: turfId,
                rating,
                message
            });

            toast.success("Feedback submitted successfully");
            setOpen(false);
            setRating(0);
            setMessage("");
            setTurfId("");

        } catch {
            toast.error("Failed to submit feedback");
        } finally {
            setSending(false);
        }
    };


    return (
        <div className="space-y-10 relative">

            {/* Hero */}
            <section className="flex flex-col gap-6 rounded-2xl bg-linear-to-r from-emerald-600 to-emerald-500 px-6 py-12 text-white shadow-lg md:flex-row md:items-center md:justify-between">
                <div className="md:max-w-xl">
                    <h1 className="text-3xl font-bold md:text-5xl">
                        Book top-quality sports turfs in minutes
                    </h1>
                    <p className="mt-3 text-lg text-emerald-50">
                        Search nearby turfs, check real-time slots, and reserve instantly.
                    </p>
                    <div className="mt-6 flex gap-4">
                        <Button as={Link} to="/turfs">Browse Turfs</Button>
                        <Button as={Link} to="/register">Get Started</Button>
                    </div>
                </div>
            </section>

            {/* Floating button */}
            <button
                onClick={() => setOpen(true)}
                className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:bg-emerald-700"
            >
                💬
            </button>

            {open && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">

                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-3 right-3 text-gray-500"
                        >
                            ✕
                        </button>

                        <h2 className="text-lg font-semibold mb-4">Share your feedback</h2>

                        <form className="space-y-4" onSubmit={submitFeedback}>

                            {/* Turf */}
                            <select
                                value={turfId}
                                onChange={(e) => setTurfId(e.target.value)}
                                className="w-full border rounded-lg px-3 py-2"
                            >
                                <option value="">Select Turf</option>

                                {turfs.map((turf) => (
                                    <option key={turf.id} value={turf.id}>
                                        {turf.name}
                                    </option>
                                ))}
                            </select>


                            {/* Rating */}
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map(r => (
                                    <button
                                        key={r}
                                        type="button"
                                        onClick={() => setRating(r)}
                                        className={`text-2xl ${r <= rating ? "text-amber-400" : "text-gray-300"}`}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>

                            {/* Message */}
                            <textarea
                                rows={4}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full border rounded-lg px-3 py-2"
                                placeholder="Write your experience..."
                            />

                            <button
                                type="submit"
                                disabled={sending}
                                className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50"
                            >
                                {sending ? "Submitting..." : "Submit Feedback"}
                            </button>

                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Landing;
