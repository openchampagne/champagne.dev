import React, { Suspense, useState, useEffect, useRef, } from 'react';
import { getAllPosts } from '../utils/posts';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import BabylonScene from '../components/home/BabylonScene';
import WorkContent from '../components/home/WorkContent';

const Section = ({ children, className, id }) => (
    <section id={id} className={`min-h-screen flex items-center justify-center ${className}`}>
        {children}
    </section>
);

const LatestPosts = ({ posts }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((post, index) => {
            const postTeaser = post.content.replace(/!\[.*?\]\(.*?\)/g, '').substring(0, 100) + "...";
            const postDate = new Date(post.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

            // Ensure the image path is properly resolved
            const featuredImage = post['featured-image']
                ? `/posts/${post['featured-image']}` // Prepend /blog/ to the path
                : '/posts/images/france.png';

            return (
                <motion.div
                    key={post.id}
                    className="max-w-xs w-full group/card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <Link to={`/blog/${post.id}`} className="hover:underline">
                        <div className="cursor-pointer overflow-hidden relative card h-96 shadow-xl max-w-sm mx-auto flex flex-col justify-between p-4">
                            {/* Background image with proper path resolution */}
                            <div
                                className="absolute inset-0 w-full h-full bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${featuredImage})`
                                }}
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 w-full h-full transition duration-300 group-hover/card:bg-black opacity-60" />

                            {/* Content */}
                            <div className="relative z-10">
                                <div className="flex flex-row items-center space-x-4">
                                    <div className="flex flex-col">
                                        <h1 className="text-xl md:text-4xl mt-4 text-gray-50">
                                            {post.title}
                                        </h1>
                                        <p className="text-sm text-gray-400">{postDate}</p>
                                    </div>
                                </div>

                                <div className="text content mt-auto">
                                    <p className="font-normal text-md text-gray-50">
                                        {postTeaser}
                                    </p>
                                    <p className="font-normal text-lg text-gray-50 my-4">
                                        Read more
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.div>
            );
        })}
    </div>
);

