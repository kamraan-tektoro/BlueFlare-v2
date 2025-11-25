import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyBlueFlare from './components/WhyBlueFlare';
import GlobalReach from './components/GlobalReach';
import Philosophy from './components/Philosophy';
import Projects from './components/Projects';
import FooterCTA from './components/FooterCTA';

function App() {
  return (
    <div className="bg-brand-dark min-h-screen text-white font-sans selection:bg-brand-blue selection:text-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyBlueFlare />
        <GlobalReach />
        <Philosophy />
        <Projects />
      </main>
      <FooterCTA />
    </div>
  );
}

export default App;