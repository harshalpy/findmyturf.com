import { useEffect, useState } from "react";
import api from "../config/api";
import TurfCard from "../components/TurfCard";
import TurfFilters from "../components/TurfFilters";
import useGeoLocation from "../hooks/useGeoLocation";

export default function Turfs() {
    const location = useGeoLocation();

    const [turfs, setTurfs] = useState([]);
    const [loading, setLoading] = useState(true);

    const [filters, setFilters] = useState({
        city: "",
        min_price: "",
        max_price: "",
        radius: 100,
    });

    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [hasNext, setHasNext] = useState(false);
    const [hasPrev, setHasPrev] = useState(false);

    const PAGE_SIZE = 9; // must match backend PAGE_SIZE

    // Reset page when filters or location change
    useEffect(() => {
        setPage(1);
    }, [filters, location.lat]);

    // Fetch data whenever page / filters / location change
    useEffect(() => {
        fetchTurfs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, filters, location.lat]);

    async function fetchTurfs() {
        setLoading(true);
        try {
            const res = await api.get("/turf/list/", {
                params: {
                    page,
                    city: filters.city || undefined,
                    min_price: filters.min_price || undefined,
                    max_price: filters.max_price || undefined,
                    radius: filters.radius,
                    lat: location.lat || undefined,
                    lon: location.lon || undefined,
                    sort: "distance",
                },
            });

            setTurfs(res.data.results || []);
            setCount(res.data.count || 0);
            setHasNext(Boolean(res.data.next));
            setHasPrev(Boolean(res.data.previous));
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    }

    const totalPages = Math.ceil(count / PAGE_SIZE);

    return (
        <div className="min-h-screen bg-slate-50 px-6 py-10">
            {/* HEADER */}
            <div className="mx-auto mb-8 max-w-6xl">
                <h1 className="text-3xl font-bold text-slate-900">
                    Find Turfs Near You ⚽
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                    Book football turfs, sports arenas, and play your game.
                </p>
            </div>

            {/* FILTERS */}
            <div className="mx-auto mb-8 max-w-6xl rounded-2xl bg-white p-5 shadow-sm">
                <TurfFilters filters={filters} setFilters={setFilters} />
            </div>

            {/* LIST */}
            <div className="mx-auto max-w-6xl">
                {loading ? (
                    <div className="flex items-center justify-center py-24 text-slate-500">
                        Loading turfs near you...
                    </div>
                ) : turfs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-slate-500">
                        <h3 className="mb-2 text-lg font-semibold">
                            No turfs found 😕
                        </h3>
                        <p className="text-sm">
                            Try changing filters or location.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* GRID */}
                        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
                            {turfs.map((turf) => (
                                <TurfCard key={turf.id} turf={turf} />
                            ))}
                        </div>

                        {/* PAGINATION */}
                        {count > PAGE_SIZE && (
                            <div className="mt-10 flex items-center justify-center gap-4">
                                <button
                                    disabled={!hasPrev}
                                    onClick={() => setPage((p) => p - 1)}
                                    className="rounded-lg border px-4 py-2 text-sm font-medium disabled:opacity-40"
                                >
                                    ← Previous
                                </button>

                                <span className="text-sm text-slate-600">
                                    Page {page} of {totalPages}
                                </span>

                                <button
                                    disabled={!hasNext}
                                    onClick={() => setPage((p) => p + 1)}
                                    className="rounded-lg border px-4 py-2 text-sm font-medium disabled:opacity-40"
                                >
                                    Next →
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
