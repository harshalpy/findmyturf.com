import React, { useEffect, useState } from "react";
import TurfCard from "../../components/TurfCard";
import { useNavigate } from "react-router-dom";


import api from "../../api";

const fetchOwnerTurfs = () =>
    api.get("/owner/turfs/");

export default function MyTurfs() {
  const navigate = useNavigate();
  const [turfs, setTurfs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOwnerTurfs()
      .then(res => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.results || [];

        setTurfs(data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading turfs...</p>;
  if (!turfs.length) return <button onClick={() => navigate("/owner/add-turf")}>
    + Add Turf
  </button>;

  return (
    <div className="grid grid-cols-3 gap-4">

      {turfs.map(turf => (
        <TurfCard key={turf.id} turf={turf} />
      ))}
    </div>

  );
}
