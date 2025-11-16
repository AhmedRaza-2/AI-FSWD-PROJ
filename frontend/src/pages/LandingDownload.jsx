import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function LandingDownload() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      if (!u) return navigate("/login");
      setUser(u);
    });
  }, [navigate]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = process.env.PUBLIC_URL + "/Application Files.zip";
    link.download = "Outlook_Phishing_Addin_Setup.zip";
    link.click();
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-start py-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0A0F1F, #141A34, #1B2448)",
        color: "white",
      }}
    >
      <div
        className="p-5 rounded-4 shadow-lg"
        style={{
          width: "100%",
          maxWidth: "900px",
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 style={{ color: "#7CC9FF" }}>👋 Welcome, {user.email}</h2>
          <button
            onClick={logout}
            className="btn btn-outline-light"
            style={{ borderRadius: "10px" }}
          >
            Logout
          </button>
        </div>

        <h3 className="fw-bold mb-3" style={{ color: "#9DDCFF" }}>
          📥 Download Your Outlook Phishing Detector Add-In
        </h3>

        <p style={{ color: "#C9D7F3" }}>
          Your account is active. Download the setup below and follow the
          instructions to install the protection add-in into Outlook.
        </p>

        {/* Buttons: Download + Go to Dashboard */}
        <div className="d-flex gap-3 my-3">
          <button
            onClick={handleDownload}
            className="btn btn-lg px-5 py-3"
            style={{
              background: "linear-gradient(90deg, #0078D4, #00A4FF)",
              borderRadius: "12px",
              color: "white",
              fontWeight: "bold",
              fontSize: "18px",
              boxShadow: "0 0 18px rgba(0, 174, 255, 0.6)",
            }}
          >
            ⬇️ Download Setup
          </button>

          <button
            onClick={goToDashboard}
            className="btn btn-lg btn-outline-light px-5 py-3"
            style={{ borderRadius: "12px", fontWeight: "bold", fontSize: "18px" }}
          >
            📊 Go to Dashboard
          </button>
        </div>

        <hr className="my-4" style={{ borderColor: "#3a4a75" }} />

        <h4 style={{ color: "#82C6FF" }}>📘 Installation Instructions</h4>

        <ul className="mt-3" style={{ lineHeight: "1.8", color: "#C9D7F3" }}>
          <li>Extract the ZIP file completely.</li>
          <li>Open the extracted folder and run the <b>setup.exe</b>.</li>
          <li>Allow installation permissions if Windows prompts you.</li>
          <li>After installation, open Outlook.</li>
          <li>
            The Add-in will automatically start scanning your incoming emails.
          </li>
        </ul>

        <hr className="my-4" style={{ borderColor: "#3a4a75" }} />

        <h4 style={{ color: "#E5BFFF" }}>📄 Terms & Conditions</h4>

        <p style={{ fontSize: "14px", color: "#C9D7F3" }}>
          By downloading and using this add-in, you agree that:
          <br />• You allow email meta-data (subject, sender, body text) to be
          analyzed for phishing detection.
          <br />• No personal files or attachments are collected.
          <br />• AI predictions may not be 100% accurate.
          <br />• You are responsible for verifying suspicious emails manually.
        </p>

        <p className="mt-4" style={{ fontSize: "13px", color: "#8FADE0" }}>
          Need help? Contact support.
        </p>
      </div>
    </div>
  );
}
