import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Firebase registration
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user in MongoDB
      await axios.post("http://localhost:5000/api/user", {
        uid: user.uid,
        name,
        email,
      });

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Registration failed: " + err.message);
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
          🚀 Create Account
        </h2>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ borderRadius: "10px" }}
            />
          </div>

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
              background: "linear-gradient(90deg, #0078D4, #00A4FF)",
              borderRadius: "12px",
              color: "white",
              fontWeight: "bold",
              fontSize: "16px",
              boxShadow: "0 0 18px rgba(0, 174, 255, 0.6)",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Register
          </button>

          <p className="text-center" style={{ color: "#C9D7F3" }}>
            Already have an account?{" "}
            <a href="/login" style={{ color: "#9D65FF", textDecoration: "none" }}>
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
