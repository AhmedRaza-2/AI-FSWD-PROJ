import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/hologram.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showAlert, setShowAlert] = useState(false);

  // Animation variants
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
        staggerChildren: 0.1
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setShowAlert(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setShowAlert(false), 5000);
  };

  // Contact methods data
  const contactMethods = [
    {
      title: "Email Support",
      description: "Get in touch with our support team for technical assistance",
      contact: "support@phishshield.com",
      icon: (
        <svg width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
        </svg>
      ),
      color: "#7CC9FF"
    },
    {
      title: "Business Inquiries",
      description: "Reach out for enterprise solutions and partnerships",
      contact: "business@phishshield.com",
      icon: (
        <svg width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z"/>
          <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z"/>
        </svg>
      ),
      color: "#6E3AFF"
    },
    {
      title: "Phone Support",
      description: "Call us for immediate assistance (Enterprise customers only)",
      contact: "+1 (555) 123-PHISH",
      icon: (
        <svg width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
          <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122L9.98 10.65a6.056 6.056 0 0 1-1.904-.576 1.42 1.42 0 0 1-.013-.007l-.004-.002-.005-.002-.005-.002a2.12 2.12 0 0 1-.013-.007 6.056 6.056 0 0 1-.576-1.904l.22-1.805a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
        </svg>
      ),
      color: "#00A4FF"
    }
  ];

  // Office locations data
  const offices = [
    {
      city: "San Francisco",
      address: "123 Tech Street, Suite 400",
      zipcode: "San Francisco, CA 94105",
      phone: "+1 (555) 123-0001"
    },
    {
      city: "New York",
      address: "456 Security Avenue, Floor 15",
      zipcode: "New York, NY 10001",
      phone: "+1 (555) 123-0002"
    },
    {
      city: "London",
      address: "789 Cyber Lane, Office 200",
      zipcode: "London, EC1A 1AA, UK",
      phone: "+44 20 1234 5678"
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "How accurate is PhishShield's detection?",
      answer: "Our AI-powered system achieves 99.7% accuracy in phishing detection, significantly outperforming traditional rule-based systems."
    },
    {
      question: "Does PhishShield work with all email providers?",
      answer: "Yes, PhishShield supports all major email providers including Gmail, Outlook, Yahoo Mail, and custom enterprise email solutions."
    },
    {
      question: "How quickly are new threats detected?",
      answer: "Our machine learning models are updated in real-time, allowing us to detect and protect against new phishing threats within minutes of their appearance."
    },
    {
      question: "Is my email data secure with PhishShield?",
      answer: "Absolutely. We use end-to-end encryption and never store email content. Only metadata required for threat analysis is processed, and all data is handled according to GDPR and CCPA standards."
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
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {/* Hero Section */}
          <Row className="mb-5">
            <Col lg={12} className="text-center">
              <motion.div variants={fadeInUp}>
                <h1 className="display-3 fw-bold mb-4 holo-glow">
                  Get In Touch
                </h1>
                <p className="lead fs-4 mb-5" style={{ color: '#B8C5D6', maxWidth: '800px', margin: '0 auto' }}>
                  Have questions about PhishShield? Need technical support? Want to discuss enterprise solutions? 
                  We're here to help and would love to hear from you.
                </p>
              </motion.div>
            </Col>
          </Row>

          {/* Alert */}
          <AnimatePresence>
            {showAlert && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="mb-4"
              >
                <Alert variant="success" className="text-center">
                  <svg width="20" height="20" className="me-2" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.061L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                  </svg>
                  Thank you for your message! We'll get back to you within 24 hours.
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Contact Form and Info */}
          <Row className="mb-5">
            <Col lg={8}>
              <motion.div variants={fadeInLeft}>
                <Card className="holo-card border-0"
                      style={{ background: 'rgba(15, 21, 48, 0.7)', backdropFilter: 'blur(15px)' }}>
                  <Card.Header className="border-0 text-center py-4"
                               style={{ background: 'linear-gradient(135deg, rgba(124, 201, 255, 0.1), rgba(110, 58, 255, 0.1))' }}>
                    <h3 className="fw-bold mb-0" style={{ color: '#E8F4FD' }}>
                      Send Us a Message
                    </h3>
                  </Card.Header>
                  <Card.Body className="p-5">
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold" style={{ color: '#E8F4FD' }}>
                              Full Name *
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                              className="py-3"
                              style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '12px',
                                color: '#E8F4FD'
                              }}
                              placeholder="Enter your full name"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold" style={{ color: '#E8F4FD' }}>
                              Email Address *
                            </Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              className="py-3"
                              style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '12px',
                                color: '#E8F4FD'
                              }}
                              placeholder="Enter your email address"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold" style={{ color: '#E8F4FD' }}>
                          Subject *
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="py-3"
                          style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '12px',
                            color: '#E8F4FD'
                          }}
                          placeholder="What is this regarding?"
                        />
                      </Form.Group>
                      <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold" style={{ color: '#E8F4FD' }}>
                          Message *
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={6}
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '12px',
                            color: '#E8F4FD',
                            resize: 'vertical'
                          }}
                          placeholder="Tell us more about your inquiry..."
                        />
                      </Form.Group>
                      <Button
                        type="submit"
                        size="lg"
                        className="fw-semibold px-5 py-3"
                        style={{
                          background: 'linear-gradient(135deg, #7CC9FF, #6E3AFF)',
                          border: 'none',
                          borderRadius: '25px',
                          color: 'white'
                        }}
                      >
                        <svg width="20" height="20" className="me-2" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M15.854.146a.5.5 0 0 1 .11.54L13.026 8.03 15.964 15.686a.5.5 0 0 1-.11.54.5.5 0 0 1-.54.11L8 13.026 2.314 15.964a.5.5 0 0 1-.54-.11.5.5 0 0 1-.11-.54L4.974 8.03.036.374A.5.5 0 0 1 .146.146.5.5 0 0 1 .686.036L8 2.974 15.314.036a.5.5 0 0 1 .54.11z"/>
                        </svg>
                        Send Message
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
            <Col lg={4}>
              <motion.div variants={fadeInRight}>
                <Row className="g-4">
                  {contactMethods.map((method, index) => (
                    <Col lg={12} key={index}>
                      <Card className="holo-card border-0 h-100"
                            style={{ background: 'rgba(15, 21, 48, 0.5)', backdropFilter: 'blur(10px)' }}>
                        <Card.Body className="p-4">
                          <div className="d-flex align-items-start">
                            <div 
                              className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                              style={{
                                width: '60px',
                                height: '60px',
                                background: `linear-gradient(135deg, ${method.color}, rgba(110, 58, 255, 0.7))`,
                                color: 'white'
                              }}
                            >
                              {method.icon}
                            </div>
                            <div>
                              <h5 className="fw-bold mb-2" style={{ color: '#E8F4FD' }}>
                                {method.title}
                              </h5>
                              <p className="mb-2" style={{ color: '#B8C5D6', fontSize: '0.9rem' }}>
                                {method.description}
                              </p>
                              <a 
                                href={method.title.includes('Email') ? `mailto:${method.contact}` : `tel:${method.contact}`}
                                className="fw-semibold text-decoration-none"
                                style={{ color: method.color }}
                              >
                                {method.contact}
                              </a>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </motion.div>
            </Col>
          </Row>

          {/* Office Locations */}
          <Row className="mb-5">
            <Col lg={12} className="text-center mb-4">
              <motion.div variants={fadeInUp}>
                <h2 className="display-5 fw-bold mb-4 holo-glow">
                  Our Offices
                </h2>
                <p className="lead fs-5" style={{ color: '#B8C5D6' }}>
                  Visit us at our global locations or reach out through our regional contacts
                </p>
              </motion.div>
            </Col>
            {offices.map((office, index) => (
              <Col md={4} key={index} className="mb-4">
                <motion.div
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="holo-card border-0 h-100 text-center"
                        style={{ background: 'rgba(15, 21, 48, 0.5)', backdropFilter: 'blur(10px)' }}>
                    <Card.Body className="p-4">
                      <h5 className="fw-bold mb-3" style={{ color: '#7CC9FF' }}>
                        {office.city}
                      </h5>
                      <p className="mb-2" style={{ color: '#E8F4FD' }}>
                        {office.address}
                      </p>
                      <p className="mb-3" style={{ color: '#B8C5D6' }}>
                        {office.zipcode}
                      </p>
                      <a 
                        href={`tel:${office.phone}`}
                        className="fw-semibold text-decoration-none"
                        style={{ color: '#6E3AFF' }}
                      >
                        {office.phone}
                      </a>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>

          {/* FAQ Section */}
          <Row className="mb-5">
            <Col lg={12} className="text-center mb-4">
              <motion.div variants={fadeInUp}>
                <h2 className="display-5 fw-bold mb-4 holo-glow">
                  Frequently Asked Questions
                </h2>
              </motion.div>
            </Col>
            <Col lg={8} className="mx-auto">
              {faqs.map((faq, index) => (
                <motion.div key={index} variants={fadeInUp} className="mb-4">
                  <Card className="holo-card border-0"
                        style={{ background: 'rgba(15, 21, 48, 0.5)', backdropFilter: 'blur(10px)' }}>
                    <Card.Body className="p-4">
                      <h5 className="fw-bold mb-3" style={{ color: '#E8F4FD' }}>
                        {faq.question}
                      </h5>
                      <p className="mb-0" style={{ color: '#B8C5D6' }}>
                        {faq.answer}
                      </p>
                    </Card.Body>
                  </Card>
                </motion.div>
              ))}
            </Col>
          </Row>
        </motion.div>
      </Container>
    </div>
  );
};

export default Contact;