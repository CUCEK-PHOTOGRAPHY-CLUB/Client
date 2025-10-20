import React from 'react';

const Contact = () => (
    <section 
      id="contact" 
      className="py-20 px-4 text-center relative bg-cover bg-center"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1487174244970-cd18784bb4a4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2073')` }}
    >
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="container mx-auto relative z-10">
        <h2 className="text-center font-creepster text-5xl md:text-7xl mb-4 text-red-600" style={{ textShadow: '4px 4px 8px rgba(0,0,0,1), 0 0 15px #dc2626, 0 0 30px #dc2626' }}>Connect With Us</h2>
        <p className="max-w-2xl mx-auto mt-4 text-md md:text-lg text-gray-100" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9)' }}>Join our community channels to stay updated, ask questions, and connect with fellow creators. Over and out.</p>
        <div className="flex justify-center items-center space-x-8 mt-8">
          <a href="https://www.instagram.com/cucek_photography_club" target="_blank" rel="noopener noreferrer" className="text-center group"><div className="w-24 h-24 bg-gray-800 border-2 border-red-600/50 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-red-600 group-hover:shadow-lg group-hover:shadow-red-600/40 group-hover:scale-105"><svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 1H10C6.13401 1 3 4.13401 3 8V16C3 19.866 6.13401 23 10 23H14C17.866 23 21 19.866 21 16V8C21 4.13401 17.866 1 14 1Z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.5 7.5V7.501"></path></svg></div><span className="mt-2 block font-special-elite uppercase tracking-widest">Instagram</span></a>
          <a href="https://chat.whatsapp.com/C2vcFUpFfJ475A1GlI8vlC" target="_blank" rel="noopener noreferrer" className="text-center group"><div className="w-24 h-24 bg-gray-800 border-2 border-red-600/50 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-red-600 group-hover:shadow-lg group-hover:shadow-red-600/40 group-hover:scale-105"><svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.424 10.316C16.348 15.368 12.352 16.292 11.232 16.292C10.74 16.292 10.032 16.236 9.24 15.936L8 17L8.988 15.82C7.38 14.968 6.5 13.528 6.5 11.972C6.5 8.444 9.132 6 12.352 6C14.544 6 16.488 7.24 17.424 10.316Z"></path></svg></div><span className="mt-2 block font-special-elite uppercase tracking-widest">WhatsApp</span></a>
        </div>
      </div>
    </section>
);

export default Contact;
