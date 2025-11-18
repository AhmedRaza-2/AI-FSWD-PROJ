// App.js
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import FeatureCard from "./pages/home";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Features from "./pages/Features";
import Contact from "./pages/Contact";
import NavbarComponent from "./components/navbar";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: "linear-gradient(135deg, #0A0F1F, #141A34, #1B2448)" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <NavbarComponent user={user} />
      <Routes>
        <Route path="/" element={<FeatureCard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<FeatureCard />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/download" element={<LandingDownload />} />
        <Route path="/dashboard" element={<Dashboard userEmail={user?.email} />} />
        <Route path="/profile" element={<Profile />} />
     </Routes>
    </Router>
  );
}

export default App;
