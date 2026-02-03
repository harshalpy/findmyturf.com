import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";

export default function EditTurf() {
    const { turfId } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        description: "",
        location: "",
        city: "",
        state: "",
        latitude: "",
        longitude: "",
        opening_time: "",
        closing_time: "",
        is_open: true,
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchTurf();
    }, []);

    async function fetchTurf() {
        try {
            const res = await api.get(`/turf/${turfId}/`);
            const t = res.data;

            setForm({
                name: t.name || "",
                description: t.description || "",
                location: t.location || "",
                city: t.city || "",
                state: t.state || "",
                latitude: t.latitude || "",
                longitude: t.longitude || "",
                opening_time: t.opening_time?.slice(0, 5),
                closing_time: t.closing_time?.slice(0, 5),
                is_open: t.is_open,
            });
        } catch (err) {
            console.error(err);
            setError("Failed to load turf details");
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);
        setError("");

        try {
            await api.patch(`/turf/${turfId}/update/`, {
                ...form,
                latitude: form.latitude ? parseFloat(form.latitude) : null,
                longitude: form.longitude ? parseFloat(form.longitude) : null,
            });

            navigate("/owner/turfs");
        } catch (err) {
            console.error(err);
            setError("Failed to update turf");
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center text-slate-500">
                Loading turf...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 px-6 py-10">
            <div className="mx-auto max-w-3xl">

                <form
                    onSubmit={handleSubmit}
                    className="space-y-8 rounded-3xl bg-white p-8 shadow-sm"
                >
                    {/* HEADER */}
                    <header>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Edit Turf
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Update turf details and availability
                        </p>
                    </header>

                    {error && (
                        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    {/* BASIC INFO */}
                    <section className="space-y-4">
                        <h2 className="font-semibold text-slate-900">
                            Turf Information
                        </h2>

                        <input
                            className="input"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Turf Name"
                            required
                        />

                        <textarea
                            className="input"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Description"
                            rows={3}
                        />

                        <input
                            className="input"
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            placeholder="Area / Landmark"
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <input
                                className="input"
                                name="city"
                                value={form.city}
                                onChange={handleChange}
                                placeholder="City"
                            />
                            <input
                                className="input"
                                name="state"
                                value={form.state}
                                onChange={handleChange}
                                placeholder="State"
                            />
                        </div>
                    </section>

                    {/* LOCATION */}
                    <section className="space-y-4">
                        <h2 className="font-semibold text-slate-900">
                            Coordinates
                        </h2>

                        <div className="grid grid-cols-2 gap-4">
                            <input
                                className="input"
                                type="number"
                                step="any"
                                name="latitude"
                                value={form.latitude}
                                onChange={handleChange}
                                placeholder="Latitude"
                            />
                            <input
                                className="input"
                                type="number"
                                step="any"
                                name="longitude"
                                value={form.longitude}
                                onChange={handleChange}
                                placeholder="Longitude"
                            />
                        </div>
                    </section>

                    {/* TIMING */}
                    <section className="space-y-4">
                        <h2 className="font-semibold text-slate-900">
                            Operating Hours
                        </h2>

                        <div className="grid grid-cols-2 gap-4">
                            <input
                                className="input"
                                type="time"
                                name="opening_time"
                                value={form.opening_time}
                                onChange={handleChange}
                            />
                            <input
                                className="input"
                                type="time"
                                name="closing_time"
                                value={form.closing_time}
                                onChange={handleChange}
                            />
                        </div>
                    </section>

                    {/* TOGGLE */}
                    <label className="flex items-center gap-3 text-sm">
                        <input
                            type="checkbox"
                            name="is_open"
                            checked={form.is_open}
                            onChange={handleChange}
                        />
                        Turf is open for bookings
                    </label>

                    {/* ACTIONS */}
                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={saving}
                            className={`flex-1 rounded-2xl py-3 text-sm font-semibold transition ${saving
                                    ? "bg-slate-300"
                                    : "bg-slate-900 text-white hover:bg-slate-800"
                                }`}
                        >
                            {saving ? "Saving..." : "Save Changes"}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="rounded-2xl border px-5 py-3 text-sm font-medium hover:bg-slate-50"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
