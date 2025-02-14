import React from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Marquee from "./Marquee";

const CompanyLogo = ({ isActive, company }) => {
    const logoVariants = {
        active: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1], // Custom bezier curve for smooth animation
                opacity: { duration: 0.6 }
            }
        },
        inactive: {
            scale: 0.7,
            opacity: 0.2,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                opacity: { duration: 0.6 }
            }
        }
    };

    return (
        <motion.div
            className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#333333] overflow-hidden flex items-center justify-center"
            variants={logoVariants}
            initial="inactive"
            animate={isActive ? "active" : "inactive"}
            layout
        >
            {company === "adweek" && (
                <motion.svg
                    viewBox="0 0 47.041 13.337"
                    className="w-16 h-16 md:w-24 md:h-24"
                    initial={false}
                >
                    <motion.path
                        fill={isActive ? "#ffffff" : "#666666"}
                        d="M41.28 12.54H38.4V0h2.88v4.32L42.72 0h2.82l-1.68 5.04 1.98 7.5H42.9L41.28 6.6v5.94zM37.8 9.72h-3V7.021h3V4.62h-3V2.4h3V0h-5.82v12.54h5.82V9.72zM31.38 2.4V0h-8.1l-1.02 5.88L21.42 0h-2.58l-.78 5.88L17.04 0h-2.82l.17 1.105A2.385 2.385 0 0 0 12.42 0H7.26v7.92L6.12 0H1.8L0 12.54h2.76l.3-1.92h1.8l.3 1.92h7.26c1.291.005 2.355-1.059 2.34-2.4V3.527l1.38 9.013h3l1.02-7.14 1.02 7.14h3l1.32-8.621v8.621h5.88V9.72h-3V7.021h3v-2.4h-3V2.4h3zM3.42 7.92l.54-3.6.526 3.6H3.42zm8.52.9a.93.93 0 0 1-.9.899h-.9V2.4h.9c.498.02.885.407.9.9v5.52zM46.51 13.337a.532.532 0 1 0-.002-1.064.532.532 0 0 0 .002 1.064zm0-.07c-.261 0-.449-.202-.449-.465 0-.259.188-.461.449-.461.259 0 .447.202.447.461 0 .262-.188.465-.447.465zm.086-.441c.105-.003.188-.047.188-.163 0-.098-.054-.158-.211-.158h-.262v.596h.074v-.274h.134l.169.274h.088l-.18-.275zm-.211-.057v-.211h.17c.073 0 .148.011.148.104 0 .121-.123.107-.208.107h-.11z"
                        transition={{ duration: 0.4 }}
                    />
                </motion.svg>
            )}
            {company === "planit" && (
                <motion.svg
                    viewBox="0 0 121.13 121.13"
                    className="w-24 h-24"
                    initial={false}
                >
                    <motion.g
                        fill={isActive ? "#86df00" : "#666666"}
                        transition={{ duration: 0.4 }}
                    >
                        <motion.path d="M69.91 17.28a33.94 33.94 0 1 1-24 9.94 34 34 0 0 1 24-9.94m0-17.28a51.22 51.22 0 1 0 51.22 51.22A51.22 51.22 0 0 0 69.91 0ZM17.07 94.19a9.87 9.87 0 1 1-9.87 9.87 9.89 9.89 0 0 1 9.87-9.87m0-7.2a17.07 17.07 0 1 0 17.07 17.07 17.07 17.07 0 0 0-17.07-17.07Z" />
                    </motion.g>
                </motion.svg>
            )}
        </motion.div>
    );
};

