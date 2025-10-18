import React from 'react';

const Contact = () => (
    <section id="contact" className="py-20 px-4 text-center">
      <div className="container mx-auto">
        <h2 className="text-center font-creepster text-5xl md:text-7xl mb-4 text-[var(--glow-orange)]" style={{ textShadow: '0 0 10px var(--glow-orange)' }}>Connect With Us</h2>
        <p className="max-w-2xl mx-auto mt-4 text-md md:text-lg text-gray-200">Join our community channels to stay updated, ask questions, and connect with fellow creators. Over and out.</p>
        <div className="flex justify-center items-center space-x-8 mt-8">
          <a href="https://www.instagram.com/cucek_photography_club" target="_blank" rel="noopener noreferrer" className="text-center group"><div className="w-24 h-24 bg-gray-800 border-2 border-[var(--glow-orange)]/50 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-[var(--glow-orange)] group-hover:shadow-lg group-hover:shadow-[var(--glow-orange)]/40 group-hover:scale-105"><svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 1H10C6.13401 1 3 4.13401 3 8V16C3 19.866 6.13401 23 10 23H14C17.866 23 21 19.866 21 16V8C21 4.13401 17.866 1 14 1Z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.5 7.5V7.501"></path></svg></div><span className="mt-2 block font-special-elite uppercase tracking-widest">Instagram</span></a>
          <a href="https://chat.whatsapp.com/C2vcFUpFfJ475A1GlI8vlC" target="_blank" rel="noopener noreferrer" className="text-center group"><div className="w-24 h-24 bg-gray-800 border-2 border-[var(--glow-orange)]/50 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-[var(--glow-orange)] group-hover:shadow-lg group-hover:shadow-[var(--glow-orange)]/40 group-hover:scale-105"><svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.424 10.316C16.348 15.368 12.352 16.292 11.232 16.292C10.74 16.292 10.032 16.236 9.24 15.936L8 17L8.988 15.82C7.38 14.968 6.5 13.528 6.5 11.972C6.5 8.444 9.132 6 12.352 6C14.544 6 16.488 7.24 17.424 10.316Z"></path></svg></div><span className="mt-2 block font-special-elite uppercase tracking-widest">WhatsApp</span></a>
        </div>
      </div>
    </section>
);

export default Contact;
