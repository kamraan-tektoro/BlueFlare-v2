import React from 'react';
import { motion, useInView } from 'framer-motion';
import Section from './ui/Section';
import { PROJECTS } from '../constants';
import { ProjectItem, Stat } from '../types';

const CountUp: React.FC<{ value: string; suffix: string }> = ({ value, suffix }) => {
  // Parsing value to number for logic (simplified for string representation in demo)
  // In a real app, use a library like 'react-countup' or custom hook
  // Here we just animate opacity for simplicity as converting formatted strings is complex
  return (
    <span className="text-2xl md:text-3xl font-bold text-white">
      {value}<span className="text-sm text-brand-light ml-1">{suffix}</span>
    </span>
  );
};

const ProjectCard: React.FC<{ project: ProjectItem; index: number }> = ({ project, index }) => {
  return (
    <motion.div
      className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer"
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
    >
      <img 
        src={project.image} 
        alt={project.title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
      
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
            <span className="inline-block px-3 py-1 bg-brand-blue/90 text-white text-xs font-bold rounded mb-3">
            {project.category}
            </span>
            <h3 className="text-2xl font-bold text-white mb-1">{project.title}</h3>
            <p className="text-slate-300 text-sm mb-6">{project.location}</p>
            
            <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-4">
            {project.stats.map((stat, i) => (
                <div key={i}>
                <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">{stat.label}</div>
                <CountUp value={stat.value} suffix={stat.suffix} />
                </div>
            ))}
            </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  return (
    <Section id="projects" className="bg-brand-dark">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Projects</h2>
          <p className="text-slate-400">Powering critical infrastructure around the globe.</p>
        </div>
        <button className="hidden md:block text-brand-light hover:text-white font-medium transition-colors">
          View All Case Studies &rarr;
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((project, idx) => (
          <ProjectCard key={idx} project={project} index={idx} />
        ))}
      </div>
      
      <div className="mt-8 md:hidden text-center">
         <button className="text-brand-light hover:text-white font-medium transition-colors">
          View All Case Studies &rarr;
        </button>
      </div>
    </Section>
  );
};

export default Projects;