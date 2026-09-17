import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const experienceData = [
  {
    title: 'Senior Full Stack Developer',
    company: 'Tech Innovators Inc.',
    date: '2022 - Present',
    description: 'Led a team of 5 developers in re-architecting the core product platform. Implemented microservices using Node.js and improved frontend performance by 40% with React and Vite.',
    color: '#00f0ff'
  },
  {
    title: 'Frontend Developer',
    company: 'Creative Web Agency',
    date: '2020 - 2022',
    description: 'Built award-winning interactive websites with rich 3D animations using Three.js and GSAP. Collaborated closely with UI/UX designers to bring stunning concepts to life.',
    color: '#b026ff'
  },
  {
    title: 'Software Engineer Intern',
    company: 'Global Systems LLC',
    date: '2019 - 2020',
    description: 'Developed scalable REST APIs using Python and Django. Integrated automated testing pipelines that reduced bugs in production by 25%.',
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
        <h3 className="text-2xl font-bold text-white mb-1">{experience.title}</h3>
        <span className="text-lg font-semibold mb-4" style={{ color: experience.color }}>{experience.company}</span>
        <p className="text-gray-400 text-sm mb-4">{experience.description}</p>
        <span className="text-sm font-medium text-gray-500">{experience.date}</span>
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
