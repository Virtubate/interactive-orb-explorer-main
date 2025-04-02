import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const ParticleGlobe: React.FC = () => {
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
    camera.position.z = 1.68; // Moved camera back for 5% zoom decrease

    // Define radii
    const outerRadius = 1;
    
    // Create glow texture
    const createGlowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      if (!ctx) return '';

      ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      ctx.fillRect(8, 8, 16, 16);
      ctx.shadowColor = 'rgba(0, 255, 255, 0.8)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.fillRect(8, 8, 16, 16);

      return canvas.toDataURL().split(',')[1];
    };

    // 1. Surface Dots (Main Globe Structure)
    const surfaceParticles: number[] = [];
    const segments = 360;
    const rings = 360;

    for(let lat = 0; lat <= rings; lat++) {
      const theta = (lat * Math.PI) / rings;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);

      for(let lon = 0; lon <= segments; lon++) {
        const phi = (lon * 2 * Math.PI) / segments;
        const x = outerRadius * Math.cos(phi) * sinTheta;
        const y = outerRadius * cosTheta;
        const z = outerRadius * Math.sin(phi) * sinTheta;
        surfaceParticles.push(x, y, z);
      }
    }

    const surfaceGeometry = new THREE.BufferGeometry();
    surfaceGeometry.setAttribute('position', new THREE.Float32BufferAttribute(surfaceParticles, 3));
    const surfaceMaterial = new THREE.PointsMaterial({
      size: 0.007,
      map: new THREE.TextureLoader().load('data:image/png;base64,' + createGlowTexture()),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: new THREE.Color(0x4b0082),
      opacity: 1
    });
    const surfaceSystem = new THREE.Points(surfaceGeometry, surfaceMaterial);

    // 2. Inner Noise Particles
    const innerNoiseParticles: number[] = [];
    const innerNoiseCount = 24750;
    for(let i = 0; i < innerNoiseCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 2;
      const r = outerRadius * (0.3 + Math.random() * 0.5); // 30-80% of radius
      const x = r * Math.cos(phi) * Math.sin(theta);
      const y = r * Math.cos(theta);
      const z = r * Math.sin(phi) * Math.sin(theta);
      innerNoiseParticles.push(x, y, z);
    }

    const innerNoiseGeometry = new THREE.BufferGeometry();
    innerNoiseGeometry.setAttribute('position', new THREE.Float32BufferAttribute(innerNoiseParticles, 3));
    const innerNoiseMaterial = new THREE.PointsMaterial({
      size: 0.005,
      map: new THREE.TextureLoader().load('data:image/png;base64,' + createGlowTexture()),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: new THREE.Color(0x4169E1), // Changed to royal blue
      opacity: 0.6
    });
    const innerNoiseSystem = new THREE.Points(innerNoiseGeometry, innerNoiseMaterial);

    // 3. Outer Noise Particles
    const outerNoiseParticles: number[] = [];
    const outerNoiseCount = 8000; // Increased from 2000 to 8000
    for(let i = 0; i < outerNoiseCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 2;
      const r = outerRadius * (1.05 + Math.random() * 0.1); // 105-115% of radius
      const x = r * Math.cos(phi) * Math.sin(theta);
      const y = r * Math.cos(theta);
      const z = r * Math.sin(phi) * Math.sin(theta);
      outerNoiseParticles.push(x, y, z);
    }

    const outerNoiseGeometry = new THREE.BufferGeometry();
    outerNoiseGeometry.setAttribute('position', new THREE.Float32BufferAttribute(outerNoiseParticles, 3));
    const outerNoiseMaterial = new THREE.PointsMaterial({
      size: 0.005, // Slightly reduced size to accommodate more particles
      map: new THREE.TextureLoader().load('data:image/png;base64,' + createGlowTexture()),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: new THREE.Color(0x4169E1), // Changed to royal blue
      opacity: 0.35 // Slightly reduced opacity to prevent oversaturation
    });
    const outerNoiseSystem = new THREE.Points(outerNoiseGeometry, outerNoiseMaterial);

    // Outer Wrapper Layer
    const wrapperParticles: number[] = [];
    const wrapperCount = 3000;
    for(let i = 0; i < wrapperCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 2;
      const r = outerRadius * (1.15 + Math.random() * 0.1); // 115-125% of radius
      const x = r * Math.cos(phi) * Math.sin(theta);
      const y = r * Math.cos(theta);
      const z = r * Math.sin(phi) * Math.sin(theta);
      wrapperParticles.push(x, y, z);
    }

    const wrapperGeometry = new THREE.BufferGeometry();
    wrapperGeometry.setAttribute('position', new THREE.Float32BufferAttribute(wrapperParticles, 3));
    const wrapperMaterial = new THREE.PointsMaterial({
      size: 0.008,
      map: new THREE.TextureLoader().load('data:image/png;base64,' + createGlowTexture()),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: new THREE.Color(0x4169E1),
      opacity: 0.3
    });
    const wrapperSystem = new THREE.Points(wrapperGeometry, wrapperMaterial);

    // Additional Inner-Outer Noise Layer (90-97% of radius)
    const innerOuterNoiseParticles: number[] = [];
    const innerOuterNoiseCount = 25000;  // Significantly increased particle count
    for(let i = 0; i < innerOuterNoiseCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 2;
      const r = outerRadius * (0.90 + Math.random() * 0.07); // 90-97% of radius
      const x = r * Math.cos(phi) * Math.sin(theta);
      const y = r * Math.cos(theta);
      const z = r * Math.sin(phi) * Math.sin(theta);
      innerOuterNoiseParticles.push(x, y, z);
    }

    const innerOuterNoiseGeometry = new THREE.BufferGeometry();
    innerOuterNoiseGeometry.setAttribute('position', new THREE.Float32BufferAttribute(innerOuterNoiseParticles, 3));
    const innerOuterNoiseMaterial = new THREE.PointsMaterial({
      size: 0.004, // Slightly smaller size to accommodate more particles
      map: new THREE.TextureLoader().load('data:image/png;base64,' + createGlowTexture()),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: new THREE.Color(0x4169E1), // Royal Blue
      opacity: 0.4  // Slightly reduced opacity to prevent oversaturation
    });
    const innerOuterNoiseSystem = new THREE.Points(innerOuterNoiseGeometry, innerOuterNoiseMaterial);

    // 4. Center Core Particles
    const coreParticles: number[] = [];
    const coreCount = 5000;
    for(let i = 0; i < coreCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 2;
      const r = outerRadius * (Math.random() * 0.2); // 0-20% of radius
      const x = r * Math.cos(phi) * Math.sin(theta);
      const y = r * Math.cos(theta);
      const z = r * Math.sin(phi) * Math.sin(theta);
      coreParticles.push(x, y, z);
    }

    const coreGeometry = new THREE.BufferGeometry();
    coreGeometry.setAttribute('position', new THREE.Float32BufferAttribute(coreParticles, 3));
    const coreMaterial = new THREE.PointsMaterial({
      size: 0.004,
      map: new THREE.TextureLoader().load('data:image/png;base64,' + createGlowTexture()),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: new THREE.Color(0x8b00a2),
      opacity: 0.8
    });
    const coreSystem = new THREE.Points(coreGeometry, coreMaterial);

    // Add all systems to scene
    // Initially set all materials to invisible
    [surfaceMaterial, innerNoiseMaterial, outerNoiseMaterial, 
     innerOuterNoiseMaterial, coreMaterial, wrapperMaterial].forEach(material => {
      material.opacity = 0;
    });

    scene.add(surfaceSystem);
    scene.add(innerNoiseSystem);
    scene.add(outerNoiseSystem);
    scene.add(innerOuterNoiseSystem);
    scene.add(coreSystem);
    scene.add(wrapperSystem);

    // Set inclination
    [surfaceSystem, innerNoiseSystem, outerNoiseSystem, 
     innerOuterNoiseSystem, coreSystem, wrapperSystem].forEach(system => {
      system.rotation.z = Math.PI * (210/180);
    });

    // Create a timeline for synchronized animations
    const tl = gsap.timeline({
      onComplete: () => {
        window.dispatchEvent(new CustomEvent('globeAnimationComplete'));
      }
    });

    // Delay the start of the animation slightly
    setTimeout(() => {
      // Add all animations to the timeline - simultaneous fade-in
      tl.to([
        coreMaterial,
        innerNoiseMaterial,
        innerOuterNoiseMaterial,
        surfaceMaterial,
        outerNoiseMaterial,
        wrapperMaterial
      ], {
        opacity: (index) => {
          const opacities = [0.8, 0.6, 0.4, 1, 0.35, 0.3];
          return opacities[index];
        },
        duration: 1.5,
        ease: 'power2.inOut'
      });
    }, 100);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x4b0082, 0.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x4b0082, 0.5, 5);
    const purpleLight = new THREE.PointLight(0x800080, 0.3, 5);
    pointLight.position.set(2, 2, 2);
    purpleLight.position.set(-2, -2, 2);
    scene.add(pointLight);
    scene.add(purpleLight);

    let frame = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      frame += 0.0014;

      [surfaceSystem, innerNoiseSystem, outerNoiseSystem, innerOuterNoiseSystem, coreSystem, wrapperSystem].forEach(system => {
        system.rotation.y = window.innerWidth < 640 ? frame * -0.35 : frame * 0.35;
        system.rotation.x = Math.sin(frame) * 0.07;
      });

      pointLight.intensity = 2 + Math.sin(frame * 2) * 0.5;
      renderer.render(scene, camera);
    };

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
      className="rounded-full overflow-hidden"
      style={{ 
        position: 'absolute',
        width: '1150px',
        height: '1150px',
        right: '-460px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 10,
        backfaceVisibility: 'hidden'
      }}
    />
  );
};

export { ParticleGlobe };
