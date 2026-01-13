import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import ImageCard from '../componets/gallery/ImageCard';
import ExpandedImageView from '../componets/gallery/ExpandedImageView';
import romanjamImg from '../assets/FilmSceneRec/Image-113.jpg';
import manichith from '../assets/FilmSceneRec/Image-527.jpg';
import selfie from '../assets/FilmSceneRec/Image-637.jpg';
import bhoothakalam from '../assets/FilmSceneRec/Image-995.jpg';
import vettam from '../assets/FilmSceneRec/Image-65.jpg';
import adikap from '../assets/FilmSceneRec/Image-942.jpg';
import salala from '../assets/FilmSceneRec/Image-411.jpg';
import bg1 from '../assets/FilmSceneRec/bg1.png';


const DRAG_BUFFER = 50;
const SPRING_OPTIONS = {
    stiffness: 300,
    damping: 50,
    mass: 0.5,
};


const MOCK_FILM_RECREATIONS = [
    {
        id: 'fr-1',
        title: 'Romanjam',
        description: 'Recreation of the Film Romanjam by Team Medillin_co',
        imageUrl: romanjamImg,
        link: 'https://www.instagram.com/cucek_photography_club/reel/DF-UU7GSE-0/',
    },
    {
        id: 'fr-2',
        title: 'Manichithrathazhu',
        description: 'Recreation of the Film Manichithrathazhu',
        imageUrl: manichith,
        link: 'https://www.instagram.com/cucek_photography_club/reel/DF-ow90ygDb/',
    },
    {
        id: 'fr-3',
        title: 'Oru Vadakkan Selfie',
        description: 'Recreation of the Film Oru Vadakkan Selfie',
        imageUrl: selfie,
        link: 'https://www.instagram.com/cucek_photography_club/reel/DF-UU7GSE-0/',
    },
    {
        id: 'fr-4',
        title: 'Bhoothakalam',
        description: 'Recreation of the Film Bhoothakalam',
        imageUrl: bhoothakalam,
        link: 'https://www.instagram.com/cucek_photography_club/reel/DGA_l-nS5IX/',
    }, {
        id: 'fr-5',
        title: 'Vettam',
        description: 'Recreation of the Film Vettam',
        imageUrl: vettam,
        link: 'https://www.instagram.com/cucek_photography_club/reel/DGH3M5mywis/',
    },
    {
        id: 'fr-6',
        title: 'Adi Kapyare Koottamani',
        description: 'Recreation of the Film Adi Kapyare Koottamani',
        imageUrl: adikap,
        link: 'https://www.instagram.com/cucek_photography_club/reel/DGLi0iTS5la/',
    },
    {
        id: 'fr-7',
        title: 'Salala Mobiles',
        description: 'Recreation of the Film Salala Mobiles',
        imageUrl: salala,
        link: 'https://www.instagram.com/cucek_photography_club/reel/DGRAPwcz-Wz/',
    },
];

// --- Skeleton Component ---
const FilmGallerySkeleton = () => {
    const skeletonCards = Array.from({ length: 5 });

    return (
        <div className="relative h-screen w-full overflow-hidden bg-neutral-950 text-white font-sans">
            <div className="absolute inset-0 z-0 flex items-center justify-center">
                <p className="text-center text-5xl md:text-7xl font-black text-neutral-800 pointer-events-none">
                    FILM RECREATIONS
                </p>
            </div>

            <div className="relative z-10 h-full flex items-center gap-4 md:gap-8 px-12 animate-pulse">
                {skeletonCards.map((_, idx) => (
                    <div
                        key={idx}
                        className={`
              relative aspect-[9/12] w-48 md:w-60 lg:w-72 shrink-0
              rounded-2xl overflow-hidden bg-neutral-900
              ${idx % 2 === 0 ? 'mb-24' : 'mt-24'}
            `}
                    >
                        <div className="absolute top-0 left-[-150%] h-full w-[150%] animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                    </div>
                ))}
            </div>

            <div className="absolute inset-0 z-20 flex items-center justify-between pointer-events-none px-4">
                <div className="h-10 w-10 rounded-full bg-neutral-800/50"></div>
                <div className="h-10 w-10 rounded-full bg-neutral-800/50"></div>
            </div>
        </div>
    );
};


