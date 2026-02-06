import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";
import PageLayout from "../components/PageLayout";
import api from "../api";
import { toast } from "react-toastify";

export default function LandingPage() {
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [turfId, setTurfId] = useState("");
  const [sending, setSending] = useState(false);
  const [turfs, setTurfs] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const loadTurfs = async () => {
      try {
        const { data } = await api.get("/turf/list/");
        setTurfs(data.results || data);
      } catch (e) {
        console.error(e);
      }
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
        message,
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
    <PageLayout>
      <Hero />
      <Features />


{/* Background dim overlay */}
{open && (
  <div
    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
    onClick={() => setOpen(false)}
  />
)}

      {/* Floating feedback button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:bg-emerald-700"
      >
        💬
      </button>


      {/* Feedback Widget */}
<div className="fixed bottom-24 right-6 z-50">
<div
  className={`w-96 rounded-xl shadow-2xl backdrop-blur-xl
  bg-black/40 border border-white/20
  transition-all duration-300 origin-bottom-right
  ${dropdownOpen ? "h-[380px]" : "h-auto"}
  ${open ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"}`}
>




    {/* Header */}
<div className="flex items-center justify-between px-4 py-3 border-b border-white/20 bg-black/30 text-white">

      <h2 className="font-semibold text-sm">Share your feedback</h2>
      <button
        onClick={() => setOpen(false)}
        className="text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>
    </div>

    {/* Form */}
    <form className="p-4 space-y-3" onSubmit={submitFeedback}>
<div className="relative">
  <button
    type="button"
    onClick={() => setDropdownOpen(!dropdownOpen)}
    className="w-full border border-white/20 bg-black text-white rounded-lg px-3 py-2 text-sm flex justify-between items-center"
  >
    {turfId
      ? turfs.find(t => t.id === turfId)?.name
      : "Select Turf"}
    <span className="ml-2">▾</span>
  </button>

  {dropdownOpen && (
    <div className="absolute z-50 mt-2 w-full rounded-2xl bg-black/80 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden">
      {turfs.map((turf) => (
        <button
          key={turf.id}
          type="button"
          onClick={() => {
            setTurfId(turf.id);      // number store
            setDropdownOpen(false);
          }}
          className="w-full text-left px-4 py-2 text-white hover:bg-white/10 transition"
        >
          {turf.name}
        </button>
      ))}
    </div>
  )}
</div>



      {/* Rating */}
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRating(r)}
            className={`text-xl ${
              r <= rating ? "text-amber-400" : "text-gray-300"
            }`}
          >
            ★
          </button>
        ))}
      </div>

      <textarea
        rows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full border border-white/20 bg-white/10 text-white rounded-lg px-3 py-2 text-sm backdrop-blur"
        placeholder="Write your experience..."
      />

      <button
        type="submit"
        disabled={sending}
        className="w-full bg-emerald-500 text-white py-2 rounded-lg text-sm hover:bg-emerald-600"

      >
        {sending ? "Submitting..." : "Send"}
      </button>
    </form>
  </div>
</div>

      <Footer />
    </PageLayout>
  );
}
