import React, { useLayoutEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import './About.css';

// Reusing Magnetic Component for consistency
const Magnetic = ({ children }) => {
    const ref = useRef(null);
    const position = { x: useMotionValue(0), y: useMotionValue(0) };

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        position.x.set(middleX * 0.2);
        position.y.set(middleY * 0.2);
    };

    const reset = () => {
        position.x.set(0);
        position.y.set(0);
    };

    const { x, y } = position;
    return (
        <motion.div
            style={{ position: "relative", x, y }}
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {children}
        </motion.div>
    );
};

const About = () => {
    const containerRef = useRef(null);
    const scrollTrackRef = useRef(null);
    const horizontalSectionRef = useRef(null);

    // Timeline Refs
    const timelineRef = useRef(null);
    const lineRef = useRef(null);
    const cardsRef = useRef([]);

    // Hero Parallax
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        let ctx = gsap.context(() => {
            // Horizontal Scroll
            const track = scrollTrackRef.current;
            const horizontalSection = horizontalSectionRef.current;

            if (track && horizontalSection) {
                const scrollWidth = track.scrollWidth - window.innerWidth;

                gsap.to(track, {
                    x: -scrollWidth,
                    ease: "none",
                    scrollTrigger: {
                        trigger: horizontalSection,
                        pin: true,
                        scrub: 1,
                        start: "top top",
                        end: `+=${scrollWidth}`,
                    }
                });
            }

            // Split Section Reveal
            gsap.from(".split-side.left", {
                xPercent: -100,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: ".split-section",
                    start: "top 80%",
                }
            });

            gsap.from(".split-side.right", {
                xPercent: 100,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: ".split-section",
                    start: "top 80%",
                }
            });

            // Timeline Animation
            if (lineRef.current) {
                gsap.fromTo(lineRef.current,
                    { height: '0%' },
                    {
                        height: '100%',
                        ease: 'none',
                        scrollTrigger: {
                            trigger: timelineRef.current,
                            start: 'top center',
                            end: 'bottom center',
                            scrub: 1
                        }
                    }
                );
            }

            cardsRef.current.forEach((card, i) => {
                if (!card) return;
                const direction = i % 2 === 0 ? -100 : 100; // Left or Right offset

                gsap.fromTo(card,
                    { opacity: 0, x: direction },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%", // Animate when card enters viewport
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const values = [
        { title: "INNOVATION", desc: "Pushing boundaries of what's physically possible." },
        { title: "SUSTAINABILITY", desc: "Eco-friendly materials meeting luxury design." },
        { title: "PERFORMANCE", desc: "Zero compromise on speed and efficiency." },
        { title: "CONNECTION", desc: "Seamless interface between man and machine." },
    ];

    return (
        <div className="about-container" ref={containerRef}>

            {/* --- Hero Section --- */}
            <header className="about-hero">
                <div className="hero-glitch-bg"></div>
                <motion.div
                    className="about-title"
                    style={{ y: y1 }}
                >
                    <span>VISIONARY</span>
                    <span style={{ marginLeft: '10vw', color: 'transparent', WebkitTextStroke: '2px #fff' }}>ENGINEERING</span>
                </motion.div>

                <motion.div
                    className="about-subtitle"
                    style={{ y: y2, opacity }}
                >
                    Redefining The Future
                </motion.div>
            </header>

            {/* --- Split "Unexpected" Section --- */}
            <section className="split-section">
                <div className="split-side left">
                    <div className="tech-image-wrapper">
                        <img src="https://i.ytimg.com/vi/ekgUjyWe1Yc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB6RhGZ4Hmx9Dfn_Bk_ba0kFRyvfQ" alt="Vision Concept" />
                        <div className="img-overlay"></div>
                        <div className="img-corner-deco"></div>
                    </div>
                    <h1>Mercedes AVTR</h1>
                </div>
                <div className="split-side right">
                    <div className="split-content tech-text-content">
                        <h2>THE <span style={{ color: 'cyan' }}>TECHNOLOGY</span></h2>
                        <p>
                            Powered by quantum computing and neural link interfaces, our vehicles become an extension of your own nervous system.
                            Thought becomes motion. Intention becomes reality.
                        </p>

                        {/* Real-time Specs Dashboard */}
                        <div className="tech-specs-dashboard">
                            <div className="spec-header">
                                <span>LIVE TELEMETRY</span>
                                <span className="blink-status">● SYSTEM OPTIMAL</span>
                            </div>

                            <div className="spec-grid">
                                <div className="spec-item">
                                    <label>NEURAL SYNC</label>
                                    <div className="tech-progress-bg">
                                        <div className="tech-progress-fill" style={{ width: '98%' }}></div>
                                    </div>
                                    <div className="spec-val">98.4%</div>
                                </div>
                                <div className="spec-item">
                                    <label>QUANTUM OPS</label>
                                    <div className="tech-graph-line"></div>
                                    <div className="spec-val">128 TFLOPS</div>
                                </div>
                                <div className="spec-item">
                                    <label>CORE TEMP</label>
                                    <div className="spec-val cold-val">12°K</div>
                                    <div className="tech-bar-chunks">
                                        <span></span><span></span><span></span><span style={{ opacity: 0.3 }}></span>
                                    </div>
                                </div>
                                <div className="spec-item">
                                    <label>LATENCY</label>
                                    <div className="spec-val">0.002ms</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Horizontal Scroll Section --- */}
            <div className="horizontal-scroll-container" ref={horizontalSectionRef}>
                <div className="scrolling-wrapper">
                    <div className="scroll-track" ref={scrollTrackRef}>
                        <div className="scroll-panel intro-panel">
                            <h3>OUR CORE <br /> VALUES</h3>
                        </div>
                        {values.map((val, index) => (
                            <div className="scroll-panel" key={index}>
                                <div className="scroll-panel-content">
                                    <h4>0{index + 1}. {val.title}</h4>
                                    <p>{val.desc}</p>
                                </div>
                            </div>
                        ))}
                        <div className="scroll-panel outro-panel" style={{ background: '#00ffff', color: '#000' }}>
                            <h3 style={{ color: '#000' }}>JOIN THE <br /> REVOLUTION</h3>
                        </div>
                    </div>
                </div>
            </div>
            {/* --- Slogan Break --- */}
            <div className="about-slogan-section">
                <div className="speed-lines-bg"></div>
                <div className="tech-line-top"></div>

                <div className="slogan-container">
                    <div className="hud-corner top-left"></div>
                    <div className="hud-corner top-right"></div>
                    <div className="hud-corner bottom-left"></div>
                    <div className="hud-corner bottom-right"></div>

                    <h2 className="big-slogan">
                        <span className="outline" data-text="REDEFINING">REDEFINING</span><br />
                        <span className="solid" data-text="EXISTENCE">EXISTENCE</span>
                    </h2>
                    <div className="slogan-meta">
                        <span>[ SYSTEM_OVERRIDE ]</span>
                        <span style={{ color: '#fff', opacity: 0.5 }}>LAT: 35.689° / LON: 139.69°</span>
                        <span>// V.2.0.26</span>
                    </div>
                </div>

                <div className="tech-line-bottom"></div>
            </div>

            {/* --- Legacy & Evolution Timeline Section --- */}
            <section className="timeline-section" ref={timelineRef}>
                <div className="section-header">
                    <h2>OUR <span style={{ color: 'cyan' }}>EVOLUTION</span></h2>
                    <p style={{ color: '#888', letterSpacing: '2px', fontFamily: 'Rajdhani' }}>FROM CONCEPT TO REALITY</p>
                </div>

                <div className="timeline-container">
                    <div className="timeline-line" ref={lineRef}></div>

                    {[
                        { year: "2020", title: "THE INCEPTION", desc: "VisualConcept founded with a single mission: To redefine the physics of motion.", icon: "01" },
                        { year: "2023", title: "NEURAL NETWORK", desc: "First successful brain-computer interface prototype integrated into a chassis.", icon: "02" },
                        { year: "2026", title: "THE SINGULARITY", desc: "Launch of the Vision AVTR. The barrier between driver and machine is dissolved.", icon: "03" }
                    ].map((item, index) => (
                        <div
                            className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                            key={index}
                            ref={el => cardsRef.current[index] = el}
                        >
                            <div className="timeline-content">
                                <div className="timeline-year-big">{item.year}</div>
                                <div className="card-hex-deco">{item.icon}</div>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                            <div className="timeline-dot">
                                <div className="dot-pulse"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            {/* --- Global Presence / Holographic Map Section --- */}
            <section className="global-section">
                <div className="section-header">
                    <h2>GLOBAL <span style={{ color: 'cyan' }}>PRESENCE</span></h2>
                    <p style={{ color: '#888', letterSpacing: '2px', fontFamily: 'Rajdhani' }}>OPERATIONAL HUBS & PRODUCTION ZONES</p>
                </div>

                <div className="map-container">
                    {/* Abstract World Map Graphic */}
                    <div className="holographic-map">
                        <div className="map-grid-lines"></div>

                        {/* Connecting Lines SVG */}
                        <svg className="map-connections" width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, pointerEvents: 'none' }}>
                            <defs>
                                <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="rgba(0, 255, 255, 0)" />
                                    <stop offset="50%" stopColor="rgba(0, 255, 255, 0.5)" />
                                    <stop offset="100%" stopColor="rgba(0, 255, 255, 0)" />
                                </linearGradient>
                            </defs>
                            {/* Connect NA to EU */}
                            <line x1="25%" y1="30%" x2="50%" y2="25%" stroke="url(#line-gradient)" strokeWidth="1" className="connection-line" />
                            {/* Connect EU to ASIA */}
                            <line x1="50%" y1="25%" x2="75%" y2="40%" stroke="url(#line-gradient)" strokeWidth="1" className="connection-line" />
                            {/* Connect NA to ASIA (Arc or direct for network effect) */}
                            <line x1="25%" y1="30%" x2="75%" y2="40%" stroke="rgba(0, 255, 255, 0.1)" strokeWidth="1" strokeDasharray="5,5" />
                        </svg>

                        {/* Interactive Hotspots */}
                        <div className="map-hotspot" style={{ top: '30%', left: '25%' }}>
                            <div className="hotspot-pulse"></div>
                            <div className="hotspot-label">
                                <span>NORTH AMERICA</span>
                                <small>R&D CENTER</small>
                            </div>
                        </div>

                        <div className="map-hotspot" style={{ top: '25%', left: '50%' }}>
                            <div className="hotspot-pulse" style={{ animationDelay: '0.5s' }}></div>
                            <div className="hotspot-label">
                                <span>EUROPE</span>
                                <small>HQ & DESIGN</small>
                            </div>
                        </div>

                        <div className="map-hotspot" style={{ top: '40%', left: '75%' }}>
                            <div className="hotspot-pulse" style={{ animationDelay: '1s' }}></div>
                            <div className="hotspot-label">
                                <span>ASIA</span>
                                <small>BATTERY MFG</small>
                            </div>
                        </div>
                    </div>

                    <div className="map-overlay-stats">
                        <div className="map-stat">
                            <h3>12</h3>
                            <p>International Labs</p>
                        </div>
                        <div className="map-stat">
                            <h3>24/7</h3>
                            <p>Global Support</p>
                        </div>
                        <div className="map-stat">
                            <h3>03</h3>
                            <p>Continents</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default About;