const FilmRecreationPage = () => {
    // --- STATE ---
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedImage, setSelectedImage] = useState(null);
    const containerRef = useRef(null);
    const [dragConstraints, setDragConstraints] = useState({ right: 0, left: 0 });

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const dragX = useMotionValue(0);
    const dragXSpring = useSpring(dragX, SPRING_OPTIONS);

    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(true);

    // --- MOCK DATA LOADING ---
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 800));

            const formattedItems = MOCK_FILM_RECREATIONS.map((item, index) => ({
                ...item,
                src: item.imageUrl,
                uniqueId: `${item.id}-${index}`,
            }));

            setImages(formattedItems);
            setLoading(false);
        };

        loadData();
    }, []);

    const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
        // Only track mouse for background effect in the top section
        // or we can track it globally
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    const background = useMotionTemplate`
    radial-gradient(
      350px circle at ${mouseX}px ${mouseY}px,
      rgba(20, 79, 190, 0.15), 
      transparent 80%
    )
  `;

    // No longer parallaxing text with drag, so this is unused in the new layout
    // const parallaxX = useTransform(dragXSpring, [-1000, 1000], [-150, 150]);

    useLayoutEffect(() => {
        const calculateConstraints = () => {
            if (containerRef.current && images.length > 0) {
                const containerWidth = containerRef.current.scrollWidth;
                const viewportWidth = containerRef.current.offsetWidth;
                // EXACT CoolGallery LOGIC:
                const maxDrag = containerWidth / 2 - viewportWidth / 2;
                setDragConstraints({ right: DRAG_BUFFER, left: -(maxDrag * 1.5) });
            }
        };
        calculateConstraints();
        window.addEventListener('resize', calculateConstraints);
        return () => window.removeEventListener('resize', calculateConstraints);
    }, [images]);

    const handlePrev = () => {
        if (containerRef.current) {
            const currentX = dragX.get();
            const newX = Math.min(currentX + containerRef.current.offsetWidth, dragConstraints.right);
            dragX.set(newX);
        }
    };

    const handleNext = () => {
        if (containerRef.current) {
            const currentX = dragX.get();
            const newX = Math.max(currentX - containerRef.current.offsetWidth, dragConstraints.left);
            dragX.set(newX);
        }
    };

    useEffect(() => {
        const unsubscribe = dragXSpring.on("change", (latest) => {
            setCanScrollPrev(latest < dragConstraints.right - 1);
            setCanScrollNext(latest > dragConstraints.left + 1);
        });
        return () => unsubscribe();
    }, [dragConstraints, dragXSpring]);

    if (loading) {
        return <FilmGallerySkeleton />;
    }

    return (
        <div
            onMouseMove={handleMouseMove}
            className="text-white font-sans min-h-screen overflow-x-hidden"
            style={{ backgroundImage: `url(${bg1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            {/* --- BACKGROUND EFFECT --- */}
            <motion.div
                className="pointer-events-none fixed inset-0 z-0 transition duration-300"
                style={{ background }}
            />

            {/* --- SECTION 1: HEADER --- */}
            <section className="relative h-screen flex flex-col items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center text-center px-4"
                >
                    <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 via-neutral-400 to-neutral-200 mb-6 tracking-tighter">
                        Film Scene Recreation
                        <span className="block text-3xl md:text-5xl text-neutral-600 mt-2">2.0</span>
                    </h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-lg md:text-2xl text-neutral-500 max-w-2xl font-light tracking-wide uppercase"
                    >
                        Get ready for iconic performance by the students of CUCEK for the film scene recreation 2.0
                    </motion.p>
                    <motion.a
                        href="https://forms.gle/fj3HHyp47o9TQsXj7"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{
                            scale: 1.1,
                            boxShadow: "0px 0px 30px rgba(255, 255, 255, 0.6)",
                            textShadow: "0px 0px 8px rgba(255, 255, 255, 0.8)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="font-light text-lg md:text-2xl uppercase tracking-wide text-white pointer-events-auto relative z-20 cursor-pointer mt-12 inline-block px-8 py-3 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm transition-colors duration-300 hover:bg-white/20"
                    >
                        Register Now
                    </motion.a>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-10 animate-bounce"
                >
                    <p className="text-neutral-500 text-sm tracking-widest uppercase">Scroll Down</p>
                    <div className="w-px h-12 bg-neutral-700 mx-auto mt-2"></div>
                </motion.div>
            </section>

            {/* --- SECTION 2: GALLERY --- */}
            <section className="relative h-screen w-full overflow-hidden">
                <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none opacity-5">
                    <p className="text-9xl font-black text-white">GALLERY</p>
                </div>
                <h2 className="text-center text-3xl md:text-4xl font-medium text-white mb-6">Works for Film Scene Recreation 1.0</h2>


                <motion.div
                    ref={containerRef}
                    drag="x"
                    dragConstraints={dragConstraints}
                    style={{ x: dragXSpring }}
                    className="relative z-10 h-full flex items-center gap-4 md:gap-8 px-12 cursor-grab active:cursor-grabbing"
                >
                    {images.map((img, idx) => (
                        <ImageCard
                            key={img.uniqueId}
                            image={img}
                            onClick={() => setSelectedImage(img)}
                            // Reset initial animation slightly so it plays when in view
                            initial={{ opacity: 0, y: 50, scale: 0.8 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: idx * 0.1, ease: "circOut" }}
                            className={idx % 2 === 0 ? 'mb-24' : 'mt-24'}
                        />
                    ))}
                </motion.div>

                <div className="absolute inset-0 z-20 flex items-center justify-between pointer-events-none px-4">
                    <button
                        onClick={handlePrev}
                        disabled={!canScrollPrev}
                        className="pointer-events-auto p-2 bg-neutral-800/50 text-white rounded-full transition-opacity duration-300 disabled:opacity-30 hover:bg-neutral-700/70"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={!canScrollNext}
                        className="pointer-events-auto p-2 bg-neutral-800/50 text-white rounded-full transition-opacity duration-300 disabled:opacity-30 hover:bg-neutral-700/70"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </section>

            <AnimatePresence>
                {selectedImage && (
                    <ExpandedImageView image={selectedImage} onClose={() => setSelectedImage(null)} />
                )}
            </AnimatePresence>
        </div>
    );
};

export default FilmRecreationPage;
