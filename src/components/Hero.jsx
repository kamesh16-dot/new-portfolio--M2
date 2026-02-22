import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import CanvasLoader from './CanvasLoader';

const HeroElements = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#00f0ff" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#b026ff" />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[4, 0, -5]}>
          <icosahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial color="#00f0ff" wireframe />
        </mesh>
      </Float>

      <Float speed={3} rotationIntensity={2} floatIntensity={1.5}>
        <mesh position={[-5, 2, -10]}>
          <torusKnotGeometry args={[1, 0.3, 100, 16]} />
          <meshStandardMaterial color="#b026ff" roughness={0.1} metalness={0.8} />
        </mesh>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={3}>
        <mesh position={[0, -4, -8]}>
          <octahedronGeometry args={[1]} />
          <meshStandardMaterial color="#00ffff" wireframe />
        </mesh>
      </Float>
    </>
  );
};

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <Suspense fallback={<CanvasLoader />}>
            <HeroElements />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute inset-0 z-10 flex flex-col md:flex-row items-center justify-between pointer-events-none max-w-7xl mx-auto px-6 lg:px-8 pt-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center md:text-left md:w-1/2"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
            Hi, I'm <span className="text-gradient">Kamesh</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-medium mb-8">
            Full Stack Developer
          </p>
          <div className="pointer-events-auto flex items-center justify-center md:justify-start gap-4">
            <a href="#projects" className="px-8 py-3 rounded-full border border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black transition-all duration-300 font-bold shadow-[0_0_15px_rgba(0,240,255,0.5)] whitespace-nowrap">
              View Work
            </a>
            <a href="#contact" className="px-8 py-3 rounded-full border border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white transition-all duration-300 font-bold shadow-[0_0_15px_rgba(176,38,255,0.5)] whitespace-nowrap">
              Contact Me
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="hidden md:flex flex-col items-center justify-end h-full md:w-1/2 pointer-events-auto pt-20"
        >
          <div className="w-[300px] h-[400px] xl:w-[400px] xl:h-[500px] relative flex items-center justify-center mt-auto">
             <img src="/assets/kamesh.png" alt="Kamesh" className="w-full h-full object-contain object-bottom drop-shadow-[0_-20px_50px_rgba(176,38,255,0.3)] filter brightness-110 contrast-125 saturate-150" />
          </div>
        </motion.div>
      </div>
      
    </section>
  );
};

export default Hero;
