import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api";
import useAuth from "../../hooks/useAuth";

export default function Register() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [role, setRole] = useState("user");
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const set = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            if (role === "user") {
                await api.post("/auth/register/user/", {
                    name: form.name,
                    phone_no: form.phone,
                    password: form.password,
                });
            } else {
                await api.post("/auth/register/owner/", {
                    name: form.name,
                    phone_no: form.phone,
                    password: form.password,
                    business_name: form.business,
                });
            }

            navigate("/login");
        } catch (err) {
            setError("Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 overflow-y-auto bg-[url('https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?auto=compress&cs=tinysrgb&w=1200')] bg-cover bg-center bg-no-repeat">
            <div className="min-h-full bg-slate-950/70 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-lg">
                    <div className="text-center text-slate-50 mb-6">
                        <h1 className="text-3xl font-bold sm:text-4xl">
                            Create your FindMyTurf account
                        </h1>
                    </div>

                    <div className="w-full rounded-lg bg-white/10 p-6 shadow-xl backdrop-blur-lg border border-white/20">
                        <h2 className="text-xl font-bold text-center text-white mb-4">
                            Create Account
                        </h2>

                        {/* ROLE SWITCH */}
                        <div className="flex overflow-hidden rounded-lg border border-white/20 bg-white/10">
                            <button
                                type="button"
                                onClick={() => setRole("user")}
                                className={`flex-1 py-2 text-sm font-medium ${role === "user"
                                        ? "bg-emerald-500 text-white"
                                        : "bg-transparent text-slate-200"
                                    }`}
                            >
                                User
                            </button>

                            <button
                                type="button"
                                onClick={() => setRole("owner")}
                                className={`flex-1 py-2 text-sm font-medium ${role === "owner"
                                        ? "bg-emerald-500 text-white"
                                        : "bg-transparent text-slate-200"
                                    }`}
                            >
                                Business
                            </button>
                        </div>

                        <form onSubmit={handleRegister} className="mt-6 space-y-5">
                            {error && (
                                <div className="rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-200">
                                    {error}
                                </div>
                            )}

                            <input
                                className="w-full border border-white/30 rounded-xl px-4 py-2 bg-white/90 text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none"
                                placeholder="Full name"
                                onChange={(e) => set("name", e.target.value)}
                                required
                            />

                            <input
                                className="w-full border border-white/30 rounded-xl px-4 py-2 bg-white/90 text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none"
                                placeholder="Phone number"
                                onChange={(e) => set("phone", e.target.value)}
                                required
                            />

                            <input
                                className="w-full border border-white/30 rounded-xl px-4 py-2 bg-white/90 text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none"
                                type="password"
                                placeholder="Password"
                                onChange={(e) => set("password", e.target.value)}
                                required
                            />

                            {role === "owner" && (
                                <input
                                    className="w-full border border-white/30 rounded-xl px-4 py-2 bg-white/90 text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none"
                                    placeholder="Business name"
                                    onChange={(e) =>
                                        set("business", e.target.value)
                                    }
                                    required
                                />
                            )}

                            <button
                                disabled={loading}
                                className={`w-full rounded-lg py-3 text-sm font-semibold transition ${loading
                                        ? "bg-slate-300 animate-pulse"
                                        : "bg-emerald-500 text-white hover:bg-emerald-600"
                                    }`}
                            >
                                {loading ? "Creating..." : "Create Account"}
                            </button>
                        </form>

                        <p className="mt-5 text-center text-sm text-slate-200">
                            Already have an account?{" "}
                            <Link to="/login" className="font-medium text-emerald-300">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}