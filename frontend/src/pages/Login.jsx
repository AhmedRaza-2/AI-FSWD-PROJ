import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/download");
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #0A0F1F, #141A34, #1B2448)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        className="p-5 rounded-4 shadow-lg"
        style={{
          maxWidth: "400px",
          width: "100%",
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
        }}
      >
        <h2 className="text-center mb-4" style={{ color: "#7CC9FF" }}>
          🔐 Login
        </h2>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ borderRadius: "10px" }}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ borderRadius: "10px" }}
            />
          </div>

          <button
            type="submit"
            className="btn w-100 mb-3"
            style={{
              background: "linear-gradient(90deg, #6E3AFF, #9D65FF)",
              borderRadius: "12px",
              color: "white",
              fontWeight: "bold",
              fontSize: "16px",
              boxShadow: "0 0 18px rgba(125, 85, 255, 0.6)",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Login
          </button>

          <p className="text-center" style={{ color: "#C9D7F3" }}>
            Don’t have an account?{" "}
            <a href="/register" style={{ color: "#00A4FF", textDecoration: "none" }}>
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
