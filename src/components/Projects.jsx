import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const projectsData = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with dynamic product routing, payment gateway integration, and a comprehensive admin dashboard.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    github: 'https://github.com/kamesh16-dot',
    demo: '#',
    color: '#00f0ff'
  },
  {
    title: 'DSU Website',
    description: 'A modern, responsive website developed for DSU, featuring an intuitive user interface and smooth animations.',
    tags: ['React', 'Tailwind', 'JavaScript'],
    github: 'https://github.com/kamesh16-dot/dsu-website',
    demo: '#',
    color: '#b026ff'
  },
  {
    title: 'AI Chat Assistant',
    description: 'Real-time chat application powered by an LLM backend, featuring streaming responses and document analysis capabilities.',
    tags: ['Next.js', 'Python', 'FastAPI', 'OpenAI'],
    github: 'https://github.com/kamesh16-dot',
    demo: '#',
    color: '#00ffff'
  }
];

const TiltCard = ({ project, index }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['17.5deg', '-17.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-17.5deg', '17.5deg']);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full rounded-2xl p-1 shrink-0"
    >
      <div 
        className="absolute inset-0 rounded-2xl opacity-70"
        style={{
          background: `linear-gradient(135deg, ${project.color}, transparent 80%)`,
          filter: 'blur(10px)',
          transform: "translateZ(-10px)",
        }}
      />
      
      <div 
        className="glassmorphism rounded-2xl p-6 h-full flex flex-col justify-between"
        style={{ transform: "translateZ(30px)" }}
      >
        <div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-white transition-colors hover:text-neon-cyan">{project.title}</h3>
            <div className="flex gap-2">
              <a href={project.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors hidden sm:block">
                <Github size={20} />
              </a>
              <a href={project.demo} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors hidden sm:block">
                <ExternalLink size={20} />
              </a>
            </div>
          </div>
          
          <p className="text-gray-400 mb-6 text-sm md:text-base leading-relaxed">
            {project.description}
          </p>
        </div>

        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, i) => (
              <span key={i} className="text-xs font-medium px-2 py-1 rounded-md bg-[rgba(255,255,255,0.1)] text-white">
                #{tag}
              </span>
            ))}
          </div>
          
          <div className="flex sm:hidden gap-4 mt-4 text-neon-blue">
             <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm font-semibold hover:text-white">
                <Github size={16} /> GitHub
              </a>
              <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm font-semibold hover:text-white">
                <ExternalLink size={16} /> Live Demo
              </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="relative w-full min-h-screen py-20 bg-dark-bg overflow-hidden flex flex-col items-center justify-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full z-10">
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-neon-cyan uppercase tracking-wider text-sm font-bold mb-2">My Work</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">Featured Projects.</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {projectsData.map((project, index) => (
            <TiltCard key={project.title} project={project} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
