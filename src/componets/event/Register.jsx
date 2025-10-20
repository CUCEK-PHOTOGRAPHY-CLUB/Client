import React from 'react';

const Register = () => {
  return (
    <section 
      id="register" 
      className="py-20 px-4 mt-48 relative bg-cover bg-center"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1477516561410-f0b5dd8319e4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1932')` }}
    >
      <div className="container mx-auto max-w-3xl text-center relative z-10">
        <h2 className="font-creepster text-5xl md:text-7xl mb-8 text-white" style={{ textShadow: '0 0 15px rgba(255,100,80,0.7)' }}>
          Register for the Contest
        </h2>
        <p className="mt-2 text-lg text-white font-medium" style={{ 
          textShadow: '2px 2px 4px rgba(0,0,0,0.9), -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
          WebkitTextStroke: '1px rgba(0,0,0,0.5)'
        }}>
          Ready to bring your nightmares to life? Click the button below to register your team for the Halloween CoZplay Contest!
        </p>
        <a
          href="https://forms.gle/2LoAfq7o2BM17pTY8"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-gray-900 to-black hover:from-red-900 hover:to-black text-white font-bold py-4 px-12 rounded-full text-xl md:text-2xl transition-all duration-500 ease-in-out transform hover:scale-110 hover:shadow-2xl border-4 border-red-600 shadow-lg"
          style={{ fontFamily: "'Creepster', cursive", textShadow: '2px 2px 4px rgba(0,0,0,0.9)', boxShadow: '0 0 30px rgba(220, 38, 38, 0.4)' }}
        >
          🎃 Register for the Contest 🎃
        </a>
      </div>
    </section>
  );
};

export default Register;
