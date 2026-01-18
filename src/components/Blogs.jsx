import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import './Blogs.css';

const Blogs = () => {
    const blogPosts = [
        {
            id: 1,
            title: "THE FUTURE OF AUTONOMOUS DRIFTING",
            category: "TECHNOLOGY",
            date: "OCT 24, 2025",
            author: "Dr. A. Vance",
            image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop",
            excerpt: "How neural networks are learning to control slip angles better than professional drivers, creating a new era of recreational autopilot.",
            featured: true
        },
        {
            id: 2,
            title: "MATERIAL SCIENCE: GRAPHENE CHASSIS",
            category: "MATERIALS",
            date: "OCT 10, 2025",
            author: "Sarah Connors",
            image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
            excerpt: "Replacing carbon fiber with graphene composites allows for a 40% weight reduction while doubling structural rigidity."
        },
        {
            id: 3,
            title: "BIOMETRIC FEEDBACK LOOPS",
            category: "UX DESIGN",
            date: "SEP 28, 2025",
            author: "J. Chen",
            image: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1000&auto=format&fit=crop",
            excerpt: "The car that feels what you feel. Exploring the ethics and utility of emotion-sensing cockpits in high-performance vehicles."
        },
        {
            id: 4,
            title: "THE END OF PHYSICAL CONTROLS?",
            category: "INTERFACES",
            date: "SEP 15, 2025",
            author: "Elena R.",
            image: "https://images.overdrive.in/wp-content/uploads/2016/03/BMW-Next-Vision-100.jpg",
            excerpt: "Holographic interfaces and neural links are rapidly replacing the steering wheel. Are we ready to let go?"
        },
        {
            id: 5,
            title: "SUSTAINABLE LUXURY REDEFINED",
            category: "ECO-TECH",
            date: "SEP 02, 2025",
            author: "M. Green",
            image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop",
            excerpt: "From mushroom leather to recycled ocean plastics, the next generation of luxury interiors is 100% biodegradable."
        }
    ];

    return (
        <div className="blogs-container">
            {/* --- Hero Section --- */}
            <header className="blogs-hero">
                <div className="hero-deco-line"></div>
                <motion.h1
                    className="blogs-title"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    INSIGHTS
                </motion.h1>
                <motion.div
                    className="blogs-subtitle"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    // EXPLORING THE FRONTIER OF MOTION
                </motion.div>
            </header>

            {/* --- Blog Grid --- */}
            <section className="blogs-grid">
                {blogPosts.map((post, index) => (
                    <motion.article
                        className={`blog-card ${post.featured ? 'featured' : ''}`}
                        key={post.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                        <div className="blog-image-wrapper">
                            <img src={post.image} alt={post.title} />
                            <div className="blog-cat-badge">{post.category}</div>
                        </div>
                        <div className="blog-content">
                            <span className="blog-date">{post.date}</span>
                            <h3>{post.title}</h3>
                            <p className="blog-excerpt">{post.excerpt}</p>
                            <div className="blog-footer">
                                <span className="blog-author">{post.author}</span>
                                <button className="read-more-btn">
                                    READ ARTICLE <FaArrowRight />
                                </button>
                            </div>
                        </div>
                    </motion.article>
                ))}
            </section>
        </div>
    );
};

export default Blogs;
