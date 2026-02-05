import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api";
import useAuth from "../../hooks/useAuth";
import PageLayout from "../../components/PageLayout";
import { TurfCardShimmer } from "../../components/Shimmers";

export default function Register() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [role, setRole] = useState("user");
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // shimmer loading state
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setPageLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

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

    // ✅ shimmer screen
    if (pageLoading) {
        return (
            <PageLayout>
                <div className="min-h-screen flex items-center justify-center px-4">
                    <div className="w-full max-w-md">
                        <TurfCardShimmer />
                    </div>
                </div>
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="w-full max-w-md rounded-2xl bg-white/95 backdrop-blur border p-8 space-y-6 shadow">
                    <h1 className="text-xl font-bold text-center">
                        Create Account
                    </h1>

                    {/* ROLE SWITCH */}
                    <div className="flex rounded-xl border overflow-hidden">
                        <button
                            type="button"
                            onClick={() => setRole("user")}
                            className={`flex-1 py-2 text-sm font-medium ${
                                role === "user"
                                    ? "bg-slate-900 text-white"
                                    : "bg-white"
                            }`}
                        >
                            User
                        </button>

                        <button
                            type="button"
                            onClick={() => setRole("owner")}
                            className={`flex-1 py-2 text-sm font-medium ${
                                role === "owner"
                                    ? "bg-slate-900 text-white"
                                    : "bg-white"
                            }`}
                        >
                            Business
                        </button>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-4">
                        {error && (
                            <div className="rounded-xl bg-red-50 px-4 py-2 text-sm text-red-600">
                                {error}
                            </div>
                        )}

                        <input
                            className="input"
                            placeholder="Full name"
                            onChange={(e) => set("name", e.target.value)}
                            required
                        />

                        <input
                            className="input"
                            placeholder="Phone number"
                            onChange={(e) => set("phone", e.target.value)}
                            required
                        />

                        <input
                            className="input"
                            type="password"
                            placeholder="Password"
                            onChange={(e) => set("password", e.target.value)}
                            required
                        />

                        {role === "owner" && (
                            <input
                                className="input"
                                placeholder="Business name"
                                onChange={(e) =>
                                    set("business", e.target.value)
                                }
                                required
                            />
                        )}

                        <button
                            disabled={loading}
                            className={`w-full rounded-xl py-3 text-sm font-semibold transition ${
                                loading
                                    ? "bg-slate-300"
                                    : "bg-slate-900 text-white hover:bg-slate-800"
                            }`}
                        >
                            {loading ? "Creating..." : "Create Account"}
                        </button>
                    </form>

                    <p className="text-center text-sm text-slate-500">
                        Already have an account?{" "}
                        <Link to="/login" className="font-medium text-black">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </PageLayout>
    );
}
