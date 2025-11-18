import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Nav, Badge, Alert, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from '../firebase';
import { updateProfile, updatePassword, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      setFormData(prev => ({
        ...prev,
        displayName: currentUser.displayName || '',
        email: currentUser.email || ''
      }));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: formData.displayName
      });
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      setMessage({ type: 'danger', text: error.message });
    }
    setLoading(false);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: 'danger', text: 'Passwords do not match!' });
      return;
    }
    setLoading(true);
    try {
      await updatePassword(auth.currentUser, formData.newPassword);
      setMessage({ type: 'success', text: 'Password updated successfully!' });
      setFormData({ ...formData, currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setMessage({ type: 'danger', text: error.message });
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!user) return null;

  const tabVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div 
      style={{
        background: 'linear-gradient(135deg, #0A0F1F 0%, #141A34 25%, #1B2448 50%, #0F1529 75%, #16213d 100%)',
        minHeight: '100vh',
        paddingTop: '100px',
        paddingBottom: '40px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(110,58,255,0.03) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(0,164,255,0.02) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite reverse'
      }} />
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.06) !important;
          backdrop-filter: blur(20px) !important;
          -webkit-backdrop-filter: blur(20px) !important;
          border: 1px solid rgba(255, 255, 255, 0.15) !important;
          box-shadow: 
            0 25px 45px rgba(0, 0, 0, 0.15),
            0 10px 25px rgba(110, 58, 255, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
        }
        
        .glass-card:hover {
          transform: translateY(-2px);
          box-shadow: 
            0 35px 60px rgba(0, 0, 0, 0.2),
            0 15px 35px rgba(110, 58, 255, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
        }
        
        .nav-item-custom {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 12px;
          margin: 2px 0;
          position: relative;
          overflow: hidden;
        }
        
        .nav-item-custom::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(124, 201, 255, 0.1), transparent);
          transition: left 0.5s;
        }
        
        .nav-item-custom:hover::before {
          left: 100%;
        }
        
        .stat-card {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .stat-card:hover {
          transform: translateY(-5px) scale(1.02);
        }
        
        .form-control-custom {
          background: rgba(255, 255, 255, 0.04) !important;
          border: 2px solid rgba(255, 255, 255, 0.1) !important;
          color: #E8F4FD !important;
          transition: all 0.3s ease !important;
        }
        
        .form-control-custom:focus {
          background: rgba(255, 255, 255, 0.08) !important;
          border-color: rgba(124, 201, 255, 0.5) !important;
          box-shadow: 0 0 20px rgba(124, 201, 255, 0.2) !important;
        }
        
        .btn-gradient-primary {
          background: linear-gradient(135deg, #6E3AFF, #00A4FF) !important;
          border: none !important;
          box-shadow: 0 8px 25px rgba(110, 58, 255, 0.3) !important;
          transition: all 0.3s ease !important;
        }
        
        .btn-gradient-primary:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 15px 35px rgba(110, 58, 255, 0.4) !important;
        }
      `}</style>

      <Container>
        <Row>
          {/* Sidebar Navigation */}
          <Col lg={3} md={4} className="mb-4">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            >
              <Card className="glass-card border-0" style={{ borderRadius: '20px' }}>
                <Card.Body className="p-0">
                  {/* Enhanced User Header */}
                  <div className="text-center p-4" style={{ 
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    background: 'linear-gradient(135deg, rgba(110,58,255,0.05), rgba(0,164,255,0.05))',
                    borderRadius: '20px 20px 0 0'
                  }}>
                    <motion.div 
                      className="mx-auto mb-3 d-flex align-items-center justify-content-center position-relative"
                      style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #6E3AFF, #00A4FF)',
                        fontSize: '2.5rem',
                        color: 'white',
                        boxShadow: '0 15px 35px rgba(110, 58, 255, 0.3), 0 5px 15px rgba(0, 0, 0, 0.2)',
                        border: '3px solid rgba(255, 255, 255, 0.2)'
                      }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {user.displayName?.charAt(0) || user.email?.charAt(0) || 
                        <svg width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                        </svg>
                      }
                      <div style={{
                        position: 'absolute',
                        bottom: '5px',
                        right: '5px',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: '#28a745',
                        border: '2px solid white',
                        animation: 'pulse 2s infinite'
                      }} />
                    </motion.div>
                    <motion.h4 
                      className="mb-2 fw-bold" 
                      style={{ 
                        color: '#E8F4FD',
                        textShadow: '0 2px 10px rgba(124, 201, 255, 0.3)'
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {user.displayName || 'Professional User'}
                    </motion.h4>
                    <p className="mb-2" style={{ 
                      color: 'rgba(201, 215, 243, 0.8)', 
                      fontSize: '0.9rem',
                      fontWeight: '500' 
                    }}>
                      {user.email}
                    </p>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                    >
                      <Badge 
                        className="px-3 py-2"
                        style={{ 
                          background: 'linear-gradient(90deg, #28a745, #20c997)',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          boxShadow: '0 4px 15px rgba(40, 167, 69, 0.3)',
                          border: 'none'
                        }}
                      >
                        ✨ Premium Active
                      </Badge>
                    </motion.div>
                    
                    {/* Progress Ring */}
                    <div className="mt-3">
                      <div style={{ position: 'relative', display: 'inline-block' }}>
                        <svg width="60" height="60" style={{ transform: 'rotate(-90deg)' }}>
                          <circle
                            cx="30"
                            cy="30"
                            r="25"
                            stroke="rgba(255, 255, 255, 0.1)"
                            strokeWidth="3"
                            fill="transparent"
                          />
                          <circle
                            cx="30"
                            cy="30"
                            r="25"
                            stroke="#7CC9FF"
                            strokeWidth="3"
                            fill="transparent"
                            strokeDasharray={`${95 * 1.57} ${157 - 95 * 1.57}`}
                            style={{
                              filter: 'drop-shadow(0 0 8px rgba(124, 201, 255, 0.5))'
                            }}
                          />
                        </svg>
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          color: '#7CC9FF',
                          fontSize: '0.7rem',
                          fontWeight: 'bold'
                        }}>
                          95%
                        </div>
                      </div>
                      <p style={{ 
                        color: 'rgba(201, 215, 243, 0.6)', 
                        fontSize: '0.7rem', 
                        marginTop: '5px',
                        marginBottom: 0 
                      }}>
                        Security Score
                      </p>
                    </div>
                  </div>

                  {/* Enhanced Navigation Menu */}
                  <Nav className="flex-column p-3">
                    <motion.div
                      className="nav-item-custom"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Nav.Link
                        active={activeTab === 'overview'}
                        onClick={() => setActiveTab('overview')}
                        className="d-flex align-items-center p-3 rounded-3 mb-2 position-relative"
                        style={{
                          color: activeTab === 'overview' ? '#E8F4FD' : 'rgba(201, 215, 243, 0.8)',
                          background: activeTab === 'overview' 
                            ? 'linear-gradient(135deg, rgba(124, 201, 255, 0.15), rgba(110, 58, 255, 0.1))' 
                            : 'transparent',
                          border: activeTab === 'overview' ? '1px solid rgba(124, 201, 255, 0.2)' : '1px solid transparent',
                          fontWeight: activeTab === 'overview' ? '600' : '500',
                          boxShadow: activeTab === 'overview' ? '0 8px 25px rgba(124, 201, 255, 0.1)' : 'none'
                        }}
                      >
                        <span className="me-3" style={{ fontSize: '1.1rem' }}>
                          <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zM1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z"/>
                          </svg>
                        </span>
                        Overview
                        {activeTab === 'overview' && (
                          <motion.div
                            layoutId="activeIndicator"
                            style={{
                              position: 'absolute',
                              right: '12px',
                              width: '4px',
                              height: '20px',
                              background: 'linear-gradient(180deg, #7CC9FF, #6E3AFF)',
                              borderRadius: '2px'
                            }}
                          />
                        )}
                      </Nav.Link>
                    </motion.div>
                    
                    {['personal', 'security', 'preferences'].map((tab, index) => {
                      const getIcon = (type) => {
                        switch(type) {
                          case 'personal':
                            return (
                              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                              </svg>
                            );
                          case 'security':
                            return (
                              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                              </svg>
                            );
                          case 'preferences':
                            return (
                              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                              </svg>
                            );
                          default: return null;
                        }
                      };
                      const labels = { personal: 'Personal Info', security: 'Security', preferences: 'Preferences' };
                      
                      return (
                        <motion.div
                          key={tab}
                          className="nav-item-custom"
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (index + 1) * 0.1 }}
                        >
                          <Nav.Link
                            active={activeTab === tab}
                            onClick={() => setActiveTab(tab)}
                            className="d-flex align-items-center p-3 rounded-3 mb-2 position-relative"
                            style={{
                              color: activeTab === tab ? '#E8F4FD' : 'rgba(201, 215, 243, 0.8)',
                              background: activeTab === tab 
                                ? 'linear-gradient(135deg, rgba(124, 201, 255, 0.15), rgba(110, 58, 255, 0.1))' 
                                : 'transparent',
                              border: activeTab === tab ? '1px solid rgba(124, 201, 255, 0.2)' : '1px solid transparent',
                              fontWeight: activeTab === tab ? '600' : '500',
                              boxShadow: activeTab === tab ? '0 8px 25px rgba(124, 201, 255, 0.1)' : 'none'
                            }}
                          >
                            <span className="me-3" style={{ fontSize: '1.1rem' }}>{getIcon(tab)}</span>
                            {labels[tab]}
                            {activeTab === tab && (
                              <motion.div
                                layoutId="activeIndicator"
                                style={{
                                  position: 'absolute',
                                  right: '12px',
                                  width: '4px',
                                  height: '20px',
                                  background: 'linear-gradient(180deg, #7CC9FF, #6E3AFF)',
                                  borderRadius: '2px'
                                }}
                              />
                            )}
                          </Nav.Link>
                        </motion.div>
                      );
                    })}

                    <div style={{ 
                      height: '1px', 
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)', 
                      margin: '1.5rem 0' 
                    }}></div>

                    {[
                      { to: '/', icon: '🏠', label: 'Home' },
                      { to: '/dashboard', icon: '📈', label: 'Dashboard' }
                    ].map((item, index) => (
                      <motion.div
                        key={item.to}
                        className="nav-item-custom"
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <Nav.Link
                          as={Link}
                          to={item.to}
                          className="d-flex align-items-center p-3 rounded-3 mb-2"
                          style={{
                            color: 'rgba(201, 215, 243, 0.8)',
                            border: '1px solid transparent',
                            fontWeight: '500'
                          }}
                        >
                          <span className="me-3" style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                          {item.label}
                        </Nav.Link>
                      </motion.div>
                    ))}
                  </Nav>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          {/* Enhanced Main Content */}
          <Col lg={9} md={8}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              >
                {message.text && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <Alert 
                      variant={message.type} 
                      onClose={() => setMessage({ type: '', text: '' })} 
                      dismissible
                      className="glass-card"
                      style={{
                        border: `1px solid ${message.type === 'success' ? 'rgba(40, 167, 69, 0.3)' : 'rgba(220, 53, 69, 0.3)'}`,
                        background: `${message.type === 'success' ? 'rgba(40, 167, 69, 0.1)' : 'rgba(220, 53, 69, 0.1)'}`,
                        color: '#E8F4FD',
                        borderRadius: '15px',
                        marginBottom: '20px'
                      }}
                    >
                      {message.text}
                    </Alert>
                  </motion.div>
                )}

              {activeTab === 'overview' && (
                <Card className="glass-card border-0 mb-4" style={{ borderRadius: '20px' }}>
                  <Card.Header 
                    className="border-0 p-4"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(124, 201, 255, 0.05), rgba(110, 58, 255, 0.05))',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '20px 20px 0 0'
                    }}
                  >
                    <motion.h4 
                      className="mb-0 d-flex align-items-center" 
                      style={{ color: '#E8F4FD', fontWeight: '700' }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <span className="me-3 p-2 rounded-circle" style={{ 
                        background: 'linear-gradient(135deg, #7CC9FF, #6E3AFF)',
                        fontSize: '1.2rem'
                      }}>
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zM1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z"/>
                        </svg>
                      </span>
                      Account Overview
                    </motion.h4>
                  </Card.Header>
                  <Card.Body className="p-4">
                    <Row className="g-4">
                      {[
                        { 
                          title: 'Account Status', 
                          value: 'Active & Verified', 
                          color: '#28a745', 
                          bg: 'rgba(40, 167, 69, 0.1)', 
                          border: 'rgba(40, 167, 69, 0.2)',
                          icon: '✅'
                        },
                        { 
                          title: 'Emails Scanned', 
                          value: '1,247', 
                          color: '#00A4FF', 
                          bg: 'rgba(0, 164, 255, 0.1)', 
                          border: 'rgba(0, 164, 255, 0.2)',
                          icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                          </svg>
                        },
                        { 
                          title: 'Threats Blocked', 
                          value: '23', 
                          color: '#ffc107', 
                          bg: 'rgba(255, 193, 7, 0.1)', 
                          border: 'rgba(255, 193, 7, 0.2)',
                          icon: '🛡️'
                        },
                        { 
                          title: 'Security Score', 
                          value: '95/100', 
                          color: '#6E3AFF', 
                          bg: 'rgba(110, 58, 255, 0.1)', 
                          border: 'rgba(110, 58, 255, 0.2)',
                          icon: '🎯'
                        }
                      ].map((stat, index) => (
                        <Col md={6} key={index}>
                          <motion.div 
                            className="stat-card p-4 rounded-4 h-100"
                            style={{ 
                              background: stat.bg, 
                              border: `1px solid ${stat.border}`,
                              backdropFilter: 'blur(10px)'
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5, scale: 1.02 }}
                          >
                            <div className="d-flex align-items-center mb-2">
                              <span className="me-2" style={{ fontSize: '1.5rem' }}>{stat.icon}</span>
                              <h6 className="mb-0 fw-bold" style={{ color: stat.color }}>{stat.title}</h6>
                            </div>
                            <p className="mb-0 h5 fw-bold" style={{ color: '#E8F4FD' }}>{stat.value}</p>
                          </motion.div>
                        </Col>
                      ))}
                    </Row>
                    
                    <div style={{ 
                      height: '1px', 
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)', 
                      margin: '2.5rem 0' 
                    }}></div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <h5 className="mb-4 d-flex align-items-center" style={{ color: '#E8F4FD', fontWeight: '700' }}>
                        <span className="me-3 p-2 rounded-circle" style={{ 
                          background: 'linear-gradient(135deg, #7CC9FF, #6E3AFF)',
                          fontSize: '1rem'
                        }}>⚡</span>
                        Recent Activity
                      </h5>
                      
                      {[
                        { icon: '🔍', text: 'Email scan completed', time: '2 minutes ago', color: '#00A4FF' },
                        { icon: '🛡️', text: 'Phishing attempt blocked', time: '1 hour ago', color: '#ffc107' },
                        { icon: '✅', text: 'Profile updated', time: 'Yesterday', color: '#28a745' }
                      ].map((activity, index) => (
                        <motion.div 
                          key={index}
                          className="d-flex align-items-center p-3 mb-3 rounded-3"
                          style={{
                            background: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            backdropFilter: 'blur(5px)'
                          }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                          whileHover={{ x: 5, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                        >
                          <span 
                            className="me-3 p-2 rounded-circle d-flex align-items-center justify-content-center"
                            style={{ 
                              background: `${activity.color}20`,
                              border: `1px solid ${activity.color}40`,
                              minWidth: '40px',
                              height: '40px',
                              fontSize: '1.1rem'
                            }}
                          >
                            {activity.icon}
                          </span>
                          <div className="flex-grow-1">
                            <div style={{ color: '#E8F4FD', fontWeight: '500' }}>{activity.text}</div>
                            <small style={{ color: 'rgba(201, 215, 243, 0.6)' }}>{activity.time}</small>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </Card.Body>
                </Card>
              )}

              {activeTab === 'personal' && (
                <Card className="glass-card border-0" style={{ borderRadius: '20px' }}>
                  <Card.Header 
                    className="border-0 p-4"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(124, 201, 255, 0.05), rgba(110, 58, 255, 0.05))',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '20px 20px 0 0'
                    }}
                  >
                    <motion.h4 
                      className="mb-0 d-flex align-items-center" 
                      style={{ color: '#E8F4FD', fontWeight: '700' }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <span className="me-3 p-2 rounded-circle" style={{ 
                        background: 'linear-gradient(135deg, #7CC9FF, #6E3AFF)',
                        fontSize: '1.2rem'
                      }}>
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                        </svg>
                      </span>
                      Personal Information
                    </motion.h4>
                  </Card.Header>
                  <Card.Body className="p-5">
                    <Form onSubmit={handleUpdateProfile}>
                      <Row className="g-4">
                        <Col md={6}>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <Form.Group>
                              <Form.Label className="fw-bold mb-2" style={{ color: '#E8F4FD' }}>
                                Display Name
                              </Form.Label>
                              <Form.Control
                                type="text"
                                name="displayName"
                                value={formData.displayName}
                                onChange={handleInputChange}
                                className="form-control-custom"
                                placeholder="Enter your display name"
                                style={{ borderRadius: '12px', padding: '12px 16px' }}
                              />
                            </Form.Group>
                          </motion.div>
                        </Col>
                        <Col md={6}>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <Form.Group>
                              <Form.Label className="fw-bold mb-2" style={{ color: '#E8F4FD' }}>
                                Email Address
                              </Form.Label>
                              <Form.Control
                                type="email"
                                value={formData.email}
                                disabled
                                style={{
                                  background: 'rgba(255, 255, 255, 0.02)',
                                  border: '2px solid rgba(255, 255, 255, 0.05)',
                                  color: 'rgba(201, 215, 243, 0.6)',
                                  borderRadius: '12px',
                                  padding: '12px 16px'
                                }}
                              />
                              <small style={{ color: 'rgba(201, 215, 243, 0.5)' }}>
                                Email cannot be changed
                              </small>
                            </Form.Group>
                          </motion.div>
                        </Col>
                      </Row>
                      
                      <motion.div 
                        className="mt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Button
                          type="submit"
                          disabled={loading}
                          className="btn-gradient-primary px-4 py-3"
                          style={{ borderRadius: '12px', fontWeight: '600' }}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" />
                              Updating...
                            </>
                          ) : (
                            <>
                              <svg width="16" height="16" className="me-2" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
                              </svg>
                              Update Profile
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </Form>
                  </Card.Body>
                </Card>
              )}

              {activeTab === 'security' && (
                <Card 
                  className="shadow-lg border-0"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                  }}
                >
                  <Card.Header 
                    className="border-0"
                    style={{ background: 'transparent', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
                  >
                    <h4 className="mb-0" style={{ color: '#7CC9FF' }}>
                      <svg width="16" height="16" className="me-2" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                      </svg>
                      Security Settings
                    </h4>
                  </Card.Header>
                  <Card.Body className="p-4">
                    <Form onSubmit={handleUpdatePassword}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ color: 'rgba(201, 215, 243, 0.9)' }}>New Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            color: '#C9D7F3',
                            borderRadius: '10px'
                          }}
                          placeholder="Enter new password"
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-4">
                        <Form.Label style={{ color: 'rgba(201, 215, 243, 0.9)' }}>Confirm New Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            color: '#C9D7F3',
                            borderRadius: '10px'
                          }}
                          placeholder="Confirm new password"
                        />
                      </Form.Group>
                      
                      <Button
                        type="submit"
                        disabled={loading}
                        style={{
                          background: 'linear-gradient(90deg, #dc3545, #e74c3c)',
                          border: 'none',
                          borderRadius: '10px',
                          padding: '12px 24px'
                        }}
                        className="me-3"
                      >
                        {loading ? 'Updating...' : 'Update Password'}
                      </Button>
                    </Form>

                    <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.1)', margin: '2rem 0' }}></div>
                    
                    <h5 className="mb-3" style={{ color: '#7CC9FF' }}>Account Actions</h5>
                    <Button
                      variant="outline-danger"
                      onClick={handleLogout}
                      style={{
                        borderColor: '#dc3545',
                        color: '#dc3545',
                        borderRadius: '10px',
                        padding: '12px 24px'
                      }}
                    >
                      🚪 Sign Out
                    </Button>
                  </Card.Body>
                </Card>
              )}

              {activeTab === 'preferences' && (
                <Card 
                  className="shadow-lg border-0"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                  }}
                >
                  <Card.Header 
                    className="border-0"
                    style={{ background: 'transparent', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
                  >
                    <h4 className="mb-0" style={{ color: '#7CC9FF' }}>
                      ⚙️ Preferences
                    </h4>
                  </Card.Header>
                  <Card.Body className="p-4">
                    <div className="mb-4">
                      <h5 className="mb-3" style={{ color: '#7CC9FF' }}>Email Notifications</h5>
                      <Form.Check
                        type="switch"
                        id="email-threats"
                        label="Threat detection alerts"
                        defaultChecked
                        style={{ color: 'rgba(201, 215, 243, 0.8)' }}
                        className="mb-2"
                      />
                      <Form.Check
                        type="switch"
                        id="email-weekly"
                        label="Weekly security reports"
                        defaultChecked
                        style={{ color: 'rgba(201, 215, 243, 0.8)' }}
                        className="mb-2"
                      />
                      <Form.Check
                        type="switch"
                        id="email-updates"
                        label="Product updates"
                        style={{ color: 'rgba(201, 215, 243, 0.8)' }}
                        className="mb-2"
                      />
                    </div>

                    <div className="mb-4">
                      <h5 className="mb-3" style={{ color: '#7CC9FF' }}>Security Settings</h5>
                      <Form.Check
                        type="switch"
                        id="auto-scan"
                        label="Automatic email scanning"
                        defaultChecked
                        style={{ color: 'rgba(201, 215, 243, 0.8)' }}
                        className="mb-2"
                      />
                      <Form.Check
                        type="switch"
                        id="quarantine"
                        label="Auto-quarantine suspicious emails"
                        defaultChecked
                        style={{ color: 'rgba(201, 215, 243, 0.8)' }}
                        className="mb-2"
                      />
                      <Form.Check
                        type="switch"
                        id="link-protection"
                        label="Real-time link protection"
                        defaultChecked
                        style={{ color: 'rgba(201, 215, 243, 0.8)' }}
                        className="mb-2"
                      />
                    </div>

                    <Button
                      style={{
                        background: 'linear-gradient(90deg, #28a745, #20c997)',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '12px 24px'
                      }}
                    >
                      Save Preferences
                    </Button>
                  </Card.Body>
                </Card>
                )}
              </motion.div>
            </AnimatePresence>
          </Col>
        </Row>
      </Container>
    </div>
  );
}