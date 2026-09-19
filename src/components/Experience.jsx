import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const experienceData = [
  {
    title: 'Full Stack Engineer (Part-Time)',
    company: 'PSD Digitise LLP',
    date: 'Feb 2026 – Present',
    location: 'Tamil Nadu',
    description: [
      'Develop and maintain full-stack web applications using React.js, Tailwind CSS, Bootstrap, HTML, and CSS.',
      'Build and consume REST APIs, working across the data layer, debugging, and day-to-day development workflows.',
      'Collaborate with the development team to implement real-world application features from requirements to implementation.',
      'Contributed to 3–5 production-facing features and UI components used by end users.'
    ],
    color: '#00f0ff'
  },
  {
    title: 'University Website — Project',
    company: 'Dhanalakshmi Srinivasan University',
    date: '2024',
    description: [
      'Developed a responsive university website using React.js, HTML, CSS, and Bootstrap.',
      'Created reusable React components and structured pages for institutional information.',
      'Implemented responsive UI/UX for desktop and mobile devices.',
      'Published the project with source code available on GitHub.'
    ],
    color: '#b026ff'
  },
  {
    title: 'ERP Exam Cell — Project',
    company: 'Personal / Academic Project',
    date: '2024',
    description: [
      'Built an examination-focused ERP interface with student and admin-oriented workflows.',
      'Developed responsive pages using React.js, HTML, and CSS.',
      'Implemented reusable UI components and structured application pages.',
      'Deployed the project on Netlify.'
    ],
    color: '#00ffff'
  }
];

const ExperienceCard = ({ experience, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`relative flex items-center justify-between md:justify-normal w-full mb-16 ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
    >
      {/* Connector line for desktop */}
      <div className="hidden md:block absolute left-1/2 w-0.5 h-full bg-gray-800 -translate-x-1/2 -z-10" />

      {/* Content Card */}
      <div className="w-full md:w-5/12 glassmorphism p-6 flex flex-col rounded-2xl border-t-4" style={{ borderColor: experience.color }}>
        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start mb-2 gap-2">
          <h3 className="text-xl md:text-2xl font-bold text-white">{experience.title}</h3>
          <span className="text-sm font-medium text-gray-400 whitespace-nowrap xl:mt-1">{experience.date}</span>
        </div>
        
        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center mb-6 gap-2">
          <span className="text-md md:text-lg font-semibold" style={{ color: experience.color }}>{experience.company}</span>
          {experience.location && (
            <span className="text-sm text-gray-400 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
              {experience.location}
            </span>
          )}
        </div>
        
        <ul className="space-y-3">
          {experience.description.map((desc, i) => (
            <li key={i} className="text-gray-300 text-sm flex items-start leading-relaxed">
              <span className="mr-3 mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: experience.color }}></span>
              <span>{desc}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Node / Marker */}
      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-4 border-dark-bg items-center justify-center z-10" style={{ backgroundColor: experience.color }}>
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-full h-full rounded-full absolute"
          style={{ backgroundColor: experience.color, opacity: 0.5 }}
        />
        <div className="w-3 h-3 bg-white rounded-full z-20" />
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <section id="experience" className="relative w-full min-h-screen py-20 bg-dark-bg overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-neon-purple uppercase tracking-wider text-sm font-bold mb-2">My Journey</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">Work Experience.</h2>
        </motion.div>

        <div className="relative flex flex-col items-center">
          {/* Main animated vertical line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 bg-gray-800 md:-translate-x-1/2 overflow-hidden rounded-full">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-neon-blue via-neon-purple to-neon-cyan origin-top"
              style={{ height: "100%", scaleY: pathLength }}
            />
          </div>

          <div className="flex flex-col w-full pl-12 md:pl-0 mt-8">
            {experienceData.map((exp, index) => (
              <ExperienceCard key={index} experience={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
