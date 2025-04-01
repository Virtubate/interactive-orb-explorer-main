import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const WaveAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    camera.position.z = 15;
    camera.position.y = 5;
    camera.rotation.x = -Math.PI / 6;

    // Create particles for the wave
    const particleCount = 100000;
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    
    // Create a grid of particles
    const gridSize = Math.sqrt(particleCount);
    const spacing = 0.1;
    
    for (let i = 0; i < particleCount; i++) {
      const x = (i % gridSize - gridSize / 2) * spacing;
      const z = (Math.floor(i / gridSize) - gridSize / 2) * spacing;
      const index = i * 3;
      
      positions[index] = x;
      positions[index + 1] = 0;
      positions[index + 2] = z;
      
      // Store original positions for animation
      originalPositions[index] = x;
      originalPositions[index + 1] = 0;
      originalPositions[index + 2] = z;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Create glow texture
    const createGlowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      if (!ctx) return '';

      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);

      return canvas.toDataURL();
    };

    const material = new THREE.PointsMaterial({
      size: 0.05,
      map: new THREE.TextureLoader().load(createGlowTexture()),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0x4169E1,
      opacity: 0.6
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Animation
    let frame = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      frame += 0.015;

      const positions = geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        const index = i * 3;
        const x = originalPositions[index];
        const z = originalPositions[index + 2];
        
        // Create multiple wave patterns
        const wave1 = Math.sin(x * 0.5 + frame) * Math.cos(z * 0.5 + frame) * 0.5;
        const wave2 = Math.sin(x * 0.3 - frame * 0.7) * Math.cos(z * 0.3 + frame * 0.7) * 0.3;
        const wave3 = Math.sin(Math.sqrt(x * x + z * z) * 0.5 - frame) * 0.2;
        
        positions[index + 1] = wave1 + wave2 + wave3;
      }

      geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        bottom: 0,
        zIndex: 5,
        pointerEvents: 'none'
      }}
    />
  );
};

export default WaveAnimation; 