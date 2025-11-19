import { Container, Row, Col, Card, Button, Form, Badge, Table, ListGroup, Modal } from "react-bootstrap";
import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Doughnut, Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import '../styles/hologram.css';
import { rgb } from 'd3-color';
const exportPDF = async () => {
  const jsPDF = (await import("jspdf")).default;
  const html2canvas = (await import("html2canvas")).default;
  const pdf = new jsPDF("p", "mm", "a4");
  const dashboard = document.getElementById("dashboard-root");
  if (!dashboard) return alert("Dashboard container missing.");

  const canvas = await html2canvas(dashboard, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");

  const imgWidth = 210;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  pdf.save("email-security-report.pdf");
};

// stopwords
const stopwords = [
  "the", "is", "in", "and", "to", "a", "of", "for", "on", "with", "at", "by", "from",
  "an", "be", "this", "that", "as", "or", "it", "are", "was", "you", "your", "have", "i", "we", "me"
];

// helpful date parsing supporting multiple fields
const parseDateSafe = (s) => {
  if (!s) return null;
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
};
const getEmailDate = (e) =>
  parseDateSafe(e.date) ||
  parseDateSafe(e.Date) ||
  parseDateSafe(e.receivedAt) ||
  parseDateSafe(e.sentAt) ||
  parseDateSafe(e.createdAt) ||
  parseDateSafe(e.timestamp) ||
  null;
function computeRiskScore(email, senderPhishCount = 0) {
  let score = 0;
  const conf = Math.max(0, Math.min(1, email.confidence || 0));
  score += conf * 45; 
  const phishingUrlCount = (email.urls || []).filter(u => 
    u.prediction === 1 || u.prediction === "bad"
  ).length;
  
  score += Math.min(phishingUrlCount * 12, 30);
  const flaggedWords = ["urgent", "verify", "password", "account", "login", "confirm", "update", "invoice", "payment", "bank", "suspended", "security"];
  const subj = (email.subject || "").toLowerCase();
  const found = flaggedWords.reduce((acc, w) => acc + (subj.includes(w) ? 1 : 0), 0);
  score += Math.min(found * 5, 10);
  score += Math.min(senderPhishCount * 3, 15);
  if ((email.attachments || []).some(a => /\.(exe|scr|bat|js|jar|cmd|vbs)$/i.test(a.filename || ""))) {
    score += 8;
  }
  return Math.round(Math.min(score, 100));
}

function scoreBadge(score) {
  if (score >= 80) return { variant: "danger", text: `${score} (High)` };
  if (score >= 50) return { variant: "warning", text: `${score} (Med)` };
  return { variant: "success", text: `${score} (Low)` };
}
const categoryMatchers = {
  "Banking / Payment": ["bank", "payment", "invoice", "transaction", "billing"],
  "Account / Login": ["login", "account", "verify", "password", "signin", "credentials"],
  "Delivery / Parcel": ["delivery", "shipment", "tracking", "parcel", "order"],
  "Offer / Promotion": ["offer", "discount", "coupon", "deal", "free"],
  "Crypto / Investment": ["bitcoin", "crypto", "wallet", "transfer", "exchange"],
  "General Scam": ["prize", "won", "congratulations", "claim", "urgent"]
};

function detectCategory(subject, urls = []) {
  const s = (subject || "").toLowerCase();
  for (const [cat, keywords] of Object.entries(categoryMatchers)) {
    for (const kw of keywords) if (s.includes(kw) || urls.some(u => u.toLowerCase().includes(kw))) return cat;
  }
  return "Other";
}

const SAVED_FILTERS_KEY = "email_dashboard_saved_filters_v1";
const USER_BEHAVIOR_KEY = "email_dashboard_user_behavior_v1";

export default function EmailSummary({ emails = [], onRequestRefresh = null }) {
  const [localEmails, setLocalEmails] = useState(null);
  const sourceEmails = localEmails || emails;

  const [search, setSearch] = useState("");
  const [savedFilterName, setSavedFilterName] = useState("");
  const [savedFilters, setSavedFilters] = useState(() => {
    try { return JSON.parse(localStorage.getItem(SAVED_FILTERS_KEY) || "[]"); } catch { return []; }
  });
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [refreshIntervalSec, setRefreshIntervalSec] = useState(10);
  const [chatLog, setChatLog] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [urlModal, setUrlModal] = useState({ open: false, url: null, details: null });
const heatColor = (value) => {
  if (value >= 75) return "#ef4444";      // red
  if (value >= 50) return "#f97316";      // orange
  if (value >= 30) return "#facc15";      // yellow
  if (value >= 10) return "#4ade80";      // light green
  return "#22c55e";                       // dark green
};

  const [userBehavior, setUserBehavior] = useState(() => {
    try { return JSON.parse(localStorage.getItem(USER_BEHAVIOR_KEY) || "{}"); } catch { return {}; }
  });

  const bumpBehavior = (k) => {
    setUserBehavior(prev => {
      const next = { ...prev, [k]: (prev[k] || 0) + 1 };
      localStorage.setItem(USER_BEHAVIOR_KEY, JSON.stringify(next));
      return next;
    });
  };

  // saved filters update
  const persistSavedFilters = (arr) => {
    setSavedFilters(arr);
    localStorage.setItem(SAVED_FILTERS_KEY, JSON.stringify(arr));
  };

  // apply saved filter
  const applySavedFilter = (f) => {
    if (!f) return;
    setSearch(f.q || "");
    setSelectedFilterIndex(savedFilters.indexOf(f));
  };

  // quick filter buttons
  const applyQuick = (type) => {
    if (type === "high-risk") setSearch("risk:high");
    if (type === "today") setSearch("date:today");
    if (type === "with-urls") setSearch("has:urls");
    if (type === "with-attachments") setSearch("has:attachments");
  };

  // search parser supports:
  // risk:high, date:today, has:urls, has:attachments, sender:email, subject:xxx, domain:abc
  const matchesSearch = (e, q) => {
    if (!q) return true;
    const s = q.toLowerCase().trim();
    if (s.startsWith("risk:")) {
      const val = s.split(":")[1];
      const score = e._riskScore ?? e.riskScore ?? 0;
      if (val === "high") return score >= 80;
      if (val === "med") return score >= 50 && score < 80;
      if (val === "low") return score < 50;
      return false;
    }
    if (s === "date:today") {
      const d = getEmailDate(e);
      if (!d) return false;
      const now = new Date();
      return d.toDateString() === now.toDateString();
    }
    if (s === "has:urls") return (e.urls || []).length > 0;
    if (s === "has:attachments") return (e.attachments || []).length > 0;
    if (s.startsWith("sender:")) return (e.sender || "").toLowerCase().includes(s.slice(7));
    if (s.startsWith("domain:")) {
      const d = s.slice(7);
      return (e.urls || []).some(u => (u.url || "").toLowerCase().includes(d));
    }
    // generic
    return ((e.subject || "") + " " + (e.sender || "") + " " + (e.urls || []).map(u => u.url).join(" ")).toLowerCase().includes(s);
  };

  // Filtered and enriched emails
  const filtered = useMemo(() => {
    // compute sender phishing counts quickly
    const senderCounts = {};
    sourceEmails.forEach(e => {
      const s = e.sender || "unknown";
      senderCounts[s] = senderCounts[s] || { phishing: 0, total: 0 };
      if (e.prediction === 1) senderCounts[s].phishing++;
      senderCounts[s].total++;
    });

    // enrich emails w/ risk and category
    const enriched = sourceEmails.map(e => {
      const senderPhish = (senderCounts[e.sender] && senderCounts[e.sender].phishing) || 0;
      const risk = computeRiskScore(e, senderPhish);
      const category = detectCategory(e.subject, (e.urls || []).map(u => u.url || ""));
      return { ...e, _riskScore: risk, _category: category };
    });

    // apply search behavior
    const out = enriched.filter(e => matchesSearch(e, search));
    return out;
  }, [sourceEmails, search]);

  // core stats
  const stats = useMemo(() => {
    const total = filtered.length;
    const phishingEmails = filtered.filter(e => e.prediction === 1);
    const phishingCount = phishingEmails.length;
    const clean = total - phishingCount;
    const userRisk = Math.min(100, Math.round((phishingCount / Math.max(1, total)) * 70 + (statsFromLocalBehavior(userBehavior).penalty || 0)));
    // URL counts
    const urlStats = { total: 0, phishing: 0 };
    filtered.forEach(e => (e.urls || []).forEach(u => {
      urlStats.total++;
      if (u.prediction === 1) urlStats.phishing++;
    }));

    // sender counts and reputations
    const senderCounts = {};
    filtered.forEach(e => {
      const s = e.sender || "unknown";
      senderCounts[s] = senderCounts[s] || { phishing: 0, total: 0 };
      if (e.prediction === 1) senderCounts[s].phishing++;
      senderCounts[s].total++;
    });
    const sortedPhishingSenders = Object.entries(senderCounts).map(([s, v]) => [s, v.phishing, v.total])
      .filter(([s, p]) => p > 0).sort((a, b) => b[1] - a[1]).slice(0, 10);

    const senderReputation = {};
    Object.entries(senderCounts).forEach(([s, v]) => {
      if (v.phishing >= 3) senderReputation[s] = "danger";
      else if (v.phishing > 0) senderReputation[s] = "suspicious";
      else senderReputation[s] = "trusted";
    });

    // domains
    const domainCounts = {};
    phishingEmails.forEach(e => (e.urls || []).forEach(u => {
      try {
        const host = new URL(u.url).hostname;
        domainCounts[host] = (domainCounts[host] || 0) + 1;
      } catch { }
    }));
    const sortedDomains = Object.entries(domainCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);

    // common words
    const wordFreq = {};
    phishingEmails.forEach(e => {
      const words = (e.subject || "").toLowerCase().replace(/[^a-z\s]/g, "").split(/\s+/);
      words.forEach(w => {
        if (!stopwords.includes(w) && w.length > 2) wordFreq[w] = (wordFreq[w] || 0) + 1;
      });
    });
    const commonWords = Object.entries(wordFreq).sort((a, b) => b[1] - a[1]).slice(0, 12);

    // day and hour counts (heatmap)
    const dayCounts = Array(7).fill(0);
    const hourCounts = Array(24).fill(0);
    const heat = Array.from({ length: 7 }, () => Array(24).fill(0));
    phishingEmails.forEach(e => {
      const d = getEmailDate(e);
      if (!d) return;
      dayCounts[d.getDay()]++;
      hourCounts[d.getHours()]++;
      heat[d.getDay()][d.getHours()]++;
    });

    // trend map
    const trendMap = {};
    phishingEmails.forEach(e => {
      const d = getEmailDate(e);
      if (!d) return;
      const key = d.toISOString().slice(0, 10);
      trendMap[key] = (trendMap[key] || 0) + 1;
    });
    const trendLabels = Object.keys(trendMap).sort();
    const trendData = trendLabels.map(l => trendMap[l]);

    // confidence bins
    const confBins = Array(10).fill(0);
    phishingEmails.forEach(e => {
      const c = Math.min(Math.floor((e.confidence || 0) * 10), 9);
      confBins[c]++;
    });

    // recent
    const recent = [...filtered].sort((a, b) => {
      const da = getEmailDate(a)?.getTime() || 0;
      const db = getEmailDate(b)?.getTime() || 0;
      return db - da;
    }).slice(0, 12).map(e => ({ ...e, _riskScore: e._riskScore }));

    // attachments analysis
    const attachmentsList = [];
    filtered.forEach(e => (e.attachments || []).forEach(a => attachmentsList.push({ ...a, emailId: e._id || e.id, sender: e.sender })));
    const attachmentTypes = attachmentsList.reduce((acc, a) => {
      const ext = (a.filename || "").split(".").pop()?.toLowerCase() || "unknown";
      acc[ext] = (acc[ext] || 0) + 1;
      return acc;
    }, {});
    const suspiciousAttachmentCount = attachmentsList.filter(a => /\.(exe|scr|bat|js|jar|cmd|vbs)$/i.test(a.filename || "")).length;

    // user security score (simple aggregate)
    // But we'll compute a nicer one below

    return {
      total, phishingCount, clean, urlStats,
      sortedPhishingSenders, senderReputation, sortedDomains, commonWords,
      dayCounts, hourCounts: hourCounts, heat, trendLabels, trendData, confBins,
      recentWithRisk: recent, attachmentsList, attachmentTypes, suspiciousAttachmentCount
    };
  }, [filtered, userBehavior]);

  // helper to compute simple stats from userBehavior
  function statsFromLocalBehavior(b) {
    const marked = b?.markedSafe || 0;
    const reported = b?.reported || 0;
    // penalty: if user often marks safe, apply small penalty
    const penalty = Math.min(20, Math.round((marked / Math.max(1, reported + marked)) * 20));
    return { marked, reported, penalty };
  }

  // chart datasets
  const pieData = useMemo(() => ({
    labels: ["Phishing", "Clean"],
    datasets: [{ data: [stats.phishingCount || 0, stats.clean || 0], backgroundColor: ["#ff4d4d", "#4dff88"] }]
  }), [stats.phishingCount, stats.clean]);

  const dayChartData = useMemo(() => ({
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [{ label: "Phishing", data: stats.dayCounts || [], backgroundColor: "#ff704d" }]
  }), [stats.dayCounts]);

  const hourChartData = useMemo(() => ({
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    datasets: [{
      label: "Phishing (hour)",
      data: stats.hourCounts || [],
      backgroundColor: "#ff8f66"
    }]
  }), [stats.hourCounts]);
  const trendChartData = useMemo(() => ({
    labels: stats.trendLabels || [],
    datasets: [{
      label: "Phishing (daily)",
      data: stats.trendData || [],
      borderColor: "#ff4d4d",
      backgroundColor: "rgba(255,77,77,0.12)",
      fill: true,
      tension: 0.25
    }]
  }), [stats.trendLabels, stats.trendData]);

  const confChart = useMemo(() => ({
    labels: Array.from({ length: 10 }, (_, i) => `${i * 10}-${i * 10 + 9}%`),
    datasets: [{ label: "Confidence", data: stats.confBins || [], backgroundColor: "#ffb84d" }]
  }), [stats.confBins]);

  // Alerts detection: compare today's phishing vs weekly average
  const alerts = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    const todayCount = (stats.trendLabels.indexOf(today) >= 0) ? stats.trendData[stats.trendLabels.indexOf(today)] : 0;
    const weeklyCounts = stats.trendData.slice(-7);
    const weeklyAvg = weeklyCounts.length ? (weeklyCounts.reduce((a, b) => a + b, 0) / weeklyCounts.length) : 0;
    const spike = todayCount > (weeklyAvg * 1.5) && todayCount >= 3;
    return { todayCount, weeklyAvg: Math.round(weeklyAvg), spike };
  }, [stats.trendLabels, stats.trendData]);

  // interactions: mark safe / report with optimistic UI
  const markSafe = async (emailId) => {
    setLocalEmails(prev => {
      const src = prev || emails;
      const next = src.map(e => e._id === emailId || e.id === emailId ? { ...e, prediction: 0 } : e);
      return next;
    });
    bumpBehavior("markedSafe");
    try { 
      await axios.post(`/api/emails/${emailId}/mark-safe`); 
  } catch (err) { 
      console.error(err); 
      setLocalEmails(null); 
  }
  };
  const reportEmail = async (emailId) => {
    setLocalEmails(prev => {
      const src = prev || emails;
      const next = src.map(e => e._id === emailId || e.id === emailId ? { ...e, _reported: true } : e);
      return next;
    });
    bumpBehavior("reported");
    try { await axios.post(`/api/emails/${ emailId }/report`); } catch (err) { console.error(err); setLocalEmails(null); }
  };
  const openUrlExplorer = (input) => {
    // Yeh line add karo — sirf string URL accept karega
    const urlString = typeof input === "string" ? input : input.url || "unknown";

    const details = {};
    try {
      const parsed = new URL(urlString);
      details.domain = parsed.hostname;
      details.path = parsed.pathname;
    } catch {
      details.domain = "invalid";
      details.path = "";
    }
    details.suspicious = /login|verify|account|secure|bank|update|confirm|webscr|signin/i.test(urlString);

    setUrlModal({ open: true, url: urlString, details });
  };
  // Save filter
  const saveFilter = () => {
    if (!savedFilterName) return alert("Pick a name for saved filter");
    const f = { name: savedFilterName, q: search, created: new Date().toISOString() };
    const arr = [f, ...savedFilters];
    persistSavedFilters(arr);
    setSavedFilterName("");
  };

  // delete saved filter
  const deleteSavedFilter = (idx) => {
    const arr = savedFilters.filter((_, i) => i !== idx);
    persistSavedFilters(arr);
    setSelectedFilterIndex(null);
  };

  // Auto-refresh logic: call onRequestRefresh if provided
  useEffect(() => {
    if (!autoRefresh || !onRequestRefresh) return;
    const id = setInterval(() => { onRequestRefresh(); }, Math.max(5000, refreshIntervalSec * 1000));
    return () => clearInterval(id);
  }, [autoRefresh, refreshIntervalSec, onRequestRefresh]);

  // mini-chat "assistant" that can apply filters
  const runChat = (text) => {
    const t = (text || "").toLowerCase();
    setChatLog(prev => [...prev, { role: "user", text }]);
    if (t.includes("high risk")) {
      setSearch("risk:high"); setChatLog(prev => [...prev, { role: "assistant", text: "Applied filter: high-risk emails" }]);
    } else if (t.includes("today")) {
      setSearch("date:today"); setChatLog(prev => [...prev, { role: "assistant", text: "Applied filter: today's emails" }]);
    } else if (t.startsWith("show sender ")) {
      const s = t.slice(12);
      setSearch(`sender${s}`);
      setChatLog(prev => [...prev, { role: "assistant", text: `Filtering by sender: ${s}` }]);
    } else {
      setChatLog(prev => [...prev, { role: "assistant", text: "I can run filters: 'high risk', 'today', 'show sender <x>'" }]);
    }
    setChatInput("");
  };

  // compute user security score (nice aggregate)
  const userSecurityScore = useMemo(() => {
    const total = stats.total || 0;
    const phishingPct = total ? (stats.phishingCount / total) : 0;
  
    // Base score: lower if phishing ratio is high
    let score = 100 - (phishingPct * 60);
  
    // Suspicious attachments penalize user
    score -= Math.min(stats.suspiciousAttachmentCount || 0, 5) * 4;
  
    // Too many attachment types = risky user behavior
    if (Object.keys(stats.attachmentTypes || {}).length > 8) score -= 4;
  
    // Behavior penalty (marking phishing as safe)
    const beh = statsFromLocalBehavior(userBehavior);
    score -= beh.penalty || 0;
  
    // Clamp the range
    score = Math.round(Math.max(10, Math.min(100, score)));
  
    return score;
  }, [stats, userBehavior]);
  

  // Sender relations (simple): which senders have which domains in their URLs
  const senderRelations = useMemo(() => {
    const map = {};
    filtered.forEach(e => {
      const s = e.sender || "unknown";
      (e.urls || []).forEach(u => {
        try {
          const h = new URL(u.url).hostname;
          map[s] = map[s] || new Set();
          map[s].add(h);
        } catch { }
      });
    });
    return Object.entries(map).map(([s, set]) => [s, Array.from(set)]);
  }, [filtered]);
  const generateInsight = (stats) => {
    if (stats.phishingCount === 0) return "No phishing activity detected";
    if (stats.phishingCount > stats.clean)
      return "High phishing activity detected. Most of your inbox is sketchy. Stay alert!";
    if (stats.sortedPhishingSenders?.length > 0)
      return `Watch out! Sender "${stats.sortedPhishingSenders[0][0]}" sent the most phishing emails`;

    return "Phishing levels normal. Keep monitoring";
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #071026, #0f1530, #1a2140)',
      color: '#ffffff'
    }}>
      <Container fluid className="py-5 px-3">
        <div id="dashboard-root" className="mb-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Row className="align-items-center mb-5">
              <Col md={6}>
                <h1 className="fw-bold mb-2 holo-glow" style={{ fontSize: '2.5rem' }}>Security Dashboard</h1>
                <p className="text-muted" style={{ fontSize: 16, color: '#9fd6ff' }}>Live insights & threat analysis</p>
              </Col>
              <Col md={6} className="text-end">
                <Button
                  variant="outline-info"
                  className="me-3 rounded-pill px-4 py-2"
                  onClick={exportPDF}
                  style={{
                    borderColor: 'rgba(0, 164, 255, 0.5)',
                    color: '#9fd6ff',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  📄 Export PDF
                </Button>
                <Button
                  variant="outline-info"
                  className="rounded-pill px-4 py-2"
                  onClick={onRequestRefresh}
                  style={{
                    borderColor: 'rgba(110, 58, 255, 0.5)',
                    color: '#cfefff',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  🔄 Refresh
                </Button>
              </Col>
            </Row>
          </motion.div>

          {/* Score + Quick Filters + Auto Refresh */}
          <Row className="g-4 mb-5">
            <Col md={2}>
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                className="holo-card pulse-glow p-4 text-center"
              >
                <div className="small" style={{ color: '#9fd6ff' }}>Security Score</div>
                <h2 className="fw-bold mt-2 mb-2" style={{ color: '#cfefff', fontSize: '2.5rem' }}>{userSecurityScore || 0}</h2>
                <div style={{ fontSize: 12, color: '#7fb3d3' }}>higher is better</div>
              </motion.div>
            </Col>

            <Col md={6}>
              <motion.div
                whileHover={{ y: -2 }}
                className="holo-card p-4"
              >
                <Card.Body>
                <div className="mb-3" style={{ color: '#9fd6ff', fontSize: '0.9rem' }}>Quick Filters</div>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => applyQuick("high-risk")}
                    className="rounded-pill px-3"
                    style={{ borderColor: '#ff4d4d', color: '#ff8a8a' }}
                  >
                    🔥 High Risk
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    onClick={() => applyQuick("today")}
                    className="rounded-pill px-3"
                    style={{ borderColor: '#9fd6ff', color: '#9fd6ff' }}
                  >
                    📅 Today
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-info"
                    onClick={() => applyQuick("with-urls")}
                    className="rounded-pill px-3"
                    style={{ borderColor: '#00a4ff', color: '#7fc7ff' }}
                  >
                    🔗 URLs
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-light"
                    onClick={() => applyQuick("with-attachments")}
                    className="rounded-pill px-3"
                    style={{ borderColor: '#cfefff', color: '#cfefff' }}
                  >
                    📎 Attachments
                  </Button>
                </div>

                <div className="d-flex gap-2 mt-3">
                  <Form.Control size="sm" placeholder="Save filter as..." value={savedFilterName} onChange={(e) => setSavedFilterName(e.target.value)} />
                  <Button size="sm" variant="primary" onClick={saveFilter}>Save</Button>
                </div>

                <div className="mt-2" style={{ maxHeight: 90, overflowY: "auto" }}>
                  {savedFilters.map((f, idx) => (
                    <div key={idx} className="d-flex justify-content-between align-items-center small border-bottom py-1">
                      <span>{f.name}</span>
                      <span>
                        <Button size="sm" variant="link" onClick={() => applySavedFilter(f)}>Apply</Button>
                        <Button size="sm" variant="link" onClick={() => deleteSavedFilter(idx)}>Delete</Button>
                      </span>
                    </div>
                  ))}
                </div>
              </Card.Body>
              </motion.div>
          </Col>

          <Col md={4}>
            <motion.div
              whileHover={{ y: -2 }}
              className="holo-card p-4"
            >
              <div className="mb-3" style={{ color: '#9fd6ff', fontSize: '0.9rem' }}>Auto Refresh</div>
              <div className="d-flex align-items-center gap-3 mb-3">
                <Form.Check
                  type="switch"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  style={{
                    filter: 'hue-rotate(180deg)'
                  }}
                />
                <Form.Control
                  size="sm"
                  type="number"
                  value={refreshIntervalSec}
                  onChange={(e) => setRefreshIntervalSec(Number(e.target.value || 5))}
                  style={{
                    width: 80,
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(159,214,255,0.3)',
                    color: '#cfefff'
                  }}
                />
                <span style={{ color: '#7fb3d3', fontSize: '0.8rem' }}>sec</span>
              </div>

              <div>
                {alerts.spike ? (
                  <Badge
                    className="px-3 py-2 rounded-pill"
                    style={{
                      background: 'linear-gradient(90deg, #ff4d4d, #ff6b6b)',
                      border: 'none'
                    }}
                  >
                    🚨 Spike: {alerts.todayCount || 0} today
                  </Badge>
                ) : (
                  <Badge
                    className="px-3 py-2 rounded-pill"
                    style={{
                      background: 'linear-gradient(90deg, #4dff88, #6bff9b)',
                      color: '#1a2140'
                    }}
                  >
                    ✅ No spike
                  </Badge>
                )}
              </div>
            </motion.div>
          </Col>
        </Row>

        {/* Search + AI Assistant */}
        <Row className="g-4 mb-5">
          <Col md={8}>
            <Form.Control
              placeholder="🔍 Search emails (risk:high, date:today, sender:x, etc)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(159,214,255,0.3)',
                borderRadius: '15px',
                color: '#cfefff',
                backdropFilter: 'blur(10px)',
                padding: '12px 20px'
              }}
            />
          </Col>
          <Col md={4}>
            <div className="d-flex gap-2 mb-2">
              <Form.Control
                placeholder="🤖 Ask assistant..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(159,214,255,0.3)',
                  borderRadius: '15px',
                  color: '#cfefff',
                  backdropFilter: 'blur(10px)'
                }}
              />
              <Button
                variant="outline-info"
                onClick={() => runChat(chatInput)}
                className="rounded-pill px-3"
                style={{
                  borderColor: 'rgba(110, 58, 255, 0.5)',
                  color: '#cfefff'
                }}
              >
                Ask
              </Button>
            </div>
            <div className="small" style={{ maxHeight: 60, overflowY: "auto", color: '#7fb3d3' }}>
              {chatLog.slice(-3).map((c, i) => (
                <div key={i} className="mb-1">
                  <span style={{ color: '#9fd6ff' }}>{c.role}:</span> {c.text}
                </div>
              ))}
            </div>
          </Col>
        </Row>

        {/* Main Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Row className="g-4 mb-5">
            <Col md={3}>
              <motion.div whileHover={{ scale: 1.02, y: -3 }} className="holo-card p-4 text-center">
                <div style={{ color: '#9fd6ff', fontSize: '0.85rem' }}>Total Emails</div>
                <h3 className="fw-bold mt-2" style={{ color: '#cfefff' }}>{stats.total || 0}</h3>
              </motion.div>
            </Col>
            <Col md={3}>
              <motion.div whileHover={{ scale: 1.02, y: -3 }} className="holo-card p-4 text-center">
                <div style={{ color: '#ff8a8a', fontSize: '0.85rem' }}>Phishing Detected</div>
                <h3 className="fw-bold mt-2" style={{ color: '#ff6b6b' }}>{stats.phishingCount || 0}</h3>
              </motion.div>
            </Col>
            <Col md={3}>
              <motion.div whileHover={{ scale: 1.02, y: -3 }} className="holo-card p-4 text-center">
                <div style={{ color: '#88ff9f', fontSize: '0.85rem' }}>Clean Emails</div>
                <h3 className="fw-bold mt-2" style={{ color: '#6bff9b' }}>{stats.clean || 0}</h3>
              </motion.div>
            </Col>
            <Col md={3}>
              <motion.div whileHover={{ scale: 1.02, y: -3 }} className="holo-card p-4 text-center">
                <div style={{ color: '#9fd6ff', fontSize: '0.85rem' }}>URLs Analyzed</div>
                <h3 className="fw-bold mt-2" style={{ color: '#cfefff' }}>{stats.urlStats?.total || 0}</h3>
                <div style={{ color: '#ff8a8a', fontSize: '0.75rem' }}>Phishing: {stats.urlStats?.phishing || 0}</div>
              </motion.div>
            </Col>
          </Row>
        </motion.div>

        {/* Charts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Row className="g-4 mb-5">
            <Col md={4}>
              <motion.div whileHover={{ y: -3 }} className="holo-card p-4">
                <div className="mb-3" style={{ color: '#9fd6ff', fontSize: '0.9rem' }}>📊 Breakdown</div>
                <Doughnut data={pieData} />
              </motion.div>
            </Col>
            <Col md={4}>
              <motion.div whileHover={{ y: -3 }} className="holo-card p-4">
                <div className="mb-3" style={{ color: '#9fd6ff', fontSize: '0.9rem' }}>📅 Day of Week</div>
                <Bar data={dayChartData} />
              </motion.div>
            </Col>
            <Col md={4}>
              <motion.div whileHover={{ y: -3 }} className="holo-card p-4">
                <div className="mb-3" style={{ color: '#9fd6ff', fontSize: '0.9rem' }}>🕐 Hour of Day</div>
                <Bar data={hourChartData} />
              </motion.div>
            </Col>
          </Row>
        </motion.div>

        {/* Trend + Confidence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Row className="g-4 mb-5">
            <Col md={8}>
              <motion.div whileHover={{ y: -3 }} className="holo-card p-4">
                <div className="mb-3" style={{ color: '#9fd6ff', fontSize: '0.9rem' }}>📈 Threat Trend (Daily)</div>
                <Line data={trendChartData} />
              </motion.div>
            </Col>
            <Col md={4}>
              <motion.div whileHover={{ y: -3 }} className="holo-card p-4">
                <div className="mb-3" style={{ color: '#9fd6ff', fontSize: '0.9rem' }}>🎯 Confidence Distribution</div>
                <Bar data={confChart} />
              </motion.div>
            </Col>
          </Row>
        </motion.div>

        {/* Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-5"
        >
          <Row>
            <Col md={12}>
              <motion.div whileHover={{ y: -3 }} className="holo-card p-4">
                <div className="mb-4" style={{ color: '#9fd6ff', fontSize: '1rem' }}>🔥 Threat Activity Heatmap</div>
                <div className="overflow-auto">
                  <table className="w-100" style={{ fontSize: '0.8rem' }}>
                    <thead>
                      <tr>
                        <th style={{ color: '#9fd6ff', padding: '8px' }}>Day</th>
                        {Array.from({ length: 24 }, (_, h) => <th key={h} style={{ color: '#7fb3d3', padding: '4px', textAlign: 'center' }}>{h}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {(stats.heat || []).map((row, d) => (
                        <tr key={d}>
                          <td style={{ color: '#cfefff', fontWeight: 'bold', padding: '8px' }}>
                            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d]}
                          </td>
                          {row.map((cell, h) => (
                            
                            <td
                              key={h}
                              style={{
                                background: heatColor(cell),
                                padding: '6px',
                                textAlign: 'center',
                                borderRadius: '4px',
                                margin: '1px',
                                color: cell > 0 ? '#ffffff' : '#7fb3d3',
                                fontWeight: cell > 0 ? 'bold' : 'normal'
                              }}
                            >
                              {cell || ""}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </Col>
          </Row>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Row>
            <Col md={12}>
              <motion.div whileHover={{ y: -3 }} className="holo-card p-4 mb-5">
                <div className="mb-4" style={{ color: '#9fd6ff', fontSize: '1rem' }}>📧 Recent Activity</div>
                <div className="d-flex flex-column gap-3">
                  {(stats.recentWithRisk || []).map((e, i) => {
                    const badge = scoreBadge(e._riskScore || 0);
                    const dateStr = getEmailDate(e)?.toLocaleString() || "Unknown";

                    return (
                      <motion.div
                        key={e._id || e.id || i}
                        whileHover={{ scale: 1.01, x: 5 }}
                        className="d-flex justify-content-between align-items-center p-3"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: '12px',
                          backdropFilter: 'blur(10px)'
                        }}
                      >
                        <div style={{ maxWidth: 700 }}>
                          <div className="fw-bold mb-1" style={{ color: '#cfefff' }}>{e.subject || "(no subject)"}</div>
                          <div style={{ color: '#7fb3d3', fontSize: '0.85rem' }}>
                            {e.sender || "Unknown"} • {dateStr} • {e._category || "Other"}
                          </div>
                        </div>

                        <div className="text-end">
                          <Badge
                            className="me-2 px-2 py-1 rounded-pill"
                            style={{
                              background: badge?.variant === 'danger' ? 'linear-gradient(90deg, #ff4d4d, #ff6b6b)' :
                                badge?.variant === 'warning' ? 'linear-gradient(90deg, #ffb84d, #ffc766)' :
                                  'linear-gradient(90deg, #4dff88, #6bff9b)',
                              color: badge?.variant === 'success' ? '#1a2140' : '#ffffff',
                              border: 'none'
                            }}
                          >
                            {badge?.text || "0 (Low)"}
                          </Badge>
                          {e._reported && <Badge bg="secondary" className="rounded-pill">Reported</Badge>}
                          <div className="mt-2">
                            <Button
                              size="sm"
                              variant="outline-success"
                              className="me-2 rounded-pill px-3"
                              onClick={() => markSafe(e._id || e.id)}
                              style={{ borderColor: '#4dff88', color: '#6bff9b' }}
                            >
                              ✅ Safe
                            </Button>
                            <Button
                              size="sm"
                              variant="outline-danger"
                              className="rounded-pill px-3"
                              onClick={() => reportEmail(e._id || e.id)}
                              style={{ borderColor: '#ff4d4d', color: '#ff8a8a' }}
                            >
                              🚨 Report
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </Col>
          </Row>
        </motion.div>
    </div>
      </Container >

    {/* URL Modal */ }
    < Modal
  show = { urlModal.open }
  onHide = {() => setUrlModal({ open: false, url: null, details: null })
}
size = "lg"
contentClassName = "border-0"
style = {{
  backdropFilter: 'blur(10px)'
}}
      >
  <div className="holo-card">
    <Modal.Header closeButton style={{ background: 'transparent', border: 'none' }}>
      <Modal.Title style={{ color: '#9fd6ff' }}>🔗 URL Analysis</Modal.Title>
    </Modal.Header>
    <Modal.Body style={{ background: 'transparent' }}>
      <div className="mb-3">
        <strong style={{ color: '#cfefff' }}>URL:</strong>
        <span style={{ color: '#7fb3d3', marginLeft: '8px' }}>{urlModal.url}</span>
      </div>
      <div>
        <div className="mb-2">
          <strong style={{ color: '#cfefff' }}>Domain:</strong>
          <span style={{ color: '#7fb3d3', marginLeft: '8px' }}>{urlModal.details?.domain}</span>
        </div>
        <div className="mb-2">
          <strong style={{ color: '#cfefff' }}>Path:</strong>
          <span style={{ color: '#7fb3d3', marginLeft: '8px' }}>{urlModal.details?.path}</span>
        </div>
        <div>
          <strong style={{ color: '#cfefff' }}>Suspicious:</strong>
          {urlModal.details?.suspicious ? (
            <Badge
              className="ms-2 px-2 py-1 rounded-pill"
              style={{
                background: 'linear-gradient(90deg, #ff4d4d, #ff6b6b)',
                border: 'none'
              }}
            >
              🚨 Yes
            </Badge>
          ) : (
            <Badge
              className="ms-2 px-2 py-1 rounded-pill"
              style={{
                background: 'linear-gradient(90deg, #4dff88, #6bff9b)',
                color: '#1a2140',
                border: 'none'
              }}
            >
              ✅ No
            </Badge>
          )}
        </div>
      </div>
    </Modal.Body>
    <Modal.Footer style={{ background: 'transparent', border: 'none' }}>
      <Button
        variant="outline-secondary"
        onClick={() => setUrlModal({ open: false, url: null, details: null })}
        className="rounded-pill px-4"
        style={{ borderColor: '#7fb3d3', color: '#7fb3d3' }}
      >
        Close
      </Button>
    </Modal.Footer>
  </div>
      </Modal >
    </div >
  );
}