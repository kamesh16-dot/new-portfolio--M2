import React, { Suspense, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import CanvasLoader from './CanvasLoader';

const skillsData = [
  { name: 'React', level: 90, color: '#00f0ff' },
  { name: 'Node.js', level: 85, color: '#b026ff' },
  { name: 'Python', level: 80, color: '#00ffff' },
  { name: 'Java', level: 75, color: '#ff0055' },
  { name: 'JavaScript', level: 95, color: '#f7df1e' },
  { name: 'HTML/CSS', level: 90, color: '#e34f26' },
  { name: 'Three.js', level: 70, color: '#ffffff' },
];

const OrbitingIcons = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  const icons = useMemo(() => {
    const geometries = [
      new THREE.IcosahedronGeometry(1),
      new THREE.OctahedronGeometry(1),
      new THREE.TetrahedronGeometry(1),
      new THREE.TorusGeometry(0.8, 0.3, 16, 32),
    ];
    
    return skillsData.map((skill, i) => {
      const angle = (i / skillsData.length) * Math.PI * 2;
      const radius = 6 + Math.random() * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 4;
      
      const geometry = geometries[i % geometries.length];
      return { position: [x, y, z], color: skill.color, geometry };
    });
  }, []);

  return (
    <group ref={groupRef}>
      {icons.map((item, index) => (
        <Float key={index} speed={2} rotationIntensity={2} floatIntensity={2}>
          <mesh position={item.position} geometry={item.geometry}>
            <meshStandardMaterial color={item.color} wireframe />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

const SkillCard = ({ skill, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateY: -90 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, rotateY: 10, rotateX: -10 }}
      style={{ perspective: 1000 }}
      className="glassmorphism p-6 rounded-2xl flex flex-col items-center justify-center gap-4 cursor-pointer relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300"
           style={{ backgroundImage: `linear-gradient(to bottom right, ${skill.color}, transparent)` }} />
      <h3 className="text-2xl font-bold text-white z-10">{skill.name}</h3>
      <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden z-10">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
          className="h-full rounded-full"
          style={{ backgroundColor: skill.color }}
        />
      </div>
      <p className="text-sm text-gray-400 z-10">{skill.level}% Proficiency</p>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="relative w-full min-h-screen mx-auto py-20 overflow-hidden bg-dark-bg">
      <div className="absolute inset-0 z-0 hidden md:block opacity-50">
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
          <Suspense fallback={<CanvasLoader />}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
            <OrbitingIcons />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Suspense>
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 mt-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-neon-purple uppercase tracking-wider text-sm font-bold mb-2">What I Know</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">Technical Skills.</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
