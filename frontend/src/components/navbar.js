import React from "react";
import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import "../styles/hologram.css";

export default function NavbarComponent({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Navbar
        expand="lg"
        variant="dark"
        className="px-3 holo-card pulse-glow fixed-top"
        style={{ backdropFilter: "blur(10px)" }}
      >
        <Container>
          {/* Brand */}
          <Navbar.Brand as={Link} to="/" className="fw-bold holo-glow">
            PhishShield
          </Navbar.Brand>

          {/* Toggle button */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Navigation links */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center gap-3">
              <Nav.Link as={Link} to="/" className="text-light">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/about" className="text-light">
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/features" className="text-light">
                Features
              </Nav.Link>
              <Nav.Link as={Link} to="/contact" className="text-light">
                Contact
              </Nav.Link>

              {/* Authentication-based navigation */}
              {user ? (
                <>
                  <Button
                    as={Link}
                    to="/dashboard"
                    variant="outline-success"
                    className="fw-semibold rounded-pill px-3"
                  >
                    Dashboard
                  </Button>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="outline-info"
                      className="fw-semibold rounded-pill px-3"
                      id="dropdown-basic"
                    >
                      {user.email?.split('@')[0] || 'User'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      style={{
                        background: 'rgba(15, 21, 48, 0.95)',
                        backdropFilter: 'blur(15px)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '12px',
                        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
                        padding: '8px'
                      }}
                    >
                      <Dropdown.Item 
                        as={Link} 
                        to="/profile"
                        className="d-flex align-items-center"
                        style={{
                          color: '#E8F4FD',
                          background: 'transparent',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '10px 16px',
                          transition: 'all 0.3s ease',
                          fontWeight: '500'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(124, 201, 255, 0.1)';
                          e.currentTarget.style.color = '#7CC9FF';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = '#E8F4FD';
                        }}
                      >
                        <svg width="16" height="16" className="me-2" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                        </svg>
                        Profile Settings
                      </Dropdown.Item>
                      <Dropdown.Divider style={{ 
                        borderColor: 'rgba(255, 255, 255, 0.1)', 
                        margin: '8px 0' 
                      }} />
                      <Dropdown.Item 
                        onClick={handleLogout}
                        className="d-flex align-items-center"
                        style={{
                          color: '#E8F4FD',
                          background: 'transparent',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '10px 16px',
                          transition: 'all 0.3s ease',
                          fontWeight: '500'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(220, 53, 69, 0.1)';
                          e.currentTarget.style.color = '#ff6b7a';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = '#E8F4FD';
                        }}
                      >
                        <svg width="16" height="16" className="me-2" fill="currentColor" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                          <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                        </svg>
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                <Button
                  as={Link}
                  to="/login"
                  variant="outline-info"
                  className="fw-semibold rounded-pill px-3"
                >
                  Login
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.div>
  );
}
