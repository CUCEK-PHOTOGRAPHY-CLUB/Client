import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Sparkles } from 'lucide-react';

const imgSymphony = "https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=1000&auto=format&fit=crop";
const imgRhythm = "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1000&auto=format&fit=crop";
const imgActor = "https://images.unsplash.com/photo-1514306191717-452ec28c7814?q=80&w=1000&auto=format&fit=crop";
const imgLens = "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop";
const imgFrame = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop";
const imgCanvas = "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1000&auto=format&fit=crop";

const categories = [
    { id: 1, name: 'SYMPHONY', subtitle: 'Song & Music', color: 'from-pink-500 to-rose-600', style: 'top-[10%] left-[5%] md:left-[10%] rotate-[-2deg]', image: imgSymphony },
    { id: 2, name: 'RHYTHM', subtitle: 'Dance', color: 'from-cyan-400 to-blue-600', style: 'top-[25%] right-[5%] md:right-[15%] rotate-[3deg]', image: imgRhythm },
    { id: 3, name: 'ACTOR', subtitle: 'Drama', color: 'from-purple-500 to-indigo-600', style: 'top-[45%] left-[8%] md:left-[20%] rotate-[-4deg]', image: imgActor },
    { id: 4, name: 'LENS', subtitle: 'Photography', color: 'from-amber-400 to-orange-600', style: 'top-[60%] right-[10%] md:right-[8%] rotate-[1deg]', image: imgLens },
    { id: 5, name: 'FRAME', subtitle: 'Videography', color: 'from-emerald-400 to-teal-600', style: 'top-[75%] left-[15%] md:left-[25%] rotate-[-1deg]', image: imgFrame },
    { id: 6, name: 'CANVAS', subtitle: 'Fine Arts', color: 'from-red-500 to-pink-700', style: 'top-[90%] right-[20%] md:right-[30%] rotate-[2deg]', image: imgCanvas },
];

const SattvaGallery = () => {
    // 🔗 PASTE YOUR GOOGLE DRIVE LINK HERE
    const googleDriveLink = "https://drive.google.com/drive/folders/YOUR_FOLDER_ID";

    const { scrollYProgress } = useScroll();
    const opacityTransform = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    // Custom "Artistic" Cursor State
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="relative min-h-[300vh] bg-[#0a0a0a] text-[#e0e0e0] font-sans overflow-x-hidden selection:bg-pink-500/30">

            {/* Custom Abstract Cursor Glow */}
            <motion.div
                className="fixed top-0 left-0 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full pointer-events-none z-0 mix-blend-screen filter blur-[100px] opacity-40 invisible md:visible"
                animate={{
                    x: mousePos.x - 250,
                    y: mousePos.y - 250,
                    backgroundColor: isHovering ? '#ec4899' : '#8b5cf6',
                    scale: isHovering ? 1.5 : 1
                }}
                transition={{ type: 'tween', ease: 'easeOut', duration: 1 }}
            />

            {/* HERO SECTION - Typography as Art */}
            <motion.div
                style={{ opacity: opacityTransform, y: useTransform(scrollYProgress, [0, 1], [0, 500]) }}
                className="fixed inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-4"
            >
                <div className="relative">
                    <h1 className="text-[15vw] md:text-[12vw] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 select-none">
                        SATTVA
                    </h1>
                    <span className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl md:text-5xl font-serif italic text-pink-500 whitespace-nowrap">
                        The Canvas of CPC
                    </span>
                </div>

                <p className="mt-8 text-sm md:text-lg text-white/50 tracking-[0.3em] uppercase font-light pointer-events-auto text-center">
                    Scroll down to explore
                </p>
            </motion.div>

            {/* FLOATING ART ELEMENTS CONTINUUM */}
            <div className="relative z-20 w-full h-full pt-[100vh]">
                <div className="relative w-full max-w-7xl mx-auto min-h-[200vh]">

                    {categories.map((category, i) => (
                        <motion.a
                            href={googleDriveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={category.id}
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, delay: i % 2 === 0 ? 0 : 0.2 }}
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                            className={`absolute ${category.style} group block perspective-1000 w-[85vw] max-w-[400px]`}
                        >
                            {/* The "Canvas Frame" */}
                            <motion.div
                                whileHover={{ rotateX: 5, rotateY: -5, scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-[3/4] flex flex-col justify-end p-6 md:p-10"
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                {/* Art Background Image with Hover Color Pop */}
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 md:grayscale group-hover:grayscale-0 scale-100 md:group-hover:scale-110 opacity-70 group-hover:opacity-100"
                                />

                                {/* Dark bottom gradient for text readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                                {/* Inner glow line on hover */}
                                <div className={`absolute inset-0 border-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl border-transparent bg-gradient-to-br ${category.color} [mask-image:linear-gradient(white,white)] [-webkit-mask-composite:destination-out] [mask-composite:exclude] p-[3px]`} />

                                <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
                                    <span className="text-xs tracking-widest text-white/70 uppercase font-mono mb-2 block">
                                        0{category.id} // {category.subtitle}
                                    </span>

                                    <h2 className={`text-4xl md:text-5xl font-black text-white tracking-tighter transition-all duration-500`}>
                                        {category.name}
                                    </h2>

                                    <div className="mt-6 flex items-center text-sm font-semibold tracking-wide text-white/50 group-hover:text-white transition-colors duration-300">
                                        Open Drive <ExternalLink className="w-4 h-4 ml-2" />
                                    </div>
                                </div>
                            </motion.div>
                        </motion.a>
                    ))}

                </div>
            </div>

            {/* FLOATING ACTION BUTTON */}
            <motion.div
                className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
            >
                <a
                    href={googleDriveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold tracking-wide hover:bg-white hover:text-black transition-all duration-300"
                >
                    <Sparkles className="w-5 h-5" />
                    ACCESS MASTER DRIVE
                </a>
            </motion.div>

        </div>
    );
};

export default SattvaGallery;
