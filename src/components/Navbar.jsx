import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <motion.nav
            initial={{ marginTop: -100, opacity: 0 }}
            animate={{ marginTop: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
            <div className='nav-container'>
                <div className='logo'>
                    {/* Placeholder for logo if image is missing, or use text */}
                    <Link to="/" style={{ textDecoration: 'none', color: 'white', fontFamily: 'Orbitron', fontWeight: 'bold', fontSize: '24px' }}>
                        <img src="/letter-r-race-flag-logo.png" alt="Logo" className="nav-logo" />
                    </Link>
                </div>

                {/* Desktop Links */}
                <div className={`navlinks ${isOpen ? 'active' : ''} `}>
                    <ul>
                        {['Home', 'About', 'Features', 'Blogs', 'Drive'].map((item, index) => (
                            <motion.li
                                key={item}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                            >
                                <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} onClick={() => setIsOpen(false)}>
                                    {item}
                                </Link>
                            </motion.li>
                        ))}
                    </ul>
                    <div className='nav-btn-mobile'>
                        <button>Explore our car</button>
                    </div>
                </div>

                <div className='nav-actions'>
                    <motion.div
                        className='nav-btn desktop-only'
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                    >
                        <button>Explore our car</button>
                    </motion.div>

                    <div className='hamburger' onClick={toggleMenu}>
                        {isOpen ? <FaTimes size={25} color="#fff" /> : <FaBars size={25} color="#fff" />}
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
