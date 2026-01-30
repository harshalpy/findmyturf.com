import { useState } from "react";
import baseApi from "../base.js";
import Input from "../components/input.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleLogin(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await api.post("/auth/login/", {
                phone_no: phone,
                password,
            });

            localStorage.setItem("access", res.data.access);
            localStorage.setItem("refresh", res.data.refresh);

            navigate("/"); // redirect after login
        } catch (err) {
            setError("Invalid phone number or password");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #111827, #1f2937)",
            }}
        >
            <form
                onSubmit={handleLogin}
                style={{
                    background: "#fff",
                    padding: "40px",
                    borderRadius: "16px",
                    width: "100%",
                    maxWidth: "420px",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                }}
            >
                <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
                    Welcome Back 👋
                </h2>

                <Input
                    label="Phone Number"
                    type="text"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {error && (
                    <p style={{ color: "red", fontSize: "14px", textAlign: "center" }}>
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        padding: "14px",
                        borderRadius: "12px",
                        border: "none",
                        background: "#111827",
                        color: "#fff",
                        fontSize: "16px",
                        cursor: "pointer",
                    }}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p style={{ textAlign: "center", fontSize: "14px" }}>
                    Don’t have an account?{" "}
                    <span
                        style={{ color: "#2563eb", cursor: "pointer" }}
                        onClick={() => navigate("/register")}
                    >
                        Sign up
                    </span>
                </p>
            </form>
        </div>
    );
}
