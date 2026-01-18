import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPowerOff, FaTachometerAlt, FaShieldAlt, FaBolt, FaMapMarkerAlt } from 'react-icons/fa';
import './Drive.css';

const Drive = () => {
    const [isActive, setIsActive] = useState(false);
    const [speed, setSpeed] = useState(0);
    const [gear, setGear] = useState('N');
    const [mode, setMode] = useState('ZEN'); // ZEN, SPORT, HYPER

    // Simulate speed changes
    useEffect(() => {
        let interval;
        if (isActive) {
            interval = setInterval(() => {
                setSpeed(prev => {
                    const target = mode === 'ZEN' ? 65 : mode === 'SPORT' ? 140 : 280;
                    const fluctuation = Math.random() * 2 - 1;
                    return Math.min(Math.max(Math.floor(prev + (target - prev) * 0.05 + fluctuation), 0), 300);
                });
            }, 100);

            setGear(mode === 'HYPER' ? 'S+' : 'D');
        } else {
            setSpeed(prev => Math.floor(prev * 0.9)); // Decelerate
            if (speed < 5) setGear('P');
        }
        return () => clearInterval(interval);
    }, [isActive, mode, speed]);

    const toggleIgnition = () => {
        setIsActive(!isActive);
        if (!isActive) {
            // Start sequence
            setMode('ZEN');
        }
    };

    return (
        <div className={`drive-container ${isActive ? 'active' : ''}`}>

            {/* Background Layer - Moving Road / Starfield */}
            <div className="drive-bg">
                <div className="starfield"></div>
                <div className="retro-grid"></div>
                <div className="horizon-glow"></div>
            </div>

            {/* --- HEADS UP DISPLAY (HUD) --- */}
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        className="hud-layer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                    >
                        {/* Top Bar: Status */}
                        <div className="hud-top">
                            <div className="hud-metric">
                                <FaShieldAlt className="hud-icon" />
                                <span>SHIELDS: 100%</span>
                            </div>
                            <div className="hud-compass-strip">
                                <span>N</span><span>|</span><span>NE</span><span>|</span><span>E</span>
                            </div>
                            <div className="hud-metric">
                                <FaBolt className="hud-icon" />
                                <span>PWR: OPTIMAL</span>
                            </div>
                        </div>

                        {/* Center: The Road & Reticle */}
                        <div className="center-reticle">
                            <div className="reticle-circle spin-slow"></div>
                            <div className="reticle-corner tl"></div>
                            <div className="reticle-corner tr"></div>
                            <div className="reticle-corner bl"></div>
                            <div className="reticle-corner br"></div>
                        </div>

                        {/* Bottom Left: Info */}
                        <div className="hud-panel left">
                            <h3>SYSTEM_LOG</h3>
                            <ul className="log-list">
                                <li>&gt; Neural Link... ESTABLISHED</li>
                                <li>&gt; Traction Control... ACTIVE</li>
                                <li>&gt; Aero Surfaces... DEPLOYED</li>
                                <li className="blinking">&gt; AWAITING INPUT...</li>
                            </ul>
                        </div>

                        {/* Bottom Center: Speedometer */}
                        <div className="speedometer-container">
                            <div className="gear-display">{gear}</div>
                            <div className="speed-val">{speed}</div>
                            <div className="speed-label">KM/H</div>
                            <div className="speed-bar-wrapper">
                                <div className="speed-bar" style={{ width: `${(speed / 300) * 100}%` }}></div>
                            </div>
                        </div>

                        {/* Bottom Right: Modes */}
                        <div className="hud-panel right">
                            <h3>DRIVE_MODE</h3>
                            <div className="mode-selector">
                                {['ZEN', 'SPORT', 'HYPER'].map(m => (
                                    <button
                                        key={m}
                                        className={`mode-btn ${mode === m ? 'selected' : ''}`}
                                        onClick={() => setMode(m)}
                                    >
                                        {m}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- START OVERLAY --- */}
            {!isActive && (
                <div className="ignition-overlay">
                    <motion.div
                        className="start-btn-container"
                        initial={{ scale: 0.9, opacity: 0.5 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
                    >
                        <button className="ignition-btn" onClick={toggleIgnition}>
                            <FaPowerOff size={40} />
                            <span>INITIALIZE</span>
                        </button>
                    </motion.div>
                    <p className="instruction-text">PRESS TO ENGAGE NEURAL LINK</p>
                </div>
            )}

            {/* Scanlines Overlay (Always on for effect) */}
            <div className="scanlines"></div>
            <div className="vignette"></div>
        </div>
    );
};

export default Drive;
