import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

function Landing() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = process.env.PUBLIC_URL + "/Application Files.zip"; 
    link.download = "Application Files.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif", maxWidth: "700px", margin: "auto" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "10px" }}>🚀 Outlook Phishing Detector Add-In</h1>
      <p style={{ fontSize: "18px", marginBottom: "20px" }}>Yo! Download the Outlook add-in below.</p>
      <button onClick={handleDownload} style={{ padding: "14px 24px", backgroundColor: "#0078D4", color: "white", fontSize: "18px", borderRadius: "8px", border: "none", cursor: "pointer", marginBottom: "25px" }}>
        ⬇️ Download Add-In
      </button>
      <div>
        <Link to="/login" style={{ marginRight: "15px" }}>Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
