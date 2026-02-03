import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, animate } from 'framer-motion';
import { FiCamera, FiUsers, FiAward } from 'react-icons/fi';

// The AnimatedStat component remains the same, it's working perfectly.
const AnimatedStat = ({ icon, label, endValue }: { icon: any; label: string; endValue: number }) => {
  const nodeRef = useRef(null);

  useEffect(() => {
    const node = nodeRef.current as HTMLSpanElement | null;
    if (node) {
      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          const controls = animate(0, endValue, {
            duration: 2,
            onUpdate(value) {
              node.textContent = Math.round(value).toLocaleString();
            },
          });
          observer.unobserve(node); // Animate only once
          return () => controls.stop();
        }
      }, { threshold: 0.5 });

      observer.observe(node);
      return () => observer.disconnect();
    }
  }, [endValue]);

  return (
    <div className="text-center">
      {icon}
      <p className="text-4xl md:text-5xl font-bold mt-2">
        <span ref={nodeRef}>0</span>+
      </p>
      <p className="text-sm md:text-base text-gray-400">{label}</p>
    </div>
  );
};

const AboutSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  return (
    <section ref={sectionRef} className="relative bg-black text-white py-20 lg:py-32 overflow-hidden">

      <motion.div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit-crop&q=80&w=2070')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          y,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* The gap-16 here provides more space on larger screens for a cleaner look */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-16 items-center">

          <motion.div
            className="md:col-span-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 lg:p-12 shadow-2xl z-10"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              CUCEK Photography Club
            </h1>

            <p className="mt-6 text-lg text-gray-300 leading-relaxed">
              We are the official photography club of Cochin University College of Engineering Kuttanad.
              A vibrant community where students document college events, campus life, and seamless creativity through the art of capturing moments.
            </p>
            <p className="mt-4 text-lg text-gray-300 leading-relaxed">
              From workshops and photo walks to competitions and exhibitions, we provide a platform for every student to hone their skills and showcase their unique perspective.
            </p>
          </motion.div>

          {/* --- THE FIX IS HERE --- */}
          {/* Removed the negative margin class `md:-ml-12` to prevent the overlap. */}
          <motion.div
            className="md:col-span-2 h-80 md:h-full rounded-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            <img
              src="https://cdn.pixabay.com/photo/2015/02/05/09/11/kamaera-624740_1280.jpg"
              alt="Group of photographers"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* The rest of the component is unchanged... */}
        <motion.div
          className="mt-20 lg:mt-28 grid grid-cols-3 gap-8 max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } }
          }}
        >
          {/* ...Stat items... */}
        </motion.div>

        <div className="text-center mt-20 lg:mt-28">
          {/* ...CTA... */}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;