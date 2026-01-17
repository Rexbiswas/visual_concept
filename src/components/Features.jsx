import React from 'react';
import { FaMicrochip, FaDna, FaWind, FaBolt } from 'react-icons/fa';

import './Features.css';

const Features = () => {
    const featuresList = [
        {
            icon: <FaMicrochip />,
            title: "QUANTUM DRIVE",
            desc: "The world's first powertrain capable of real-time torque vectoring at a heavy-ion level. Zero latency, infinite control.",
            specs: ["0-60 in 1.9s", "1200mi Range", "Wireless Charging"]
        },
        {
            icon: <FaDna />,
            title: "BIO-SENSING",
            desc: "The vehicle reads your vitals and adjusts the cabin environment to optimize your physiological state. It feels what you feel.",
            specs: ["Heart Rate Monitor", "Stress-Adaptive", "Auto-Climate"]
        },
        {
            icon: <FaWind />,
            title: "AERO-MORPHING",
            desc: "Body panels that physically shape-shift to minimize drag coefficient based on speed and wind conditions.",
            specs: ["Active Flaps", "0.19 Cd", "Downforce Vectoring"]
        }
    ];

    return (
        <div className="features-container">
            {/* --- Hero Section --- */}
            <header className="features-hero">
                <h1 className="features-title">ENGINEERING<br />PERFECTION</h1>
                <div className="features-subtitle">// THE SPECS DEFINING TOMORROW</div>
            </header>

            {/* --- Interactive Centerpiece --- */}
            <section className="interative-center">
                <div className="center-circle"></div>
                <div className="center-circle inner"></div>
                <div className="center-content">
                    <h2>CORE SYSTEMS</h2>
                    <p style={{ fontFamily: 'Rajdhani', color: 'cyan' }}>STATUS: OPTIMIZED</p>
                </div>
            </section>

            {/* --- Feature Showcase Grid --- */}
            <section className="feature-showcase">
                {featuresList.map((feat, i) => (
                    <div className="feature-card" key={i}>
                        <div className="card-bg-glow"></div>
                        <div className="feature-icon">{feat.icon}</div>
                        <h3>{feat.title}</h3>
                        <p>{feat.desc}</p>
                        <ul className="tech-details-list">
                            {feat.specs.map((spec, j) => (
                                <li key={j}>{spec}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>


        </div>
    );
};

export default Features;
