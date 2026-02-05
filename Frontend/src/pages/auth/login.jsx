import api from "../../api";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import { CourtCardShimmer } from "../../components/Shimmers";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [phone_no, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState("");

  // page shimmer load
  useEffect(() => {
    const t = setTimeout(() => setPageLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/login/", {
        phone_no,
        password,
      });

      login(res.data.access, res.data.role);

      if (res.data.role === "OWNER") {
        navigate("/owner/turfs");
      } else {
        navigate("/turfs");
      }
    } catch (err) {
      setError("Invalid phone number or password");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="w-full max-w-md">
            <CourtCardShimmer />
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl bg-white/95 backdrop-blur border p-8 space-y-6 shadow-sm">
          <h1 className="text-xl font-bold text-center">
            FindMyTurf
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="rounded-xl bg-red-50 px-4 py-2 text-sm text-red-600">
                {error}
              </div>
            )}

            <input
              className="input"
              placeholder="Phone number"
              value={phone_no}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <input
              className="input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              disabled={loading}
              className={`w-full rounded-xl py-3 text-sm font-semibold transition ${
                loading
                  ? "bg-slate-300"
                  : "bg-slate-900 text-white hover:bg-slate-800"
              }`}
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500">
            Don’t have an account?{" "}
            <Link to="/register" className="font-medium text-black">
              Register
            </Link>
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
