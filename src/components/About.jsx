import React, { Suspense, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Text3D, Center, MeshDistortMaterial } from '@react-three/drei';
import CanvasLoader from './CanvasLoader';

const AvatarShape = () => {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh>
        <sphereGeometry args={[1.5, 64, 64]} />
        <MeshDistortMaterial
          color="#b026ff"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

const FloatingBadge = ({ position, text, color }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2} position={position}>
      <mesh ref={meshRef}>
        <boxGeometry args={[1.8, 0.6, 0.1]} />
        <meshStandardMaterial color={color} opacity={0.8} transparent />
        {/* We would use Text3D here ideally, but for simplicity we can use standard meshes.
            If a font JSON is provided we could use Drei's Text3D */}
      </mesh>
    </Float>
  );
};

const About = () => {
  return (
    <section id="about" className="relative w-full min-h-screen mx-auto py-20 overflow-hidden bg-dark-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-16 flex flex-col md:flex-row items-center gap-10 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex-1"
        >
          <p className="text-neon-cyan uppercase tracking-wider text-sm font-bold mb-2">Introduction</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Overview.</h2>
          <p className="mt-4 text-gray-300 text-[17px] max-w-3xl leading-[30px]">
            I'm a skilled full-stack developer with experience in React, Python, Django, PostgreSQL, and Java. 
            I have a strong foundation in modern web technologies including HTML, CSS, and JavaScript. 
            I bring passion to creating dynamic, user-friendly, and highly responsive web applications. Let's work together to bring your ideas to life!
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            {['React', 'Python', 'Django', 'PostgreSQL'].map((skill) => (
              <div key={skill} className="glassmorphism px-6 py-2 rounded-full border border-neon-purple text-neon-purple font-semibold tracking-wider">
                {skill}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="flex-1 h-[500px] w-full relative">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <Suspense fallback={<CanvasLoader />}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} color="#00ffff" />
              <AvatarShape />
              <FloatingBadge position={[-2.5, 1.5, 0]} text="React" color="#00f0ff" />
              <FloatingBadge position={[2.5, -1.5, 0]} text="Django" color="#b026ff" />
              <FloatingBadge position={[0, 2.5, -2]} text="PostgreSQL" color="#00ffff" />
              <OrbitControls enableZoom={false} enablePan={false} autoRotate />
            </Suspense>
          </Canvas>
        </div>

      </div>
    </section>
  );
};

export default About;
