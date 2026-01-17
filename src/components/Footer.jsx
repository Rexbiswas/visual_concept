import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaArrowRight } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Brand Column */}
                <motion.div
                    className="footer-brand"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="footer-logo">
                        VISUAL<span>CONCEPT</span>
                    </div>
                    <p className="footer-desc">
                        Pioneering the future of digital mobility. We create immersive web experiences that blur the line between reality and the machine.
                    </p>
                </motion.div>

                {/* Explore Links */}
                <motion.div
                    className="footer-links"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h4>EXPLORE</h4>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/features">Features</a></li>
                        <li><a href="/drive">Test Drive</a></li>
                    </ul>
                </motion.div>

                {/* Legal / Contact */}
                <motion.div
                    className="footer-links"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <h4>COMPANY</h4>
                    <ul>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </motion.div>

                {/* Newsletter */}
                <motion.div
                    className="footer-newsletter"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <h4>STAY UPDATED</h4>
                    <div className="newsletter-form">
                        <input type="email" placeholder="Enter your email" className="newsletter-input" />
                        <button className="newsletter-btn"><FaArrowRight /></button>
                    </div>

                    <div className="footer-social">
                        <a href="#" className="social-icon"><FaFacebookF /></a>
                        <a href="#" className="social-icon"><FaTwitter /></a>
                        <a href="#" className="social-icon"><FaInstagram /></a>
                        <a href="#" className="social-icon"><FaLinkedinIn /></a>
                    </div>
                </motion.div>
            </div>

            <motion.div
                className="footer-bottom"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
            >
                <div className="copyright">
                    © 2026 VisualConcept. All rights reserved.
                </div>
                <div>
                    <p>Created by <span style={{ color: "cyan", textShadow: "0 0 10px cyan" }}>Rishi Biswas</span></p>
                </div>
                <div className="legal-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                </div>
            </motion.div>
        </footer>
    );
};

export default Footer;
