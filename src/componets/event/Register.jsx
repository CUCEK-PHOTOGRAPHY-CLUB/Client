import React from 'react';

const Register = () => {
  return (
    <section 
      id="register" 
      className="py-20 px-4 mt-48 relative bg-cover bg-center"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1481018085669-2bc6e4f00eed?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070')` }}
    >
      <div className="container mx-auto max-w-3xl text-center relative z-10">
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
          className="mt-8 w-full sm:w-auto max-w-sm sm:max-w-none mx-auto sm:mx-0 block sm:inline-block bg-orange-600 text-white font-bold font-special-elite py-4 sm:py-3 px-8 sm:px-12 rounded-full text-lg sm:text-xl uppercase tracking-wide sm:tracking-widest transition-all duration-300 border-2 border-white/50 shadow-lg shadow-orange-600/30 hover:bg-yellow-500 hover:shadow-2xl hover:shadow-yellow-500/50 hover:scale-105 active:scale-95"
        >
          Go to Registration Form
        </a>
      </div>
    </section>
  );
};

export default Register;