const Home = ({ setIsContactVisible, setIsWorkVisible }) => {
    const [latestPosts, setLatestPosts] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const videoRef = useRef(null);
    const contactRef = useRef(null);
    const workRef = useRef(null);
    const [isModelLoading, setIsModelLoading] = useState(true);

    const scrollTo = (id) => {
        const element = document.getElementById(id);
        element.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '-100px 0px', // Adjust this value to control when the header changes
            threshold: [0, 0.1]
        };

        const contactObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                console.log('Contact intersection ratio:', entry.intersectionRatio);
                setIsContactVisible(entry.isIntersecting);
            });
        }, options);

        const workObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                console.log('Work intersection ratio:', entry.intersectionRatio);
                setIsWorkVisible(entry.isIntersecting);
            });
        }, options);

        // Observe the sentinel element instead of the entire work section
        const workSentinel = document.getElementById('work-sentinel');
        if (workSentinel) {
            workObserver.observe(workSentinel);
            console.log('Work sentinel observer attached');
        } else {
            console.warn('Work sentinel not found');
        }

        if (contactRef.current) {
            contactObserver.observe(contactRef.current);
            console.log('Contact section observer attached to:', contactRef.current);
        }

        return () => {
            contactObserver.disconnect();
            workObserver.disconnect();
        };
    }, [setIsContactVisible, setIsWorkVisible]);

    useEffect(() => {
        getAllPosts().then(posts => {
            console.log('Posts data:', posts);
            if (posts.length > 0) {
                console.log('First post data:', {
                    title: posts[0].title,
                    featuredImage: posts[0]['featured-image']
                });
            }
            setLatestPosts(posts.slice(0, 3));
        }).catch(error => {
            console.error('Error fetching posts:', error);
        });

        // Video scroll handling
        const MAX_VIDEO_TIME = 18;
        const handleScroll = () => {
            if (!videoRef.current || !contactRef.current) return;

            const rect = contactRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight - 400;

            const startOffset = viewportHeight * 0.1;
            const endOffset = viewportHeight * 0.5;

            const scrollProgress = (startOffset - rect.top) / (startOffset + endOffset);
            const acceleratedProgress = Math.sign(scrollProgress) * Math.pow(Math.abs(scrollProgress), 0.2);

            if (videoRef.current.duration) {
                const finalProgress = Math.max(0, Math.min(1, (acceleratedProgress + 1) / 1));
                const maxProgress = MAX_VIDEO_TIME;
                const clampedTime = finalProgress * maxProgress * videoRef.current.duration;
                videoRef.current.currentTime = Math.min(clampedTime, MAX_VIDEO_TIME);
            }
        };

        // Add scroll listener
        const scrollContainer = document.querySelector('.snap-y');
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
        }

        // Cleanup
        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    React.useEffect(() => {
        // Make setIsWorkVisible available globally for the WorkContent component
        window.setIsWorkVisible = setIsWorkVisible;

        return () => {
            // Cleanup
            delete window.setIsWorkVisible;
        };
    }, [setIsWorkVisible]);

    //TODO: this should be split into components

    return (
        <div className="snap-y snap-mandatory h-screen overflow-scroll">
            <Section id="home" className="bg-[#F7F6F3] text-[#282828]">
                <div className="container mx-auto">
                    {/* Mobile: Stack vertically, Desktop: Side by side */}
                    <div className="flex flex-col-reverse md:flex-row items-center">
                        {/* Text content - Full width on mobile, half on desktop */}
                        <div className="w-full md:w-1/2 mt-8 md:mt-0 px-4 md:px-4">
                            <motion.div
                                initial="hidden"
                                animate={!isModelLoading ? "visible" : "hidden"}
                                variants={{
                                    hidden: {},
                                    visible: {
                                        transition: {
                                            duration: 1,
                                            staggerChildren: 0.5,
                                        }
                                    }
                                }}
                            >
                                <motion.p
                                    className="text-[32px] md:text-[36px] leading-[45px] md:leading-[50px] my-4 md:my-8 text-[#000000] font-light"
                                    variants={{
                                        hidden: { opacity: 0, y: 5 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                >
                                    Hey there, I'm <span className="text-[#000000]">Felipe 🥀</span>. I believe in <span className="text-[#000000]">elegance, simplicity</span>, and crafting <span className="text-[#000000]">user interfaces</span> that feel as <span className="text-[#000000]">luxurious</span> as they are <span className="text-[#000000]">functional</span>. My work is about bringing <span className="text-[#000000]">bold ideas</span> to life with <span className="text-[#000000]">precision and purpose</span>.
                                </motion.p>

                                <motion.p
                                    className="text-[32px] md:text-[36px] leading-[45px] md:leading-[50px] my-4 md:my-8 text-[#000000] font-light"
                                    variants={{
                                        hidden: { opacity: 0, y: 10 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                >
                                    By day, I'm a <span className="text-[#000000]">Software Engineer</span> at <span className="text-[#000000]">Adweek</span>, where I write <span className="text-[#000000]">high-performance code</span> and develop <span className="text-[#000000]">innovative, impactful digital experiences</span> ✨
                                </motion.p>

                                <motion.div
                                    variants={{
                                        hidden: { opacity: 0, y: 15 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                >
                                    <a href="#" onClick={() => scrollTo('about')} className="underline decoration-dotted underline-offset-8 decoration-2 text-[24px] md:text-[40px] hover:decoration-wavy">Learn More.</a>
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* 3D Model - Smaller on mobile */}
                        <div className="w-full md:w-1/2 h-[400px] md:h-[400px] flex items-center justify-center -mt-8 md:mt-0">
                            <Suspense fallback={null}>
                                <div className="w-full h-full md:w-[500px] md:h-[500px] flex items-center justify-center outline-none">
                                    <BabylonScene onLoadingStateChange={setIsModelLoading} />
                                </div>
                            </Suspense>
                        </div>
                    </div>
                </div>
            </Section>

            <Section id="about" className="bg-[#F7F6F3]">
                <div className="container mx-auto px-4 py-8 ">
                    <h2 className="text-3xl font-serif mt-8">About.</h2>
                    <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                    <div className="flex flex-col md:flex-row">
                        <motion.div className="md:w-1/2 pr-0 md:pr-8"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            <motion.p
                                className="font-light text-[24px] md:text-[30px] leading-[40px] md:leading-[35px] text-[#181818] my-8"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true, margin: "-100px" }}
                            >
                                As a Full-Stack Software Engineer, I design web interfaces that are as elegant as they are intuitive. With expertise in React, PHP, and Tailwind CSS, I transform bold ideas into dynamic, high-performance websites that balance beauty with functionality.
                            </motion.p>
                            <motion.p
                                className="font-light text-[24px] md:text-[30px] leading-[40px] md:leading-[35px] text-[#181818] my-8"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                viewport={{ once: true, margin: "-100px" }}
                            >
                                By day, I'm at Adweek, building innovative digital solutions with precision and purpose. In my free time, I create browser extensions that elevate online experiences and explore ways to merge simplicity with sophistication in everything I build.
                            </motion.p>
                            <motion.p
                                className="font-light text-[24px] md:text-[30px] leading-[40px] md:leading-[35px] text-[#181818] my-8"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                viewport={{ once: true, margin: "-100px" }}
                            >
                                When I'm not crafting sleek code or refining designs, you'll find me cruising through New York City on a Citi Bike, savoring Manhattan's finest restaurants, or uncovering inspiration in the latest design trends.
                            </motion.p>
                        </motion.div>
                        <div className="md:w-1/2 flex justify-center mb-8 md:mb-0 overflow-hidden px-6">
                            <motion.div className="w-[80%] md:w-auto"
                                initial={{ opacity: 0, x: isMobile ? 100 : 200 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: isMobile ? 100 : 200 }}
                                transition={{
                                    duration: isMobile ? 0.3 : 1,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                                viewport={{
                                    once: false,
                                    margin: isMobile ? "-5%" : "-20%"
                                }}
                            >
                                <img
                                    src="/assets/pasta.jpg"
                                    alt="pasta"
                                    className="w-full aspect-[3/4] md:w-auto md:h-[500px] box-border bg-cover border-[16px] mx-auto my-8 md:my-12 border-white rounded shadow-md transform rotate-[8deg] object-cover"
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </Section>

            <Section id="work" className="bg-black text-white">
                <motion.div
                    ref={workRef}
                    className=""
                >
                    <WorkContent />
                </motion.div>
            </Section>
            {/* TODO: Add blog section back in, removed for now */}
            {/* <Section id="blog" className="bg-white">
                <div className="container mx-auto px-4 py-8">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-serif mb-4">Latest Blog Posts</h2>
                        <LatestPosts posts={latestPosts} />
                        <Link to="/blog" className="mt-4 inline-block text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                            View all posts
                        </Link>
                    </motion.div>
                </div>
            </Section> */}

            <Section id="contact" className="bg-black text-white ">
                <motion.div
                    ref={contactRef}
                    className="container mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="space-y-8 md:w-1/2">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4 font-thin">Contact.</h2>
                        <p className="text-xl md:text-2xl font-serif">Let's connect and make ideas bloom</p>

                        <a
                            href="mailto:hello@champagne.dev"
                            className="block text-[40px] hover:text-gray-300 transition-colors underline underline-offset-8 decoration-2 decoration-dotted hover:decoration-wavy"
                        >
                            hello@champagne.dev
                        </a>

                        <div className="mt-12">
                            <p className="text-xl font-serif mb-4">Where roots grow deep</p>
                            <div className="space-y-4">
                                <a
                                    href="https://github.com/openchampagne"
                                    className="block hover:text-gray-300 transition-colors underline underline-offset-8 decoration-2 decoration-dotted hover:decoration-wavy"
                                >
                                    Github
                                </a>
                                <a
                                    href="https://linkedin.com/in/openchampagne"
                                    className="block hover:text-gray-300 transition-colors underline underline-offset-8 decoration-2 decoration-dotted hover:decoration-wavy"
                                >
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Rose is actually a video that scrubs on scroll 🥀 */}
                    <div className="md:w-full md:mt-0 text-white">
                        <video
                            ref={videoRef}
                            className="w-full h-auto cursor-pointer"
                            playsInline
                            muted
                            preload="metadata"
                            loop
                            onClick={() => {
                                if (videoRef.current) {
                                    if (window.innerWidth <= 768) { // Mobile
                                        if (videoRef.current.paused) {
                                            videoRef.current.play();
                                        } else {
                                            videoRef.current.pause();
                                        }
                                    } else { // Desktop
                                        videoRef.current.currentTime = 26;
                                    }
                                }
                            }}
                            onMouseEnter={() => {
                                if (videoRef.current && window.innerWidth > 768) {
                                    videoRef.current.currentTime = 0;
                                }
                            }}
                            onMouseLeave={() => {
                                if (videoRef.current && window.innerWidth > 768) {
                                    videoRef.current.currentTime = 18;
                                }
                            }}
                            onLoadedData={() => {
                                console.log('Video loaded successfully');
                                if (videoRef.current) {
                                    videoRef.current.currentTime = 18;
                                }
                            }}
                            poster="/assets/rose-poster.jpg"
                        >
                            <source src="/assets/rose.mp4" type="video/mp4" />
                            <img src="/assets/rose-poster.jpg" alt="Rose video poster" className="w-full h-auto" />
                        </video>
                    </div>
                </motion.div>
            </Section>
        </div >
    );
};

export default Home;