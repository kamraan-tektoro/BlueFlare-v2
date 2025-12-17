import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Handshake, Headphones, Clock } from 'lucide-react';
import Navbar from './Navbar';
import FooterCTA from './FooterCTA';
import ContactForm from './ContactForm';

const CONTACT_TOPICS = [
  {
    icon: MessageSquare,
    title: 'Project Inquiries',
    description: 'Discuss new energy infrastructure projects and custom solutions.',
  },
  {
    icon: Handshake,
    title: 'Partnerships',
    description: 'Explore strategic partnerships and collaboration opportunities.',
  },
  {
    icon: Headphones,
    title: 'Support & Operations',
    description: 'Get help with existing deployments and technical support.',
  },
];

const ContactPage: React.FC = () => {
  return (
    <div className="bg-brand-dark min-h-screen text-white font-sans selection:bg-brand-blue selection:text-white overflow-x-hidden">
      <Navbar />

      <main className="pt-28">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 md:py-24">
          {/* Background Gradient */}
          <div className="pointer-events-none absolute inset-x-0 -top-20 flex justify-center">
            <div className="w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-brand-blue/10 rounded-full blur-[100px]" />
          </div>

          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            {/* Header */}
            <div className="max-w-3xl mb-16">
              <motion.p
                className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-brand-blue/90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Contact
              </motion.p>
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Let's Start a{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-glow">
                  Conversation
                </span>
              </motion.h1>
              <motion.p
                className="text-slate-400 text-lg max-w-2xl leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Tell us what you're building. We'll respond quickly and route you to the right team.
              </motion.p>
            </div>

            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
              {/* Left Column - Info Card */}
              <motion.div
                className="lg:col-span-2 space-y-8"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="bg-brand-navy/20 backdrop-blur-sm border border-white/5 rounded-2xl p-6 md:p-8 space-y-6">
                  <h2 className="text-xl font-bold text-white">How can we help?</h2>

                  <div className="space-y-5">
                    {CONTACT_TOPICS.map((topic, index) => (
                      <div key={topic.title} className="flex gap-4 items-start">
                        <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-brand-navy border border-white/10 flex items-center justify-center text-brand-glow">
                          <topic.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold mb-1">{topic.title}</h3>
                          <p className="text-slate-400 text-sm leading-relaxed">
                            {topic.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Response Time Note */}
                <div className="flex items-center gap-3 p-4 bg-brand-blue/5 border border-brand-blue/20 rounded-xl">
                  <Clock className="w-5 h-5 text-brand-glow flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-300">
                      <span className="font-semibold text-white">Typical response time:</span>{' '}
                      Within 24-48 business hours
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Form Card */}
              <div className="lg:col-span-3">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterCTA showMainCTA={false} />
    </div>
  );
};

export default ContactPage;
