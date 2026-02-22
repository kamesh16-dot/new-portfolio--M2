import React, { Suspense, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { Linkedin, Github, Mail } from 'lucide-react';
import CanvasLoader from './CanvasLoader';

const AbstractEarth = () => {
  const sphereRef = useRef();

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      sphereRef.current.rotation.x = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <mesh ref={sphereRef} scale={2}>
      <icosahedronGeometry args={[1, 2]} />
      <meshStandardMaterial
        color="#00f0ff"
        wireframe={true}
        roughness={0.2}
        metalness={0.8}
      />
      <Sphere args={[0.95, 32, 32]}>
        <MeshDistortMaterial
          color="#050816"
          attach="material"
          distort={0.2}
          speed={1.5}
        />
      </Sphere>
    </mesh>
  );
};

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate sending email
    setTimeout(() => {
      setLoading(false);
      alert('Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <section id="contact" className="relative w-full min-h-screen py-20 bg-dark-bg overflow-hidden flex flex-col items-center justify-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full z-10 flex flex-col-reverse lg:flex-row items-center gap-12">
        
        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex-1 glassmorphism w-full p-8 rounded-2xl border-2 border-[rgba(0,240,255,0.3)] shadow-[0_0_20px_rgba(0,240,255,0.1)] hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-shadow duration-300"
        >
          <p className="text-neon-cyan uppercase tracking-wider text-sm font-bold mb-2">Get in touch</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8">Contact.</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <label className="flex flex-col">
              <span className="text-white font-medium mb-3">Your Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your good name?"
                className="bg-[rgba(255,255,255,0.05)] py-4 px-6 text-white rounded-lg outline-none border-none font-medium focus:ring-2 focus:ring-neon-blue transition-all"
                required
              />
            </label>
            <label className="flex flex-col">
              <span className="text-white font-medium mb-3">Your Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your web address?"
                className="bg-[rgba(255,255,255,0.05)] py-4 px-6 text-white rounded-lg outline-none border-none font-medium focus:ring-2 focus:ring-neon-blue transition-all"
                required
              />
            </label>
            <label className="flex flex-col">
              <span className="text-white font-medium mb-3">Your Message</span>
              <textarea
                rows={5}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What do you want to say?"
                className="bg-[rgba(255,255,255,0.05)] py-4 px-6 text-white rounded-lg outline-none border-none font-medium focus:ring-2 focus:ring-neon-blue transition-all resize-none"
                required
              />
            </label>

            <button
              type="submit"
              className="bg-[rgba(255,255,255,0.05)] py-4 px-8 rounded-xl outline-none w-fit text-white font-bold border border-neon-blue shadow-[0_0_10px_rgba(0,240,255,0.3)] hover:bg-neon-blue hover:text-black transition-all duration-300"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          {/* Social Links */}
          <div className="mt-8 pt-8 border-t border-[rgba(255,255,255,0.1)] flex justify-center gap-6">
            <motion.a 
              href="https://github.com/kamesh16-dot" 
              target="_blank" 
              rel="noreferrer"
              whileHover={{ y: -5, scale: 1.1, textShadow: "0 0 8px rgb(255,255,255)" }}
              className="p-3 rounded-full bg-[rgba(255,255,255,0.05)] text-gray-300 hover:text-white hover:border hover:border-white transition-all"
            >
              <Github size={24} />
            </motion.a>
            <motion.a 
              href="https://www.linkedin.com/in/kameshc1617" 
              target="_blank" 
              rel="noreferrer"
              whileHover={{ y: -5, scale: 1.1, textShadow: "0 0 8px rgb(0,240,255)" }}
              className="p-3 rounded-full bg-[rgba(255,255,255,0.05)] text-gray-300 hover:text-neon-blue hover:border hover:border-neon-blue transition-all"
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a 
              href="mailto:kameshc33@gmail.com" 
              whileHover={{ y: -5, scale: 1.1, textShadow: "0 0 8px rgb(176,38,255)" }}
              className="p-3 rounded-full bg-[rgba(255,255,255,0.05)] text-gray-300 hover:text-neon-purple hover:border hover:border-neon-purple transition-all"
            >
              <Mail size={24} />
            </motion.a>
          </div>
        </motion.div>

        {/* 3D Canvas Container */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex-1 h-[400px] md:h-[600px] w-full"
        >
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <Suspense fallback={<CanvasLoader />}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} color="#b026ff" />
              <AbstractEarth />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
            </Suspense>
          </Canvas>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;
