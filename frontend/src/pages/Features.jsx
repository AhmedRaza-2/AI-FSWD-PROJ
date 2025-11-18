import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import '../styles/hologram.css';

const Features = () => {
  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Main features data
  const mainFeatures = [
    {
      title: "AI-Powered Email Analysis",
      description: "Advanced machine learning algorithms analyze email content, sender patterns, and embedded links to identify sophisticated phishing attempts with unprecedented accuracy.",
      icon: (
        <svg width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
        </svg>
      ),
      gradient: "linear-gradient(135deg, #7CC9FF, #6E3AFF)",
      features: ["Natural Language Processing", "Sender Reputation Analysis", "Content Pattern Recognition", "Real-time Threat Intelligence"]
    },
    {
      title: "URL Safety Scanner",
      description: "Comprehensive URL analysis that checks domain reputation, SSL certificates, redirect chains, and known malicious patterns to prevent credential theft.",
      icon: (
        <svg width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
        </svg>
      ),
      gradient: "linear-gradient(135deg, #00A4FF, #0066CC)",
      features: ["Domain Reputation Check", "SSL Certificate Validation", "Redirect Chain Analysis", "Malware Detection"]
    },
    {
      title: "Real-time Dashboard",
      description: "Comprehensive monitoring dashboard providing instant insights into threat detection, email statistics, and security metrics with customizable alerts.",
      icon: (
        <svg width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
          <path d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zM1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z"/>
        </svg>
      ),
      gradient: "linear-gradient(135deg, #FF6B6B, #FF8E53)",
      features: ["Live Threat Monitoring", "Custom Alert Settings", "Detailed Analytics", "Export Reports"]
    }
  ];

  // Additional features
  const additionalFeatures = [
    {
      title: "Outlook Integration",
      description: "Seamless Microsoft Outlook add-in for instant email protection",
      icon: "📧"
    },
    {
      title: "API Access",
      description: "Developer-friendly REST API for custom integrations",
      icon: "🔗"
    },
    {
      title: "Team Management",
      description: "Multi-user support with role-based access control",
      icon: "👥"
    },
    {
      title: "Custom Rules",
      description: "Create personalized filtering rules and whitelists",
      icon: "⚙️"
    },
    {
      title: "Mobile Alerts",
      description: "Instant notifications on suspicious activities",
      icon: "📱"
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock technical assistance and monitoring",
      icon: "🛟"
    }
  ];

  // Pricing tiers
  const pricingTiers = [
    {
      name: "Personal",
      price: "Free",
      description: "Perfect for individual users",
      features: ["Up to 100 emails/month", "Basic phishing detection", "Web dashboard", "Email support"],
      buttonText: "Get Started",
      popular: false
    },
    {
      name: "Professional",
      price: "$9.99/mo",
      description: "Ideal for professionals and small teams",
      features: ["Unlimited emails", "Advanced AI detection", "Outlook integration", "Priority support", "Custom rules"],
      buttonText: "Choose Pro",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations",
      features: ["Everything in Pro", "API access", "Team management", "Custom training", "24/7 phone support"],
      buttonText: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0A0F1F 0%, #141A34 50%, #1B2448 100%)',
      paddingTop: '100px',
      paddingBottom: '60px'
    }}>
      <Container>
        {/* Hero Section */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <Row className="mb-5">
            <Col lg={12} className="text-center">
              <motion.div variants={fadeInUp}>
                <h1 className="display-3 fw-bold mb-4 holo-glow">
                  Powerful Features
                </h1>
                <p className="lead fs-4 mb-5" style={{ color: '#B8C5D6', maxWidth: '800px', margin: '0 auto' }}>
                  Discover the comprehensive suite of tools and capabilities that make PhishShield 
                  the most effective phishing protection solution available today.
                </p>
              </motion.div>
            </Col>
          </Row>

          {/* Main Features */}
          <Row className="mb-5">
            {mainFeatures.map((feature, index) => (
              <Col lg={4} key={index} className="mb-4">
                <motion.div
                  variants={fadeInUp}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="holo-card border-0 h-100"
                        style={{ background: 'rgba(15, 21, 48, 0.7)', backdropFilter: 'blur(15px)' }}>
                    <Card.Body className="p-4">
                      {/* Icon */}
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center mb-4"
                        style={{
                          width: '80px',
                          height: '80px',
                          background: feature.gradient,
                          color: 'white'
                        }}
                      >
                        {feature.icon}
                      </div>
                      
                      {/* Title */}
                      <h3 className="fw-bold mb-3" style={{ color: '#E8F4FD' }}>
                        {feature.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="mb-4" style={{ color: '#B8C5D6' }}>
                        {feature.description}
                      </p>
                      
                      {/* Feature List */}
                      <ul className="list-unstyled">
                        {feature.features.map((item, itemIndex) => (
                          <li key={itemIndex} className="mb-2 d-flex align-items-center">
                            <svg width="16" height="16" className="me-2" fill="#7CC9FF" viewBox="0 0 16 16">
                              <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.061L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                            </svg>
                            <span style={{ color: '#E8F4FD', fontSize: '0.9rem' }}>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>

          {/* Additional Features Grid */}
          <Row className="mb-5">
            <Col lg={12} className="text-center mb-5">
              <motion.div variants={fadeInUp}>
                <h2 className="display-5 fw-bold mb-4 holo-glow">
                  Additional Capabilities
                </h2>
                <p className="lead fs-5" style={{ color: '#B8C5D6', maxWidth: '600px', margin: '0 auto' }}>
                  Explore more features designed to enhance your digital security experience
                </p>
              </motion.div>
            </Col>
            {additionalFeatures.map((feature, index) => (
              <Col md={6} lg={4} key={index} className="mb-4">
                <motion.div
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="holo-card border-0 h-100"
                        style={{ background: 'rgba(15, 21, 48, 0.5)', backdropFilter: 'blur(10px)' }}>
                    <Card.Body className="p-4 text-center">
                      <div className="mb-3" style={{ fontSize: '2.5rem' }}>
                        {feature.icon}
                      </div>
                      <h5 className="fw-bold mb-3" style={{ color: '#E8F4FD' }}>
                        {feature.title}
                      </h5>
                      <p className="mb-0" style={{ color: '#B8C5D6' }}>
                        {feature.description}
                      </p>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>

          {/* Pricing Section */}
          <Row className="mb-5">
            <Col lg={12} className="text-center mb-5">
              <motion.div variants={fadeInUp}>
                <h2 className="display-5 fw-bold mb-4 holo-glow">
                  Choose Your Plan
                </h2>
                <p className="lead fs-5" style={{ color: '#B8C5D6', maxWidth: '600px', margin: '0 auto' }}>
                  Flexible pricing options to match your security needs and budget
                </p>
              </motion.div>
            </Col>
            {pricingTiers.map((tier, index) => (
              <Col lg={4} key={index} className="mb-4">
                <motion.div
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className={`holo-card border-0 h-100 position-relative ${tier.popular ? 'pulse-glow' : ''}`}
                        style={{ 
                          background: tier.popular 
                            ? 'linear-gradient(135deg, rgba(110, 58, 255, 0.1), rgba(124, 201, 255, 0.1))'
                            : 'rgba(15, 21, 48, 0.7)', 
                          backdropFilter: 'blur(15px)',
                          border: tier.popular ? '2px solid rgba(124, 201, 255, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                    {tier.popular && (
                      <Badge 
                        className="position-absolute top-0 start-50 translate-middle px-3 py-2"
                        style={{ 
                          background: 'linear-gradient(135deg, #7CC9FF, #6E3AFF)',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}
                      >
                        Most Popular
                      </Badge>
                    )}
                    <Card.Body className="p-4 text-center">
                      <h4 className="fw-bold mb-2" style={{ color: '#E8F4FD' }}>
                        {tier.name}
                      </h4>
                      <div className="mb-3">
                        <span className="display-5 fw-bold" style={{ color: tier.popular ? '#7CC9FF' : '#6E3AFF' }}>
                          {tier.price}
                        </span>
                      </div>
                      <p className="mb-4" style={{ color: '#B8C5D6' }}>
                        {tier.description}
                      </p>
                      <ul className="list-unstyled mb-4">
                        {tier.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="mb-2 d-flex align-items-center justify-content-start">
                            <svg width="16" height="16" className="me-2" fill="#7CC9FF" viewBox="0 0 16 16">
                              <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.061L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                            </svg>
                            <span style={{ color: '#E8F4FD', fontSize: '0.9rem' }}>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        variant={tier.popular ? "primary" : "outline-info"}
                        className="w-100 fw-semibold py-2"
                        style={{ 
                          borderRadius: '25px',
                          ...(tier.popular && {
                            background: 'linear-gradient(135deg, #7CC9FF, #6E3AFF)',
                            border: 'none'
                          })
                        }}
                      >
                        {tier.buttonText}
                      </Button>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>

          {/* Call to Action */}
          <motion.div variants={fadeInUp}>
            <Row>
              <Col lg={12}>
                <Card className="holo-card pulse-glow border-0 text-center"
                      style={{ 
                        background: 'linear-gradient(135deg, rgba(110, 58, 255, 0.1), rgba(124, 201, 255, 0.1))',
                        backdropFilter: 'blur(15px)'
                      }}>
                  <Card.Body className="p-5">
                    <h3 className="display-6 fw-bold mb-4 holo-glow">
                      Start Your Free Trial Today
                    </h3>
                    <p className="lead fs-5 mb-4" style={{ color: '#B8C5D6', maxWidth: '600px', margin: '0 auto' }}>
                      Experience the power of AI-driven phishing protection with our 14-day free trial
                    </p>
                    <div className="d-flex gap-3 justify-content-center flex-wrap">
                      <Button 
                        variant="outline-light" 
                        size="lg"
                        className="fw-semibold px-4 py-2"
                        style={{ 
                          borderRadius: '25px',
                          background: 'linear-gradient(135deg, #7CC9FF, #6E3AFF)',
                          border: 'none',
                          color: 'white'
                        }}
                        href="/register"
                      >
                        Start Free Trial
                      </Button>
                      <Button 
                        variant="outline-info" 
                        size="lg"
                        className="fw-semibold px-4 py-2"
                        style={{ borderRadius: '25px' }}
                        href="/contact"
                      >
                        Schedule Demo
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
};

export default Features;