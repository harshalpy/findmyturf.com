import { useNavigate } from "react-router-dom";

export default function OwnerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">
        Owner Dashboard
      </h1>

      <div className="grid gap-4 sm:grid-cols-2">
        <button
          className="rounded-xl bg-black text-white p-4 text-left"
          onClick={() => navigate("/owner/add-turf")}
        >
          <h3 className="font-semibold">Create Turf</h3>
          <p className="text-sm opacity-80">Add a new turf</p>
        </button>

        <button
          className="rounded-xl bg-white p-4 shadow text-left"
          onClick={() => navigate("/owner/turfs")}
        >
          <h3 className="font-semibold">My Turfs</h3>
          <p className="text-sm text-slate-500">Manage your turfs</p>
        </button>
      </div>
    </div>
  );
}
