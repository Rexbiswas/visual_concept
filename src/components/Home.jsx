import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaPlay, FaChevronLeft, FaChevronRight, FaMicrochip, FaBolt } from 'react-icons/fa';
import { GiCyberEye } from 'react-icons/gi';
import './Home.css';
import './Responsive.css';
import CustomCursor from './CustomCursor';
import ExploreCar from './ExploreCar';

const Counter = ({ from, to, duration = 2 }) => {
    const count = useMotionValue(from);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
        const controls = animate(count, to, { duration: duration, ease: "circOut" });
        return controls.stop;
    }, [count, to, duration]);

    return <motion.span>{rounded}</motion.span>;
};

const ScrambleText = ({ text }) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
    const [display, setDisplay] = useState(text);
    const [scrambling, setScrambling] = useState(false);

    const scramble = () => {
        if (scrambling) return;
        setScrambling(true);
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplay(
                text
                    .split("")
                    .map((char, index) => {
                        if (index < iteration) return text[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                clearInterval(interval);
                setScrambling(false);
            }

            iteration += 1 / 3;
        }, 30);
    };

    return (
        <span onMouseEnter={scramble} style={{ cursor: 'pointer' }}>
            {display}
        </span>
    );
};

const Magnetic = ({ children }) => {
    const ref = useRef(null);
    const position = { x: useMotionValue(0), y: useMotionValue(0) };

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        position.x.set(middleX * 0.2); // Magnetic strength
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

const ParallaxCard = ({ children, speed = 10, className }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useTransform(x, [0, window.innerWidth], [-speed, speed]);
    const mouseY = useTransform(y, [0, window.innerHeight], [-speed, speed]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            x.set(e.clientX);
            y.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [x, y]);

    return (
        <motion.div style={{ x: mouseX, y: mouseY }} className={className}>
            {children}
        </motion.div>
    );
};



const LamboModel = new URL('../assets/lamborghini_terzo_millennio.glb', import.meta.url).href;
const BugattiModel = new URL('../assets/bugatti_-_la_voiture_noire.glb', import.meta.url).href;
const KoenigseggModel = new URL('../assets/2019__koenigsegg_jesko.glb', import.meta.url).href;

const Home = () => {
    const fadeUp = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };




    // Slider Logic
    const slides = [
        {
            id: '01',
            brand: 'Lamborghini',
            modelName: 'Terzo-Millennio',
            accent: '#00ffff',
            model: LamboModel,
            modelScale: 2.5,
            stats: { acceleration: 2.9, topSpeed: 350, range: 450 }
        },
        {
            id: '02',
            brand: 'Bugatti',
            modelName: 'La Voiture Noire',
            accent: '#b026ff',
            model: BugattiModel,
            modelScale: 0.04,
            stats: { acceleration: 2.5, topSpeed: 420, range: 500 }
        },
        {
            id: '03',
            brand: 'Koenigsegg',
            modelName: 'Jesko',
            accent: '#ff003c',
            model: KoenigseggModel,
            modelScale: 1.9,
            stats: { acceleration: 2.5, topSpeed: 480, range: 600 }
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    // GSAP Horizontal Scroll Logic
    const mainContainerRef = useRef(null);
    const scrollTextRef = useRef(null);
    const videoRef = useRef(null);
    const videoContainerRef = useRef(null);
    const hudCoordsRef = useRef(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Horizontal Scroll Text
            gsap.to(scrollTextRef.current, {
                x: "-20%", // Move text to the left
                ease: "none",
                scrollTrigger: {
                    trigger: mainContainerRef.current,
                    start: "top center",
                    end: "bottom top",
                    scrub: 1,
                }
            });

            // Content Grid Fade In
            gsap.fromTo(".grid-item",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: ".content-grid",
                        start: "top 95%", // Trigger earlier to ensure visibility
                    }
                }
            );

            // Video Scrubbing Logic
            if (videoContainerRef.current && videoRef.current) {
                ScrollTrigger.create({
                    trigger: videoContainerRef.current,
                    start: "top top",
                    end: "+=200%", // Scroll distance for the video duration
                    pin: true,
                    scrub: 1,
                    onUpdate: (self) => {
                        const video = videoRef.current;
                        const progress = self.progress;

                        // Update Video Frame
                        if (video && video.duration && Number.isFinite(progress) && Number.isFinite(video.duration)) {
                            video.currentTime = video.duration * progress;
                        }

                        // Real-time HUD Update
                        if (hudCoordsRef.current) {
                            const axisX = (progress * 360).toFixed(2); // Rotate 0-360
                            const axisY = (Math.sin(progress * Math.PI) * 45).toFixed(2); // Tilt -45 to 45
                            hudCoordsRef.current.innerText = `ROT: ${axisX}° TILT: ${axisY}°`;
                        }
                    }
                });
            }

        }, mainContainerRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <CustomCursor />
            <div className="home-container">
                <section className="hero-section">
                    {/* Image Above */}
                    <div className="hero-image-wrapper" style={{ position: 'relative', overflow: 'hidden' }}>
                        {/* Persistent 3D Background */}
                        <div className="model-3d-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                            <ExploreCar modelPath={slides[currentSlide].model} scale={slides[currentSlide].modelScale} />
                        </div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                className="hero-bg"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                style={{ background: 'transparent', zIndex: 1, pointerEvents: 'none' }}
                            >
                                {/* Only show image if no model, or keep hidden if model exists (user asked to replace image) */}

                                <motion.div
                                    className="slide-badge-container"
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3, type: "spring" }}
                                    style={{ pointerEvents: 'auto' }}
                                >
                                    <div className="tech-badge">
                                        <span className="tech-id">{slides[currentSlide].id}</span>
                                        <span className="tech-name">
                                            {slides[currentSlide].brand} <span style={{ color: slides[currentSlide].accent }}>{slides[currentSlide].modelName}</span>
                                        </span>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Gradient Overlay for Text Readability */}
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            height: '50%',
                            background: 'linear-gradient(to top, #000 0%, transparent 100%)',
                            zIndex: 1,
                            pointerEvents: 'none'
                        }}></div>

                        {/* Slider Navigation - Animated */}
                        <motion.div
                            className="slider-arrow prev-arrow"
                            onClick={prevSlide}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1, duration: 0.5 }}
                            style={{ zIndex: 10 }}
                        >
                            <FaChevronLeft />
                        </motion.div>
                        <motion.div
                            className="slider-arrow next-arrow"
                            onClick={nextSlide}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1, duration: 0.5 }}
                            style={{ zIndex: 10 }}
                        >
                            <FaChevronRight />
                        </motion.div>

                        <motion.div
                            className="slider-indicators-tech"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.5 }}
                        >
                            {slides.map((slide, index) => (
                                <div
                                    key={slide.id}
                                    className={`indicator-tech ${index === currentSlide ? 'active' : ''}`}
                                    onClick={() => goToSlide(index)}
                                >
                                    <div className="indicator-bar" style={{ color: slide.accent }}></div>
                                    <span className="indicator-label">{slide.id}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Text Content Below */}
                    <motion.div
                        className="hero-content"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.div className="hero-badge" variants={fadeUp}>
                            Future Concept 2026
                        </motion.div>

                        <motion.h1 className="hero-title" variants={fadeUp}>
                            <span style={{fontSize:"100px"}}>BEYOND</span> 
                            <br />
                            <span className="hollow" data-text="REALITY">
                                <ScrambleText text="REALITY" />
                            </span>
                        </motion.h1>

                        <motion.p className="hero-subtitle" variants={fadeUp}>
                            Experience the perfect fusion of sustainable luxury and cutting-edge biotechnology.
                            The Vision AVTR defines the future of mobility with neural integration.
                        </motion.p>

                        <motion.div className="cta-group" variants={fadeUp}>
                            <Magnetic>
                                <button className="btn-primary">
                                    <a href="">Discover More</a>
                                </button>
                            </Magnetic>
                            <Magnetic>
                                <button className="btn-secondary">
                                    <div className="play-icon-box">
                                        <FaPlay style={{ fontSize: '0.6em' }} />
                                    </div>
                                    <a href="">Watch Teaser</a>
                                </button>
                            </Magnetic>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="stats-container"
                        // Force re-render on slide change to animate stats
                        key={`stats-${currentSlide}`}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <ParallaxCard speed={15}>
                            <div className="stat-card">
                                <div className="stat-value">
                                    {/* Separate integer and decimal parts for cleaner animation if needed, but here simplified */}
                                    <Counter from={0} to={Math.floor(slides[currentSlide].stats.acceleration)} duration={2} />
                                    .{Math.round((slides[currentSlide].stats.acceleration % 1) * 10)}
                                    <span className="stat-unit">s</span>
                                </div>
                                <div className="stat-label">0-100 km/h</div>
                            </div>
                        </ParallaxCard>

                        <ParallaxCard speed={-20} className="raised-card">
                            <div className="stat-card">
                                <div className="stat-value">
                                    <Counter from={0} to={slides[currentSlide].stats.topSpeed} duration={2} />
                                    <span className="stat-unit">km/h</span>
                                </div>
                                <div className="stat-label">Top Speed</div>
                            </div>
                        </ParallaxCard>

                        <ParallaxCard speed={10}>
                            <div className="stat-card">
                                <div className="stat-value">
                                    <Counter from={0} to={slides[currentSlide].stats.range} duration={2.5} />
                                    <span className="stat-unit">km</span>
                                </div>
                                <div className="stat-label">Range</div>
                            </div>
                        </ParallaxCard>
                    </motion.div>

                </section>
                <div className="main-container" ref={mainContainerRef}>
                    <div className="scrolling-text-wrapper">
                        {/* Duplicated text for smooth infinite-like scroll effect if needed, but simple horizontal scroll is requested */}
                        <div className="scrolling-text-content" ref={scrollTextRef}>
                            VISION AVTR • FUTURE MOBILITY • SUSTAINABLE LUXURY • BIONIC FLAPS • NEURAL LINK •
                        </div>
                    </div>

                    <motion.div
                        className="content-grid"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, staggerChildren: 0.2 }}
                    >
                        <motion.div className="grid-item" variants={fadeUp}>
                            <span className="grid-index">01</span>
                            <h3>Bionic Flaps</h3>
                            <p>33 multi-directionally movable surface elements act as "bionic flaps".</p>
                        </motion.div>
                        <motion.div className="grid-item" variants={fadeUp}>
                            <span className="grid-index">02</span>
                            <h3>Neural Connection</h3>
                            <p>Control the vehicle with your mind through the biometric connection.</p>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Enhanced Video Scroll Section */}
                <div ref={videoContainerRef} className="video-scroll-container">
                    <div className="video-sticky-wrapper">
                        <video
                            ref={videoRef}
                            className="scroll-video"
                            src="https://bugatti.imgix.net/6763385aed6f98152f573b1b/tourbillon-modelpage-02-scrollvideo-desktop.mp4"
                            muted
                            playsInline
                            preload="auto"
                        />
                        <div className="video-overlay-gradient"></div>

                        <div className="hud-interface">
                            <motion.div
                                className="hud-header"
                                initial={{ opacity: 0, y: -20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <span className="hud-title">SYSTEM STATUS</span>
                            </motion.div>
                            <div className="hud-reticle"></div>
                            <motion.div
                                className="hud-bottom-bar"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <span className="hud-coords" ref={hudCoordsRef}>ROT: 0.00° TILT: 0.00°</span>
                                <span className="hud-mode">ROTATION MODE</span>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='content-section'>
                <div className='content-container'>
                    <motion.div
                        className="innovation-header"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2>CORE <span style={{ color: 'cyan' }}>INNOVATIONS</span></h2>
                        <div className="section-line"></div>
                    </motion.div>

                    <div className="innovation-grid">
                        <motion.div
                            className="innovation-card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="card-icon-wrapper">
                                <FaMicrochip className="card-icon" />
                            </div>
                            <h3>NEURAL CORE</h3>
                            <p>Advanced AI processing unit that adapts to driver behavior and road conditions in real-time.</p>
                            <button className="card-btn">Learn More <FaArrowRight /></button>
                        </motion.div>

                        <motion.div
                            className="innovation-card highlight"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                        >
                            <div className="card-icon-wrapper">
                                <GiCyberEye className="card-icon" />
                            </div>
                            <h3>BIONIC VISION</h3>
                            <p>Full spectrum sensor array providing 360° augmented reality awareness and hazard detection.</p>
                            <button className="card-btn">Learn More <FaArrowRight /></button>
                        </motion.div>

                        <motion.div
                            className="innovation-card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                        >
                            <div className="card-icon-wrapper">
                                <FaBolt className="card-icon" />
                            </div>
                            <h3>QUANTUM DRIVE</h3>
                            <p>Next-generation solid-state propulsion delivering instant torque and virtually unlimited range.</p>
                            <button className="card-btn">Learn More <FaArrowRight /></button>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className='speed-section-video'>
                <div className="section-header-overlay">
                    <h2>PRODUCTION <span style={{ color: 'cyan' }}>PROCESS</span></h2>
                    <p>Additive Manufacturing & Generative Design</p>
                </div>
                <div className="video-container-enhanced">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="enhanced-video"
                        src="https://bugatti-com.fra1.digitaloceanspaces.com/676339c3ad3186057468f7d1/tourbillon-modelpage-3d-printing-stream.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=DO00Y96NWYDDR9P99MQZ%2F20260113%2Ffra1%2Fs3%2Faws4_request&X-Amz-Date=20260113T101406Z&X-Amz-Expires=604800&X-Amz-Signature=ac53aa44dbaf9d08e95a69ed9233972caf830a3385610cada984ba798b8fe5f6&X-Amz-SignedHeaders=host&x-id=GetObject"
                    />
                    <div className="video-gradient-overlay"></div>
                </div>
            </div>


            <motion.div
                className="slogan-section"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                <div className="slogan-content">
                    <motion.h2
                        initial={{ y: 50 }}
                        whileInView={{ y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        ENGINEERING <br /> <span className="outline-text">IMPOSSIBILITY</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        style={{ marginTop: '20px', fontFamily: 'Rajdhani', fontSize: '1.2rem', color: '#888', letterSpacing: '4px', textTransform: 'uppercase' }}
                    >
                        Redefining the Horizon of Tomorrow
                    </motion.p>
                    <motion.div
                        className="slogan-decoration"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    ></motion.div>
                </div>
            </motion.div>
        </>
    );
};

export default Home;
