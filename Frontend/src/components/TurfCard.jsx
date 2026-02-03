import { useNavigate } from "react-router-dom";

export default function TurfCard({ turf }) {
    const navigate = useNavigate();
    function getTurfImage(turf) {
        if (!turf?.images || turf.images.length === 0) {
            return "https://via.placeholder.com/400x250";
        }

        const defaultImg = turf.images.find(img => img.is_default);
        return defaultImg?.image_url || turf.images[0].image_url;
    }

    const displayPrice = turf.min_price ?? (turf.courts?.length ? Math.min(...turf.courts.map(c => c.price)): null);

    return (
        <div
            onClick={() => navigate(`/turf/${turf.id}`)}
            className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
            {/* IMAGE */}
            <div className="relative h-48 w-full overflow-hidden">
                <img
                    src={getTurfImage(turf)}
                    alt={turf.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {turf.distance_km && (
                    <div className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white">
                        {turf.distance_km} km
                    </div>
                )}
            </div>

            {/* CONTENT */}
            <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold text-slate-900">
                    {turf.name}
                </h3>

                <p className="text-sm text-slate-600">
                    {turf.city}, {turf.state}
                </p>

                <div className="mt-3 flex items-center justify-between">

                    <span className="text-base font-bold text-slate-900">
                        ₹{displayPrice}
                        <span className="text-sm font-normal text-slate-600">
                            {" "}
                            / hour
                        </span>
                    </span>

                    <span className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white transition group-hover:bg-slate-800">
                        View Courts
                    </span>
                </div>
            </div>
        </div>
    );
}