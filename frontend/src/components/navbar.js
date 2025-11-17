import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/hologram.css";

export default function NavbarComponent() {
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

              {/* Login Button */}
              <Button
                as={Link}
                to="/login"
                variant="outline-info"
                className="fw-semibold rounded-pill px-3"
              >
                Login
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.div>
  );
}
