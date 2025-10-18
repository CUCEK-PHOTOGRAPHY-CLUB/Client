import React from 'react';

const Register = () => {
  return (
    <section id="register" className="py-20 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="font-creepster text-5xl md:text-7xl mb-8 text-white" style={{ textShadow: '0 0 15px rgba(255,100,80,0.7)' }}>
          Register for the Contest
        </h2>
        <p className="mt-2 text-lg text-gray-300">
          Ready to bring your nightmares to life? Click the button below to register your team for the Halloween CoZplay Contest!
        </p>
        <a
          href="https://forms.gle/2LoAfq7o2BM17pTY8"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 w-full md:w-auto inline-block bg-[var(--glow-orange)] text-white font-bold font-special-elite py-3 px-12 rounded-full text-xl uppercase tracking-widest transition-all duration-300 border-2 border-white/50 shadow-lg shadow-[var(--glow-orange)]/30 hover:bg-[var(--glow-yellow)] hover:shadow-2xl hover:shadow-[var(--glow-yellow)]/50 hover:scale-105"
        >
          Go to Registration Form
        </a>
      </div>
    </section>
  );
};

export default Register;
