import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = process.env.PUBLIC_URL + "/Application Files.zip";
    link.download = "Application Files.zip";
    link.click();
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0A0F1F, #141A34, #1B2448)",
        color: "white",
        padding: "20px",
      }}
    >
      <div
        className="p-5 rounded-4 shadow-lg text-center"
        style={{
          maxWidth: "650px",
          width: "100%",
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
        }}
      >
        <h1 className="fw-bold mb-3" style={{ fontSize: "32px", color: "#7CC9FF" }}>
          🚀 Outlook Phishing Detector Add‑In
        </h1>

        <p className="mb-4" style={{ fontSize: "18px", color: "#C9D7F3" }}>
          Detect suspicious emails instantly using our smart AI-powered Outlook add‑in.
          Download the setup below to get started.
        </p>

       <div className="d-flex justify-content-center gap-4 mt-4">
          <Link
            to="/login"
            className="btn btn-outline-light px-4 py-2"
            style={{
              borderRadius: "10px",
              border: "1px solid #5FB2FF",
              color: "#A9C7FF",
              boxShadow: "0 0 10px rgba(95, 178, 255, 0.5)",
              transition: "0.3s",
              animation: "glowOutline 2s ease-in-out infinite alternate",
            }}
          >
            Login
          </Link>

          <Link
            to="/register"
            className="btn px-4 py-2"
            style={{
              background: "linear-gradient(90deg, #6E3AFF, #9D65FF)",
              borderRadius: "10px",
              color: "white",
              boxShadow: "0 0 10px rgba(125, 85, 255, 0.6)",
              transition: "0.3s",
              animation: "glowFilled 2s ease-in-out infinite alternate",
            }}
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
