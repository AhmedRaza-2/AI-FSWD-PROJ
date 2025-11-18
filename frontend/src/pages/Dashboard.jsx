import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import EmailSummary from "./EmailSummary";
import { motion } from "framer-motion";
import { Container, Badge, Spinner } from "react-bootstrap"; // YEHI LINE THI MISSING!

export default function Dashboard({ userEmail }) {
  const [emails, setEmails] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const cacheRef = useRef(null);
  const [sortConfig, setSortConfig] = useState({ key: "confidence", direction: "desc" });

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === "desc" ? "asc" : "desc"
    }));
  };

  const fetchEmails = async (firstLoad = false) => {
    if (!userEmail) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/emails/${userEmail}`);
      const newData = res.data || [];

      if (JSON.stringify(newData) !== JSON.stringify(cacheRef.current)) {
        cacheRef.current = newData;
        setEmails(newData);
      }

      if (firstLoad) setInitialLoading(false);
    } catch (err) {
      console.error("Error fetching emails:", err);
      if (firstLoad) setInitialLoading(false);
    }
  };

  useEffect(() => {
    if (!userEmail) return;

    fetchEmails(true);

    const interval = setInterval(() => fetchEmails(false), 8000);
    return () => clearInterval(interval);
  }, [userEmail]);

  const sortedEmails = React.useMemo(() => {
    if (!sortConfig.key || emails.length === 0) return emails;

    return [...emails].sort((a, b) => {
      let valA = a[sortConfig.key] ?? "";
      let valB = b[sortConfig.key] ?? "";

      if (sortConfig.key === "confidence") {
        valA = parseFloat(valA) || 0;
        valB = parseFloat(valB) || 0;
      } else if (typeof valA === "string") {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [emails, sortConfig]);

  // Loading States
  if (!userEmail) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark text-light">
        <Spinner animation="border" variant="info" /> 
        <span className="ms-3 fs-4">Please log in...</span>
      </div>
    );
  }

  if (initialLoading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-dark text-light text-center">
        <Spinner animation="grow" variant="cyan" size="lg" />
        <h4 className="mt-4 text-cyan">PhishShield is scanning your inbox...</h4>
        <p className="text-muted">Building your threat intelligence matrix</p>
      </div>
    );
  }

  return (
    <div
      className="min-vh-100"
      style={{
        background: "linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1529 100%)",
        color: "#e8f4fd",
        padding: "120px 20px 100px"
      }}
    >
      <Container fluid="lg">
        {/* Epic Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-5"
        >
          <h1
            className="display-3 fw-bold mb-3"
            style={{
              background: "linear-gradient(90deg, #00ffff, #9d00ff, #00ffff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 40px rgba(0,255,255,0.5)"
            }}
          >
            PHISHIELD MATRIX
          </h1>
          <p className="display-6 fw-light opacity-90">{userEmail}</p>
          <p className="lead opacity-70 mt-3">
            Real-time AI Threat Detection • Zero Trust Email Security
          </p>
        </motion.div>

        {/* Dashboard Summary */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-5"
        >
          <EmailSummary emails={emails} onRequestRefresh={fetchEmails} />
        </motion.div>

        {/* Emails Table */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="rounded-4 overflow-hidden shadow-2xl"
          style={{
            background: "rgba(15, 23, 42, 0.85)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(0, 255, 255, 0.2)",
            boxShadow: "0 20px 60px rgba(0, 255, 255, 0.15)"
          }}
        >
          <div className="p-5">
            <h3 className="mb-4 fw-bold" style={{ color: "#00ffff" }}>
              Scanned Emails ({emails.length})
            </h3>

            <div className="table-responsive">
              <table className="table table-hover align-middle text-light" style={{ minWidth: "900px" }}>
                <thead>
                  <tr className="text-cyan opacity-80 border-bottom border-cyan border-opacity-30">
                    <th onClick={() => handleSort("subject")} style={{ cursor: "pointer" }}>
                      Subject {sortConfig.key === "subject" && (sortConfig.direction === "asc" ? "Up" : "Down")}
                    </th>
                    <th onClick={() => handleSort("sender")} style={{ cursor: "pointer" }}>
                      Sender {sortConfig.key === "sender" && (sortConfig.direction === "asc" ? "Up" : "Down")}
                    </th>
                    <th onClick={() => handleSort("prediction")} style={{ cursor: "pointer" }}>
                      Status {sortConfig.key === "prediction" && (sortConfig.direction === "asc" ? "Up" : "Down")}
                    </th>
                    <th onClick={() => handleSort("confidence")} style={{ cursor: "pointer" }}>
                      Confidence {sortConfig.key === "confidence" && (sortConfig.direction === "asc" ? "Up" : "Down")}
                    </th>
                    <th>Suspicious URLs</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedEmails.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-5 text-muted fs-4">
                        No emails found. Shield is active and monitoring...
                      </td>
                    </tr>
                  ) : (
                    sortedEmails.map((email, idx) => (
                      <motion.tr
                        key={email._id || idx}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.02 }}
                        whileHover={{ x: 8, backgroundColor: "rgba(0, 255, 255, 0.08)" }}
                        style={{
                          borderLeft: email.prediction === 1 ? "5px solid #ff3366" : "5px solid #00ff88",
                        }}
                      >
                        <td className="fw-semibold">{email.subject || "(No subject)"}</td>
                        <td className="text-info">{email.sender}</td>
                        <td>
                          <Badge
                            pill
                            bg={email.prediction === 1 ? "danger" : "success"}
                            className="px-4 py-2 fs-6"
                          >
                            {email.prediction === 1 ? "PHISHING" : "CLEAN"}
                          </Badge>
                        </td>
                        <td>
                          <span className={email.confidence > 0.8 ? "text-danger fw-bold" : "text-warning"}>
                            {(email.confidence || 0).toFixed(2)}
                          </span>
                        </td>
                        <td>
                          {email.urls?.length > 0 ? (
                            <div className="d-flex flex-column gap-2">
                              {email.urls.map((u, i) => (
                                <div key={i} className="d-flex align-items-center gap-2">
                                  <a
                                    href={u.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-cyan small text-decoration-underline"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {u.url.length > 50 ? u.url.slice(0, 50) + "..." : u.url}
                                  </a>
                                  <Badge bg={u.prediction === 1 ? "danger" : "success"} className="small">
                                    {u.prediction === 1 ? "MALICIOUS" : "SAFE"}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span className="text-muted">—</span>
                          )}
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="text-center mt-5 text-cyan opacity-50 small">
              © {new Date().getFullYear()} PhishShield Matrix • AI-Powered Email Defense System
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}