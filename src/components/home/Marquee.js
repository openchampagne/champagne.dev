import React from "react";
import { motion } from "framer-motion";

const marqueeVariants = {
    animate: {
        x: [0, -1035],
        transition: {
            x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 15,
                ease: "linear",
            },
        },
    },
};

const Marquee = () => {
    return (
        <div className="flex flex-col gap-2 mb-12 md:mb-24">
            <div className="overflow-hidden">
                <div className="animate-marquee flex whitespace-nowrap">
                    <h1 className="text-[24px] md:text-[48px] font-light">
                        React ✦ Front-End Development ✦ UX/UI Design ✦ Digital Transformation ✦ Web Performance ✦
                    </h1>
                    <h1 className="text-[24px] md:text-[48px] font-light">
                        React ✦ Front-End Development ✦ UX/UI Design ✦ Digital Transformation ✦ Web Performance ✦
                    </h1>
                </div>
            </div>

            <div className="overflow-hidden">
                <div className="animate-marquee-reverse flex whitespace-nowrap">
                    <h1 className="text-[24px] md:text-[48px] font-light">
                        JavaScript ✦ PHP ✦ REST APIs ✦ Database Design ✦ WordPress ✦ Python ✦
                    </h1>
                    <h1 className="text-[24px] md:text-[48px] font-light">
                        JavaScript ✦ PHP ✦ REST APIs ✦ Database Design ✦ WordPress ✦ Python ✦
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default Marquee;

