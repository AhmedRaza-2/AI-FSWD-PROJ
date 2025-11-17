// App.js
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth"; // <-- import from firebase/auth

import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import FeatureCard from "./pages/home";
import LandingDownload from "./pages/LandingDownload";
import Dashboard from "./pages/Dashboard";

function App() {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserEmail(user.email);
      else setUserEmail(null);
    });
    return unsubscribe;
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingDownload />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<FeatureCard />} />
        <Route path="/download" element={<LandingDownload />} />
        <Route path="/dashboard" element={<Dashboard userEmail={userEmail} />} />
     </Routes>
    </Router>
  );
}

export default App;
