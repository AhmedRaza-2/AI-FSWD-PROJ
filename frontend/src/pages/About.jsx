import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import '../styles/hologram.css';

const About = () => {
  // Animation variants for consistent animations
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const fadeInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Team members data
  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Lead Security Engineer",
      description: "Expert in cybersecurity with 8+ years of experience in threat detection and prevention.",
      avatar: "AC",
      gradient: "linear-gradient(135deg, #7CC9FF, #6E3AFF)"
    },
    {
      name: "Sarah Johnson", 
      role: "AI/ML Specialist",
      description: "Machine learning expert specializing in natural language processing and threat intelligence.",
      avatar: "SJ",
      gradient: "linear-gradient(135deg, #00A4FF, #0066CC)"
    },
    {
      name: "Mike Rodriguez",
      role: "Full Stack Developer", 
      description: "Full-stack developer with expertise in React, Node.js, and cloud infrastructure.",
      avatar: "MR",
      gradient: "linear-gradient(135deg, #FF6B6B, #FF8E53)"
    }
  ];

  // Features data
  const features = [
    {
      title: "Advanced AI Detection",
      description: "Our state-of-the-art machine learning algorithms analyze email patterns, URLs, and content to identify sophisticated phishing attempts with 99.7% accuracy.",
      icon: (
        <svg width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
        </svg>
      )
    },
    {
      title: "Real-time Protection",
      description: "Instant scanning of incoming emails and web links provides immediate protection against emerging threats and zero-day attacks.",
      icon: (
        <svg width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
        </svg>
      )
    },
    {
      title: "User-Friendly Interface",
      description: "Intuitive dashboard and seamless integration with popular email clients make phishing protection accessible to everyone.",
      icon: (
        <svg width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
          <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
        </svg>
      )
    }
  ];

  // Statistics data
  const stats = [
    { number: "99.7%", label: "Detection Accuracy", color: "#7CC9FF" },
    { number: "2M+", label: "Emails Protected", color: "#6E3AFF" },
    { number: "50K+", label: "Active Users", color: "#00A4FF" },
    { number: "24/7", label: "Support Available", color: "#FF6B6B" }
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
                  About PhishShield
                </h1>
                <p className="lead fs-4 mb-5" style={{ color: '#B8C5D6', maxWidth: '800px', margin: '0 auto' }}>
                  We're on a mission to make the digital world safer by providing cutting-edge phishing detection 
                  and prevention solutions powered by advanced AI technology.
                </p>
              </motion.div>
            </Col>
          </Row>

          {/* Mission Section */}
          <Row className="mb-5 align-items-center">
            <Col lg={6}>
              <motion.div variants={fadeInLeft}>
                <Card className="holo-card pulse-glow h-100 border-0" 
                      style={{ background: 'rgba(15, 21, 48, 0.7)', backdropFilter: 'blur(15px)' }}>
                  <Card.Body className="p-5">
                    <h2 className="mb-4" style={{ color: '#7CC9FF', fontWeight: '700' }}>
                      <svg width="32" height="32" className="me-3" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-2.008 0L.127 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
                        <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/>
                      </svg>
                      Our Mission
                    </h2>
                    <p className="fs-5 mb-4" style={{ color: '#E8F4FD' }}>
                      To protect individuals and organizations from sophisticated phishing attacks through 
                      innovative AI-powered detection systems and user education.
                    </p>
                    <p className="mb-0" style={{ color: '#B8C5D6' }}>
                      In today's digital landscape, phishing attacks are becoming increasingly sophisticated. 
                      Our team of cybersecurity experts and AI specialists work tirelessly to stay ahead 
                      of emerging threats and provide real-time protection.
                    </p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
            <Col lg={6}>
              <motion.div variants={fadeInRight}>
                <Card className="holo-card h-100 border-0" 
                      style={{ background: 'rgba(15, 21, 48, 0.7)', backdropFilter: 'blur(15px)' }}>
                  <Card.Body className="p-5">
                    <h2 className="mb-4" style={{ color: '#6E3AFF', fontWeight: '700' }}>
                      <svg width="32" height="32" className="me-3" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                      </svg>
                      Why We Started
                    </h2>
                    <p className="fs-5 mb-4" style={{ color: '#E8F4FD' }}>
                      Founded by cybersecurity veterans who witnessed the devastating impact of phishing 
                      attacks on businesses and individuals worldwide.
                    </p>
                    <p className="mb-0" style={{ color: '#B8C5D6' }}>
                      After seeing organizations lose millions to phishing scams and individuals fall 
                      victim to identity theft, we knew traditional security measures weren't enough. 
                      That's why we created PhishShield - to democratize advanced threat protection.
                    </p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>

          {/* Statistics Section */}
          <motion.div variants={fadeInUp} className="mb-5">
            <Row>
              {stats.map((stat, index) => (
                <Col md={3} key={index} className="mb-4">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="holo-card text-center border-0 h-100"
                          style={{ 
                            background: 'rgba(15, 21, 48, 0.7)', 
                            backdropFilter: 'blur(15px)',
                            borderLeft: `4px solid ${stat.color}`
                          }}>
                      <Card.Body className="p-4">
                        <h2 className="display-4 fw-bold mb-2" style={{ color: stat.color }}>
                          {stat.number}
                        </h2>
                        <p className="mb-0 fw-semibold" style={{ color: '#E8F4FD' }}>
                          {stat.label}
                        </p>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>

          {/* Features Section */}
          <Row className="mb-5">
            <Col lg={12} className="text-center mb-5">
              <motion.div variants={fadeInUp}>
                <h2 className="display-5 fw-bold mb-4 holo-glow">
                  What Makes Us Different
                </h2>
                <p className="lead fs-5" style={{ color: '#B8C5D6', maxWidth: '600px', margin: '0 auto' }}>
                  Our innovative approach combines cutting-edge technology with user-centric design
                </p>
              </motion.div>
            </Col>
            {features.map((feature, index) => (
              <Col lg={4} key={index} className="mb-4">
                <motion.div
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="holo-card border-0 h-100"
                        style={{ background: 'rgba(15, 21, 48, 0.7)', backdropFilter: 'blur(15px)' }}>
                    <Card.Body className="p-4 text-center">
                      <div className="mb-3" style={{ color: '#7CC9FF' }}>
                        {feature.icon}
                      </div>
                      <h4 className="fw-bold mb-3" style={{ color: '#E8F4FD' }}>
                        {feature.title}
                      </h4>
                      <p className="mb-0" style={{ color: '#B8C5D6' }}>
                        {feature.description}
                      </p>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>

          {/* Team Section */}
          <Row className="mb-5">
            <Col lg={12} className="text-center mb-5">
              <motion.div variants={fadeInUp}>
                <h2 className="display-5 fw-bold mb-4 holo-glow">
                  Meet Our Team
                </h2>
                <p className="lead fs-5" style={{ color: '#B8C5D6', maxWidth: '600px', margin: '0 auto' }}>
                  Cybersecurity experts, AI specialists, and developers united by a common goal
                </p>
              </motion.div>
            </Col>
            {teamMembers.map((member, index) => (
              <Col lg={4} key={index} className="mb-4">
                <motion.div
                  variants={fadeInUp}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="holo-card border-0 h-100"
                        style={{ background: 'rgba(15, 21, 48, 0.7)', backdropFilter: 'blur(15px)' }}>
                    <Card.Body className="p-4 text-center">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 fw-bold"
                        style={{
                          width: '80px',
                          height: '80px',
                          background: member.gradient,
                          fontSize: '1.5rem',
                          color: 'white'
                        }}
                      >
                        {member.avatar}
                      </div>
                      <h4 className="fw-bold mb-2" style={{ color: '#E8F4FD' }}>
                        {member.name}
                      </h4>
                      <p className="fw-semibold mb-3" style={{ color: '#7CC9FF' }}>
                        {member.role}
                      </p>
                      <p className="mb-0" style={{ color: '#B8C5D6' }}>
                        {member.description}
                      </p>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>

          {/* Call to Action Section */}
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
                      Ready to Protect Yourself?
                    </h3>
                    <p className="lead fs-5 mb-4" style={{ color: '#B8C5D6', maxWidth: '600px', margin: '0 auto' }}>
                      Join thousands of users who trust PhishShield to keep their digital communications secure
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
                        Get Started Free
                      </Button>
                      <Button 
                        variant="outline-info" 
                        size="lg"
                        className="fw-semibold px-4 py-2"
                        style={{ borderRadius: '25px' }}
                        href="/contact"
                      >
                        Contact Us
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

export default About;