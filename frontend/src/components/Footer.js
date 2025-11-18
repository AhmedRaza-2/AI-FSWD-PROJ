import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

const FooterComponent = () => {
  return (
    <footer className="footer-section">
      <Container>
        {/* Main Footer Content */}
        <Row className="g-5">
          {/* Brand & About */}
          <Col lg={4} md={6}>
            <div className="footer-brand mb-4">
              <div className="footer-logo mb-3">
                <span className="logo-icon">🛡️</span>
                <h4 className="footer-brand-title">PhishShield</h4>
              </div>
              <p className="footer-brand-description">
                Enterprise-grade AI-powered email security platform trusted by Fortune 500 companies. 
                Protecting over 2 million inboxes worldwide with 99.9% threat detection accuracy.
              </p>
              <div className="footer-stats">
                <div className="stat-item">
                  <span className="stat-number">2M+</span>
                  <span className="stat-label">Protected Inboxes</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">99.9%</span>
                  <span className="stat-label">Detection Rate</span>
                </div>
              </div>
            </div>
          </Col>

          {/* Solutions */}
          <Col lg={2} md={6}>
            <div className="footer-links">
              <h6 className="footer-heading">Solutions</h6>
              <ul className="footer-list">
                <li><a href="#email-security" className="footer-link">Email Security</a></li>
                <li><a href="#threat-detection" className="footer-link">Threat Detection</a></li>
                <li><a href="#compliance" className="footer-link">Compliance</a></li>
                <li><a href="#integration" className="footer-link">API Integration</a></li>
                <li><a href="#enterprise" className="footer-link">Enterprise</a></li>
              </ul>
            </div>
          </Col>

          {/* Platform */}
          <Col lg={2} md={6}>
            <div className="footer-links">
              <h6 className="footer-heading">Platform</h6>
              <ul className="footer-list">
                <li><a href="#dashboard" className="footer-link">Dashboard</a></li>
                <li><a href="#analytics" className="footer-link">Analytics</a></li>
                <li><a href="#api-docs" className="footer-link">API Docs</a></li>
                <li><a href="#integrations" className="footer-link">Integrations</a></li>
                <li><a href="#pricing" className="footer-link">Pricing</a></li>
              </ul>
            </div>
          </Col>

          {/* Resources */}
          <Col lg={2} md={6}>
            <div className="footer-links">
              <h6 className="footer-heading">Resources</h6>
              <ul className="footer-list">
                <li><a href="#documentation" className="footer-link">Documentation</a></li>
                <li><a href="#whitepapers" className="footer-link">Whitepapers</a></li>
                <li><a href="#case-studies" className="footer-link">Case Studies</a></li>
                <li><a href="#security-center" className="footer-link">Security Center</a></li>
                <li><a href="#status" className="footer-link">System Status</a></li>
              </ul>
            </div>
          </Col>

          {/* Support & Contact */}
          <Col lg={2} md={6}>
            <div className="footer-links">
              <h6 className="footer-heading">Support</h6>
              <ul className="footer-list">
                <li><a href="#help-center" className="footer-link">Help Center</a></li>
                <li><a href="#contact" className="footer-link">Contact Sales</a></li>
                <li><a href="#support" className="footer-link">Technical Support</a></li>
                <li><a href="#training" className="footer-link">Training</a></li>
                <li><a href="#community" className="footer-link">Community</a></li>
              </ul>
            </div>
          </Col>
        </Row>

        {/* Certifications & Awards */}
        <Row className="footer-certifications py-4">
          <Col md={12}>
            <div className="certifications-section">
              <h6 className="certifications-title">Trusted & Certified</h6>
              <div className="certifications-grid">
                <div className="cert-item">SOC 2 Type II</div>
                <div className="cert-item">ISO 27001</div>
                <div className="cert-item">GDPR Compliant</div>
                <div className="cert-item">HIPAA Ready</div>
                <div className="cert-item">Enterprise Ready</div>
              </div>
            </div>
          </Col>
        </Row>

        <hr className="footer-divider" />
        
        {/* Bottom Section */}
        <Row className="align-items-center py-3">
          <Col lg={6} md={12} className="mb-3 mb-lg-0">
            <p className="footer-copyright mb-0">
              © {new Date().getFullYear()} PhishShield Technologies Inc. All rights reserved.
            </p>
          </Col>
          <Col lg={6} md={12}>
            <div className="footer-bottom-links">
              <div className="legal-links">
                <a href="#privacy" className="footer-link">Privacy Policy</a>
                <a href="#terms" className="footer-link">Terms of Service</a>
                <a href="#cookies" className="footer-link">Cookie Policy</a>
                <a href="#security" className="footer-link">Security</a>
              </div>
              <div className="social-links">
                <a href="#linkedin" className="social-link" aria-label="LinkedIn">💼</a>
                <a href="#twitter" className="social-link" aria-label="Twitter">🐦</a>
                <a href="#github" className="social-link" aria-label="GitHub">💻</a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterComponent;