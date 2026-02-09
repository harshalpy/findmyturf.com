import api from "../../api";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [phone_no, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <div className="fixed inset-0 overflow-hidden bg-[url('https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?auto=compress&cs=tinysrgb&w=1200')] bg-cover bg-center bg-no-repeat">
      <div className="fixed inset-0 overflow-hidden bg-slate-950/70 flex items-center justify-center px-4">
        <div className="w-full max-w-lg">
          <div className="text-center text-slate-50 mb-6">
            <h1 className="text-3xl font-bold sm:text-4xl">
              Welcome back to FindMyTurf
            </h1>
            <p className="mt-3 text-sm text-slate-200">
              Sign in to manage your bookings or turfs with a fast, sports-first
              dashboard.
            </p>
          </div>

          <div className="w-full rounded-lg bg-white/10 p-6 shadow-xl backdrop-blur-lg border border-white/20 transition duration-300 hover:scale-105">
            <h2 className="mb-5 text-center text-xl font-bold text-white">
              Login
            </h2>

            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <div className="rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-200">
                  {error}
                </div>
              )}

              <input
                className="w-full border border-white/30 rounded-xl px-4 py-2 bg-white/90 text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="Phone number"
                value={phone_no}
                onChange={(e) => setPhone(e.target.value)}
                required
              />

              <input
                className="w-full border border-white/30 rounded-xl px-4 py-2 bg-white/90 text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                disabled={loading}
                className={`w-full rounded-lg py-3 text-sm font-semibold transition ${loading
                    ? "bg-slate-300 animate-pulse"
                    : "bg-emerald-500 text-white hover:bg-emerald-600"
                  }`}
              >
                {loading ? "Signing in..." : "Login"}
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-slate-200">
              Don't have an account?{" "}
              <Link to="/register" className="font-medium text-emerald-300">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}