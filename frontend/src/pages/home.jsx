import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Image,
  Badge,
} from 'react-bootstrap';
import Waves from '../components/Waves';
import FooterComponent from '../components/Footer';

// PhishShield (React-Bootstrap + Framer Motion) — Sci‑Fi / Hologram UI
// Notes:
// - Functionality preserved: download handler, image path, routing Links.
// - Visuals enhanced with custom CSS injected into the component for a futuristic hologram look.

function FeatureCard({ icon, title, children }) {
  return (
    <motion.div whileHover={{ y: -6 }} className="holo-card">
      <div className="d-flex gap-3 align-items-start">
        <div className="holo-icon d-flex align-items-center justify-content-center">{icon}</div>
        <div>
          <h5 className="text-sky">{title}</h5>
          <p className="muted small mb-0">{children}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function PhishingLanding() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = process.env.PUBLIC_URL + "/Application Files.zip";
    link.download = "Application Files.zip";
    link.click();
  };

  // Inject CSS for the futuristic/hologram look
  useEffect(() => {
    const css = `
      :root{
        --bg-1: #071026;
        --bg-2: #0f1530;
        --neon-1: rgba(110,58,255,0.95);
        --neon-2: rgba(0,164,255,0.95);
        --glass: rgba(255,255,255,0.04);
      }

      .phish-shell{
        background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 25%, #0f1529 50%, #16213d 75%, #0d1832 100%);
        min-height:100vh;
        color: #e8f4fd;
        position: relative;
        overflow-x: hidden;
      }
      .phish-container{
        padding-top: 0;
        padding-bottom: 0;
        padding-left: 0;
        padding-right: 0;
        max-width: 100%;
      }

      /* VS Code-Inspired Hero Section */
      .hero-section{
        position: relative;
        padding: 2rem 1.5rem 4rem;
        min-height: 85vh;
        display: flex;
        align-items: center;
        width: 100%;
        margin: 0;
      }

      .hero-background-gradient{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: 
          radial-gradient(circle at 20% 20%, rgba(0,164,255,0.03) 0%, transparent 50%),
          radial-gradient(circle at 80% 60%, rgba(110,58,255,0.02) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(159,214,255,0.015) 0%, transparent 40%);
        z-index: 1;
        pointer-events: none;
      }

      .hero-content{
        position: relative;
        z-index: 10;
      }

      .hero-section .container {
        position: relative;
        z-index: 10;
      }

      .hero-badge{
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.25rem;
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(159,214,255,0.15);
        border-radius: 50px;
        backdrop-filter: blur(10px);
      }

      .badge-icon{
        font-size: 1.1rem;
      }

      .badge-text{
        color: #9fd6ff;
        font-weight: 600;
        font-size: 0.9rem;
        letter-spacing: 0.025em;
      }

      .hero-heading{
        font-size: 3.75rem;
        font-weight: 800;
        line-height: 1.1;
        color: #ffffff;
        letter-spacing: -0.025em;
        margin-bottom: 1.5rem;
      }

      .text-gradient{
        background: linear-gradient(135deg, var(--neon-2), var(--neon-1));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .hero-description{
        font-size: 1.25rem;
        line-height: 1.6;
        color: rgba(232,244,253,0.8);
        max-width: 500px;
        margin-bottom: 2rem;
      }

      .hero-actions{
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-bottom: 3rem;
      }

      .btn-primary-hero{
        padding: 1rem 2rem;
        font-size: 1.1rem;
        font-weight: 600;
        background: linear-gradient(135deg, var(--neon-2), var(--neon-1));
        border: none;
        border-radius: 8px;
        color: white;
        box-shadow: 0 4px 15px rgba(0,164,255,0.25);
        transition: all 0.2s ease;
      }

      .btn-primary-hero:hover{
        background: linear-gradient(135deg, #00a8ff, #8b5cff);
        box-shadow: 0 6px 20px rgba(0,164,255,0.35);
        transform: translateY(-1px);
        color: white;
      }

      .btn-secondary-hero{
        padding: 1rem 2rem;
        font-size: 1.1rem;
        font-weight: 600;
        background: transparent;
        border: 1px solid rgba(159,214,255,0.25);
        border-radius: 8px;
        color: #9fd6ff;
        transition: all 0.2s ease;
      }

      .btn-secondary-hero:hover{
        background: rgba(159,214,255,0.05);
        border-color: rgba(159,214,255,0.4);
        color: #cfefff;
        transform: translateY(-1px);
      }

      .hero-stats{
        position: relative;
        z-index: 2;
      }

      .stats-grid{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        max-width: 400px;
      }

      .stat-item{
        text-align: left;
      }

      .stat-number{
        font-size: 2rem;
        font-weight: 800;
        color: #ffffff;
        line-height: 1;
        margin-bottom: 0.25rem;
      }

      .stat-label{
        font-size: 0.875rem;
        color: rgba(232,244,253,0.7);
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      /* Visual Section */
      .hero-visual{
        position: relative;
        z-index: 2;
      }

      .visual-container{
        position: relative;
        height: 500px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .main-preview-card{
        width: 100%;
        max-width: 500px;
        background: rgba(255,255,255,0.02);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 12px;
        box-shadow: 
          0 20px 40px rgba(0,0,0,0.15),
          0 10px 25px rgba(0,164,255,0.05);
        backdrop-filter: blur(20px);
        overflow: hidden;
      }

      .preview-header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 1.25rem;
        background: rgba(255,255,255,0.03);
        border-bottom: 1px solid rgba(255,255,255,0.05);
      }

      .preview-controls{
        display: flex;
        gap: 0.5rem;
      }

      .control-dot{
        width: 12px;
        height: 12px;
        border-radius: 50%;
        display: block;
      }

      .control-dot.red{background: #ff5f57;}
      .control-dot.yellow{background: #ffbd2e;}
      .control-dot.green{background: #28ca42;}

      .preview-title{
        color: rgba(232,244,253,0.8);
        font-weight: 600;
        font-size: 0.9rem;
      }

      .preview-content{
        position: relative;
        height: 300px;
      }

      .main-preview-image{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .preview-overlay{
        position: absolute;
        bottom: 1rem;
        left: 1rem;
        right: 1rem;
      }

      .status-indicator{
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1rem;
        background: rgba(0,0,0,0.6);
        border-radius: 8px;
        backdrop-filter: blur(10px);
      }

      .status-dot{
        width: 8px;
        height: 8px;
        background: #28ca42;
        border-radius: 50%;
        animation: statusPulse 2s infinite;
      }

      @keyframes statusPulse{
        0%, 100%{opacity: 1;}
        50%{opacity: 0.4;}
      }

      .status-text{
        color: #ffffff;
        font-size: 0.875rem;
        font-weight: 500;
      }

      /* Floating Elements */
      .floating-element{
        position: absolute;
        background: rgba(255,255,255,0.08);
        border: 1px solid rgba(255,255,255,0.12);
        border-radius: 12px;
        backdrop-filter: blur(15px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.1);
      }

      .security-score{
        top: 15%;
        right: -15%;
        padding: 1rem;
        width: 180px;
      }

      .score-content{
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .score-icon{
        font-size: 1.5rem;
      }

      .score-value{
        color: #28ca42;
        font-weight: 700;
        font-size: 1.1rem;
      }

      .score-subtitle{
        color: rgba(232,244,253,0.7);
        font-size: 0.8rem;
      }

      .threat-blocked{
        bottom: 20%;
        left: -10%;
        padding: 0.75rem 1rem;
        width: 160px;
      }

      .threat-content{
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .threat-icon{
        font-size: 1.25rem;
      }

      .threat-text{
        color: #ff5f57;
        font-weight: 600;
        font-size: 0.9rem;
      }

      .scan-status{
        top: 50%;
        right: -20%;
        padding: 1rem;
        width: 180px;
      }

      .scan-content{
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .scan-icon{
        font-size: 1.5rem;
      }

      .scan-status-text{
        color: #9fd6ff;
        font-weight: 600;
        font-size: 0.9rem;
        margin-bottom: 0.25rem;
      }

      .scan-progress{
        width: 80px;
        height: 4px;
        background: rgba(159,214,255,0.2);
        border-radius: 2px;
        overflow: hidden;
      }

      .scan-bar{
        width: 60%;
        height: 100%;
        background: linear-gradient(90deg, var(--neon-2), var(--neon-1));
        border-radius: 2px;
        animation: scanProgress 2s ease-in-out infinite alternate;
      }

      @keyframes scanProgress{
        0%{width: 20%;}
        100%{width: 80%;}
      }

      /* Features Section */
      .features-section{
        padding: 6rem 0;
        background: rgba(255,255,255,0.01);
      }

      .section-heading{
        font-size: 2.5rem;
        font-weight: 700;
        color: #ffffff;
        margin-bottom: 1rem;
      }

      .section-description{
        font-size: 1.2rem;
        color: rgba(232,244,253,0.8);
        line-height: 1.6;
      }

      .feature-card{
        padding: 2rem;
        background: rgba(255,255,255,0.02);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 16px;
        text-align: center;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
      }

      .feature-card:hover{
        background: rgba(255,255,255,0.04);
        border-color: rgba(159,214,255,0.2);
        box-shadow: 0 10px 40px rgba(0,164,255,0.1);
      }

      .feature-icon{
        font-size: 3rem;
        display: block;
      }

      .feature-title{
        color: #9fd6ff;
        font-weight: 600;
        font-size: 1.25rem;
      }

      .feature-description{
        color: rgba(232,244,253,0.8);
        line-height: 1.6;
        margin: 0;
      }

      /* Use Cases Section */
      .use-cases-section{
        padding: 6rem 0;
        background: linear-gradient(135deg, rgba(110,58,255,0.02) 0%, rgba(0,164,255,0.01) 100%);
      }

      .use-case-card{
        padding: 2.5rem;
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 20px;
        transition: all 0.3s ease;
        backdrop-filter: blur(15px);
      }

      .use-case-card:hover{
        background: rgba(255,255,255,0.05);
        border-color: rgba(159,214,255,0.25);
        box-shadow: 0 15px 50px rgba(0,164,255,0.08);
      }

      .use-case-header{
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: wrap;
        gap: 0.5rem;
      }

      .use-case-title{
        color: #ffffff;
        font-weight: 600;
        font-size: 1.3rem;
        margin: 0;
      }

      .use-case-badge{
        background: linear-gradient(135deg, rgba(110,58,255,0.2), rgba(0,164,255,0.15));
        color: #9fd6ff;
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: 500;
        border: 1px solid rgba(159,214,255,0.2);
      }

      .use-case-description{
        color: rgba(232,244,253,0.8);
        line-height: 1.6;
        margin-bottom: 1.5rem;
      }

      .use-case-features{
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .use-case-features li{
        color: rgba(232,244,253,0.9);
        padding: 0.5rem 0;
        position: relative;
        padding-left: 1.5rem;
      }

      .use-case-features li::before{
        content: "✓";
        color: #28ca42;
        font-weight: bold;
        position: absolute;
        left: 0;
      }

      /* CTA Section */
      .cta-section{
        padding: 6rem 0;
        background: linear-gradient(135deg, rgba(110,58,255,0.03) 0%, rgba(0,164,255,0.02) 100%);
      }

      .cta-container{
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 24px;
        padding: 3rem;
        backdrop-filter: blur(20px);
      }

      .cta-title{
        color: #ffffff;
        font-weight: 700;
        font-size: 2rem;
        margin-bottom: 1rem;
      }

      .cta-description{
        color: rgba(232,244,253,0.8);
        font-size: 1.1rem;
        line-height: 1.6;
      }

      .cta-actions{
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        justify-content: flex-end;
      }

      .btn-cta-primary{
        padding: 1rem 2rem;
        font-weight: 600;
        background: linear-gradient(135deg, var(--neon-2), var(--neon-1));
        border: none;
        border-radius: 12px;
        color: white;
        box-shadow: 0 8px 25px rgba(0,164,255,0.25);
        transition: all 0.3s ease;
      }

      .btn-cta-primary:hover{
        background: linear-gradient(135deg, #00a8ff, #8b5cff);
        box-shadow: 0 12px 35px rgba(0,164,255,0.35);
        transform: translateY(-2px);
        color: white;
      }

      .btn-cta-secondary{
        padding: 1rem 2rem;
        font-weight: 600;
        background: transparent;
        border: 2px solid rgba(159,214,255,0.3);
        border-radius: 12px;
        color: #9fd6ff;
        transition: all 0.3s ease;
      }

      .btn-cta-secondary:hover{
        background: rgba(159,214,255,0.08);
        border-color: rgba(159,214,255,0.5);
        color: #cfefff;
        transform: translateY(-2px);
      }



      .muted{color:rgba(230,240,255,0.65)}

      /* Responsive Design */
      @media (max-width: 992px){
        .hero-heading{font-size: 3rem;}
        .hero-description{font-size: 1.1rem;}
        .stats-grid{grid-template-columns: repeat(2, 1fr); max-width: 300px;}
        .visual-container{height: 400px;}
        .security-score{right: 5%; top: 10%;}
        .threat-blocked{left: 5%; bottom: 15%;}
      }

      @media (max-width: 768px){
        .hero-heading{font-size: 2.5rem;}
        .hero-actions{flex-direction: column;}
        .stats-grid{grid-template-columns: 1fr; gap: 1rem;}
        .visual-container{height: 350px;}
        .floating-element{position: static; margin: 1rem 0;}
        .section-heading{font-size: 2rem;}
        .use-case-header{flex-direction: column; align-items: flex-start;}
        .cta-container{padding: 2rem;}
        .cta-title{font-size: 1.5rem;}
        .cta-actions{justify-content: flex-start;}
      }

      .btn-neon{
        background: linear-gradient(90deg,var(--neon-1),var(--neon-2));
        border: none;
        box-shadow: 0 8px 30px rgba(0,164,255,0.12), 0 2px 8px rgba(110,58,255,0.08) inset;
        color: white; padding: 0.6rem 1.05rem; border-radius:12px;font-weight:600;
      }
      .btn-outline-sky{border:1px solid rgba(255,255,255,0.06);color: #9fd6ff;background:transparent;border-radius:10px}

      .preview-frame{border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.04);box-shadow: 0 20px 60px rgba(2,6,23,0.55);}
      .preview-frame img{display:block;width:100%;height:100%;object-fit:cover;transform-origin:center;transition:transform .6s ease}
      .preview-frame:hover img{transform:scale(1.03)}

      .holo-card{background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));border:1px solid rgba(255,255,255,0.03);padding:1rem;border-radius:14px;box-shadow:0 6px 30px rgba(6,10,30,0.5);}
      .holo-icon{width:52px;height:52px;border-radius:12px;background:linear-gradient(135deg, rgba(110,58,255,0.12), rgba(0,164,255,0.08));font-size:1.25rem}
      .text-sky{color: #9fd6ff;font-weight:600}

      .feature-grid .row > *{display:flex}

      .cta-strip{background: linear-gradient(90deg, rgba(12,20,44,0.6), rgba(30,6,44,0.35));border-radius:18px;padding:1.25rem;border:1px solid rgba(255,255,255,0.03);}

      footer{color:rgba(230,240,255,0.6)}

      /* small responsiveness */
      @media (max-width:768px){
        .brand-badge{width:40px;height:40px}
        .hero-card{padding:1rem}
      }
    `;

    const styleTag = document.createElement('style');
    styleTag.setAttribute('data-phishshield-style', 'true');
    styleTag.innerHTML = css;
    document.head.appendChild(styleTag);

    return () => {
      const existing = document.querySelector('style[data-phishshield-style]');
      if (existing) existing.remove();
    };
  }, []);

  return (
    <div className="phish-shell">
      <Container fluid className="phish-container">

        {/* VS Code-Inspired Hero Section */}
        <section className="hero-section" style={{ paddingTop: "100px" }}>
          {/* Waves Background */}
          <Waves
            lineColor="rgba(255, 255, 255, 0.1)"
            backgroundColor="transparent"
            waveSpeedX={0.02}
            waveSpeedY={0.01}
            waveAmpX={40}
            waveAmpY={20}
            friction={0.9}
            tension={0.01}
            maxCursorMove={120}
            xGap={12}
            yGap={36}
          />
          <div className="hero-background-gradient"></div>
          
          <Container>
            <Row className="g-5 align-items-center min-vh-75">
              <Col lg={6}>
                <motion.div 
                  className="hero-content"
                  initial={{ x: -40, opacity: 0 }} 
                  animate={{ x: 0, opacity: 1 }} 
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                <motion.div 
                  className="hero-badge mb-4"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <span className="badge-icon">🛡️</span>
                  <span className="badge-text">AI-Powered Email Security</span>
                </motion.div>

                <motion.h1 
                  className="hero-heading mb-4"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.8 }}
                >
                  Detect suspicious emails
                  <span className="text-gradient"> instantly</span>
                </motion.h1>

                <motion.p 
                  className="hero-description mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  PhishShield adds intelligent AI-powered protection to your Outlook. 
                  Get real-time threat detection, instant alerts, and comprehensive security 
                  insights—all seamlessly integrated into your workflow.
                </motion.p>

                <motion.div 
                  className="hero-actions mb-5"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button onClick={handleDownload} className="btn-primary-hero me-3">
                      Download for Outlook
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button as={Link} to="/login" className="btn-secondary-hero">
                      Try Web Demo
                    </Button>
                  </motion.div>
                </motion.div>

                <motion.div 
                  className="hero-stats"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <div className="stats-grid">
                    <div className="stat-item">
                      <div className="stat-number">99.9%</div>
                      <div className="stat-label">Detection Rate</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-number">&lt;1ms</div>
                      <div className="stat-label">Response Time</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-number">10M+</div>
                      <div className="stat-label">Emails Secured</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </Col>

            <Col lg={6}>
              <motion.div 
                className="hero-visual"
                initial={{ x: 40, opacity: 0, scale: 0.9 }} 
                animate={{ x: 0, opacity: 1, scale: 1 }} 
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="visual-container">
                  <div className="main-preview-card">
                    <div className="preview-header">
                      <div className="preview-controls">
                        <span className="control-dot red"></span>
                        <span className="control-dot yellow"></span>
                        <span className="control-dot green"></span>
                      </div>
                      <div className="preview-title">PhishShield Dashboard</div>
                    </div>
                    
                    <div className="preview-content">
                      <Image 
                        src={process.env.PUBLIC_URL + '/screenshot.png'} 
                        alt="PhishShield Dashboard" 
                        fluid 
                        className="main-preview-image"
                      />
                      <div className="preview-overlay">
                        <div className="status-indicator">
                          <span className="status-dot"></span>
                          <span className="status-text">Real-time Protection Active</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Floating Elements */}
                  <motion.div 
                    className="floating-element security-score"
                    animate={{ 
                      x: [0, 15, -8, 12, -5, 0],
                      y: [0, -12, 8, -18, 5, 0],
                      rotate: [0, 2, -1, 1.8, -0.5, 0],
                      scale: [1, 1.02, 0.98, 1.05, 0.99, 1]
                    }}
                    transition={{ 
                      duration: 7.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  >
                    <div className="score-content">
                      <div className="score-icon">🎯</div>
                      <div className="score-info">
                        <div className="score-value">Safe</div>
                        <div className="score-subtitle">Trust Score: 95</div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="floating-element threat-blocked"
                    animate={{ 
                      x: [0, -10, 6, -12, 8, 0],
                      y: [0, -15, 10, -8, 12, 0],
                      rotate: [0, -1.5, 0.8, -2.2, 1.2, 0],
                      scale: [1, 0.97, 1.03, 0.95, 1.02, 1]
                    }}
                    transition={{ 
                      duration: 8.7,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.8
                    }}
                  >
                    <div className="threat-content">
                      <div className="threat-icon">⚠️</div>
                      <div className="threat-text">Threat Blocked</div>
                    </div>
                  </motion.div>

                  {/* Additional Dynamic Floating Element */}
                  <motion.div 
                    className="floating-element scan-status"
                    animate={{ 
                      x: [0, 8, -12, 14, -6, 0],
                      y: [0, -20, 6, -14, 8, 0],
                      rotate: [0, 1.5, -0.8, 2.1, -1.2, 0],
                      scale: [1, 1.04, 0.96, 1.06, 0.98, 1]
                    }}
                    transition={{ 
                      duration: 9.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2.5
                    }}
                  >
                    <div className="scan-content">
                      <div className="scan-icon">🔍</div>
                      <div className="scan-info">
                        <div className="scan-status-text">Scanning...</div>
                        <div className="scan-progress">
                          <div className="scan-bar"></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </Col>
          </Row>
          </Container>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <Container>
            <Row className="justify-content-center text-center mb-5">
              <Col lg={8}>
                <motion.h2 
                  className="section-heading mb-3"
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  Why Choose PhishShield
                </motion.h2>
                <motion.p 
                  className="section-description"
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  Advanced AI-powered email security engineered for accuracy and seamless integration into your workflow
                </motion.p>
              </Col>
            </Row>

            <Row className="g-4">
              <Col md={4}>
                <motion.div 
                  className="feature-card h-100"
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  <div className="feature-icon mb-3">🔍</div>
                  <h5 className="feature-title mb-3">Smart Detection</h5>
                  <p className="feature-description">Advanced ML algorithms detect spear-phishing, spoofed domains, and malicious links with 99.9% accuracy.</p>
                </motion.div>
              </Col>

              <Col md={4}>
                <motion.div 
                  className="feature-card h-100"
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  <div className="feature-icon mb-3">⚡</div>
                  <h5 className="feature-title mb-3">Lightning Fast</h5>
                  <p className="feature-description">Real-time analysis with sub-millisecond response times. Zero impact on your email performance.</p>
                </motion.div>
              </Col>

              <Col md={4}>
                <motion.div 
                  className="feature-card h-100"
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  <div className="feature-icon mb-3">🔒</div>
                  <h5 className="feature-title mb-3">Privacy First</h5>
                  <p className="feature-description">Your emails stay private. We only analyze metadata and never store personal content.</p>
                </motion.div>
              </Col>

              <Col md={4}>
                <motion.div 
                  className="feature-card h-100"
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  <div className="feature-icon mb-3">🛠️</div>
                  <h5 className="feature-title mb-3">Easy Integration</h5>
                  <p className="feature-description">One-click installation for Outlook with enterprise deployment options and admin controls.</p>
                </motion.div>
              </Col>

              <Col md={4}>
                <motion.div 
                  className="feature-card h-100"
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  <div className="feature-icon mb-3">📊</div>
                  <h5 className="feature-title mb-3">Detailed Analytics</h5>
                  <p className="feature-description">Comprehensive threat analysis with explanations and actionable remediation steps.</p>
                </motion.div>
              </Col>

              <Col md={4}>
                <motion.div 
                  className="feature-card h-100"
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  <div className="feature-icon mb-3">🤝</div>
                  <h5 className="feature-title mb-3">Team Ready</h5>
                  <p className="feature-description">Built for teams with centralized dashboards, policy management, and collaborative threat response.</p>
                </motion.div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Use Cases Section */}
        <section className="use-cases-section">
          <Container>
            <Row className="justify-content-center text-center mb-5">
              <Col lg={8}>
                <motion.h2 
                  className="section-heading mb-3"
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  Powerful Solutions for Every Need
                </motion.h2>
              </Col>
            </Row>

            <Row className="g-4">
              <Col lg={4}>
                <motion.div 
                  className="use-case-card h-100"
                  initial={{ opacity: 0, x: -30 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  <div className="use-case-header mb-3">
                    <h5 className="use-case-title">Agent Mode</h5>
                    <div className="use-case-badge">Individual Users</div>
                  </div>
                  <p className="use-case-description mb-4">
                    Personal AI assistant that monitors and protects your inbox with real-time threat detection.
                  </p>
                  <ul className="use-case-features">
                    <li>Inline threat warnings</li>
                    <li>Smart safety recommendations</li>
                    <li>One-click threat reporting</li>
                  </ul>
                </motion.div>
              </Col>

              <Col lg={4}>
                <motion.div 
                  className="use-case-card h-100"
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  <div className="use-case-header mb-3">
                    <h5 className="use-case-title">Admin Dashboard</h5>
                    <div className="use-case-badge">IT Teams</div>
                  </div>
                  <p className="use-case-description mb-4">
                    Centralized security hub for IT administrators with comprehensive oversight and control.
                  </p>
                  <ul className="use-case-features">
                    <li>Organization-wide threat reports</li>
                    <li>Policy configuration & management</li>
                    <li>Security alerts & notifications</li>
                  </ul>
                </motion.div>
              </Col>

              <Col lg={4}>
                <motion.div 
                  className="use-case-card h-100"
                  initial={{ opacity: 0, x: 30 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  <div className="use-case-header mb-3">
                    <h5 className="use-case-title">Enterprise Integration</h5>
                    <div className="use-case-badge">Large Organizations</div>
                  </div>
                  <p className="use-case-description mb-4">
                    Seamless integration with existing enterprise infrastructure and security tools.
                  </p>
                  <ul className="use-case-features">
                    <li>Exchange & Office 365 support</li>
                    <li>SIEM integration & API access</li>
                    <li>Custom deployment options</li>
                  </ul>
                </motion.div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <Container>
            <motion.div 
              className="cta-container"
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Row className="align-items-center">
                <Col lg={8}>
                  <h3 className="cta-title mb-2">Ready to secure your inbox?</h3>
                  <p className="cta-description mb-4 mb-lg-0">
                    Join thousands of organizations protecting their email communications with PhishShield's advanced AI security.
                  </p>
                </Col>
                <Col lg={4} className="text-lg-end">
                  <div className="cta-actions">
                    <Button onClick={handleDownload} className="btn-cta-primary me-3">
                      Get Started Free
                    </Button>
                    <Button as={Link} to="/register" className="btn-cta-secondary">
                      Request Demo
                    </Button>
                  </div>
                </Col>
              </Row>
            </motion.div>
          </Container>
        </section>

        {/* Footer Component */}
        <FooterComponent />
      </Container>
    </div>
  );
}