const JobSection = ({ id, title, date, isActive, onSectionInView, children }) => {
    const sectionRef = React.useRef(null);
    const isInView = useInView(sectionRef, {
        margin: "-35% 0px -35% 0px",
        amount: 0.15,
        once: false
    });

    React.useEffect(() => {
        if (isInView) {
            onSectionInView(id);
        }
    }, [isInView, id, onSectionInView]);

    const mobileVariants = {
        active: {
            transition: {
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1]
            }
        },
        inactive: {
            transition: {
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    const mobileContentVariants = {
        active: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1]
            }
        },
        inactive: {
            opacity: 0.6,
            scale: 0.95,
            transition: {
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    return (
        <div ref={sectionRef} className="relative">
            {/* Mobile Layout */}
            <div className="block md:hidden">
                <motion.div
                    className="sticky top-[63px] z-20 bg-black"
                    variants={mobileVariants}
                    initial="inactive"
                    animate={isActive ? "active" : "inactive"}
                >
                    <div className="absolute inset-x-0 -top-[63px] h-[63px] bg-black" />
                    <div className="px-6 pb-4">
                        <motion.div
                            className="relative flex items-center justify-between pt-2"
                            variants={mobileContentVariants}
                            initial="inactive"
                            animate={isActive ? "active" : "inactive"}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="mr-4 pb-2"
                            >
                                <div className="scale-[0.65]">
                                    <CompanyLogo isActive={isActive} company={id} />
                                </div>
                            </motion.div>
                            <div className="flex-1">
                                <motion.h3
                                    className="font-light font-serif text-[24px] tracking-wide"
                                    animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0.6, scale: 0.95 }}
                                >
                                    {title}
                                </motion.h3>
                                <p className="text-[16px] text-gray-400 font-light tracking-wide">{date}</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
                <div className="mt-8">
                    <div className="w-full md:max-w-[280px] mx-auto">
                        {children}
                    </div>
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:grid md:grid-cols-12 md:gap-8">
                <div className="col-span-4">
                    <motion.div
                        className="sticky top-16 overflow-hidden"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="pl-16 py-4">
                            <div className="flex flex-col">
                                <motion.h3
                                    className="font-light font-serif text-[32px] tracking-wide"
                                    animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0.8, scale: 0.95 }}
                                >
                                    {title}
                                </motion.h3>
                                <p className="text-[16px] text-gray-400 font-light tracking-wide">{date}</p>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="mt-4"
                                >
                                    <CompanyLogo isActive={isActive} company={id} />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    className="col-span-8 w-full pl-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <div className="max-w-[480px] ml-8">
                        {children}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const WorkContent = () => {
    const [activeSection, setActiveSection] = React.useState("adweek");
    const { scrollYProgress } = useScroll();
    const timelineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const workRef = React.useRef(null);
    const isWorkInView = useInView(workRef, {
        margin: "-20% 0px -20% 0px",
        once: false
    });

    React.useEffect(() => {
        const setIsWorkVisible = window.setIsWorkVisible;
        if (setIsWorkVisible) {
            setIsWorkVisible(isWorkInView);
        }
    }, [isWorkInView]);

    const onSectionInView = (sectionId) => {
        setActiveSection(sectionId);
    };

    return (
        <div className="relative w-full">
            <div ref={workRef} id="work-section" className="container mx-auto relative px-6 md:px-12">
                {/* Header */}
                <div className="bg-black pt-16 md:pt-32 z-40 relative">
                    <motion.h2
                        className="text-[24px] md:text-[30px] font-light leading-[40px] md:leading-[35px] tracking-wide font-serif mb-8"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        Work.
                    </motion.h2>
                    <hr className="h-px mb-8 bg-gray-200 border-0 dark:bg-gray-700" />
                </div>

                {/* Vertical Timeline */}
                <div className="absolute left-2 md:left-[1.65rem] top-[120px] md:top-[180px] w-[2px] md:w-px h-[calc(100%-120px)] md:h-[calc(100%-180px)] bg-[#333333] z-10">
                    <motion.div
                        className="absolute top-0 w-full h-full"
                        style={{
                            background: "linear-gradient(to bottom, transparent, #333333, transparent)",
                            backgroundSize: "100% 300%",
                        }}
                    />
                    <motion.div
                        className="absolute top-0 w-full"
                        initial={{ height: "0%" }}
                        style={{
                            height: timelineHeight,
                            background: activeSection === "adweek" ? "#ffffff" : "#86df00",
                            boxShadow: `0 0 10px ${activeSection === "adweek" ? "#ffffff50" : "#86df0050"}`,
                        }}
                        transition={{ duration: 0.5 }}
                    />
                </div>

                {/* Job Sections */}
                <div className="relative">
                    <div id="adweek" className="work-section min-h-[60vh] md:min-h-[80vh] pt-8 md:pt-24 pb-12">
                        <JobSection
                            id="adweek"
                            title="ADWEEK - Software Engineer"
                            date="APR 2024 - PRESENT"
                            isActive={activeSection === "adweek"}
                            onSectionInView={onSectionInView}
                        >
                            <motion.p
                                className="text-[24px] md:text-[24px] font-light leading-[40px] md:leading-relaxed mt-6 md:mt-12 tracking-wide"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true, margin: "-100px" }}
                            >
                                At Adweek, I'm the go-to problem solver, transforming challenges into opportunities and delivering digital solutions that leave a mark. I've built sleek, high-performance web experiences that engage millions, working hand-in-hand with editorial and design teams to keep Adweek at the forefront of digital media.
                            </motion.p>
                            <motion.p
                                className="text-[24px] md:text-[24px] font-light leading-[40px] md:leading-relaxed mt-6 md:mt-12 tracking-wide"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                viewport={{ once: true, margin: "-100px" }}
                            >
                                When it mattered most, I stepped up. The Super Bowl Tracker, once infamous for crashing under demand, is now a rock-solid powerhouse ready to handle anything thrown its way. I uncovered vulnerabilities in a proposed paywall solution that would have cost the company significant revenue, saving the day and future-proofing our digital strategy.
                            </motion.p>
                            <motion.p
                                className="text-[24px] md:text-[24px] font-light leading-[40px] md:leading-relaxed mt-6 md:mt-12 tracking-wide"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                viewport={{ once: true, margin: "-100px" }}
                            >
                                And when our site faced a major crisis, and things seemed hopeless, I took the reins. Diagnosing the issue and restoring the site, I brought us back online quickly, ensuring business as usual. Whether scaling platforms, solving critical problems, or future-proofing our tech stack, I thrive on making Adweek's digital presence unstoppable.
                            </motion.p>
                        </JobSection>
                    </div>

                    <div id="planit" className="work-section min-h-[60vh] md:min-h-[80vh] pt-12 pb-12">
                        <JobSection
                            id="planit"
                            title="Planit Agency - Jr Developer"
                            date="OCT 2021 - MAR 2024"
                            isActive={activeSection === "planit"}
                            onSectionInView={onSectionInView}
                        >
                            <motion.p
                                className="text-[24px] md:text-[24px] font-light leading-[40px] md:leading-relaxed mt-6 md:mt-12 tracking-wide"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true, margin: "-100px" }}
                            >
                                At Planit Agency, I was the digital swiss army knife, transforming bold ideas into stunning digital campaigns.
                            </motion.p>
                            <motion.p
                                className="text-[24px] md:text-[24px] font-light leading-[40px] md:leading-relaxed mt-6 md:mt-12 tracking-wide"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                viewport={{ once: true, margin: "-100px" }}
                            >
                                Over 4,500 interactive banner ads? Built and deployed with finesse using GSAP for powerhouse clients like DuPont and the Government of Maryland. WordPress wizardry? Delivered custom components like testimonial sliders, interactive pricing tables, and sleek search results, all styled to perfection with Tailwind CSS.
                            </motion.p>
                            <motion.p
                                className="text-[24px] md:text-[24px] font-light leading-[40px] md:leading-relaxed mt-6 md:mt-12 tracking-wide"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                viewport={{ once: true, margin: "-100px" }}
                            >
                                Oh, and those 25+ monthly HTML email campaigns? They weren't just emails—they were traffic-boosting, conversion-driving works of art. Planit wasn't just work—it was my playground for mastering the craft of digital storytelling.
                            </motion.p>
                        </JobSection>
                    </div>
                </div>
            </div>
            {/* Marquee section was removed because it wasn't performing well, like the Terminator it will be back. */}
            <div className="relative w-full mt-32">
                <div className="overflow-hidden">
                    {/* <Marquee /> */}
                </div>
            </div>
        </div>
    );
};

export default WorkContent;