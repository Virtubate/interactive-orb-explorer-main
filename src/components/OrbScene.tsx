import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { transitionManager } from '../transitions/TransitionManager';

interface OrbSceneProps {
  className?: string;
}

const OrbScene: React.FC<OrbSceneProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const orbRef = useRef<THREE.Mesh | null>(null);
  const frameId = useRef<number | null>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;

    // Setup scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      45, 
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Setup renderer with alpha for transparency
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight1.position.set(1, 1, 1);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0x8a2be2, 0.5);
    directionalLight2.position.set(-1, -1, -1);
    scene.add(directionalLight2);

    const pointLight1 = new THREE.PointLight(0x00ffff, 1, 10);
    pointLight1.position.set(2, 2, 2);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff00ff, 1, 10);
    pointLight2.position.set(-2, -2, -2);
    scene.add(pointLight2);

    // Create iridescent material for the orb
    const sphereGeometry = new THREE.SphereGeometry(1.62, 64, 64);

    // Create shader material for iridescent effect
    const orbMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(
          containerRef.current.clientWidth, 
          containerRef.current.clientHeight
        )},
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;

        void main() {
          vUv = uv;
          vPosition = position;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec2 resolution;
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;

        vec3 palette(float t) {
          vec3 a = vec3(0.5, 0.5, 0.5);
          vec3 b = vec3(0.5, 0.5, 0.5);
          vec3 c = vec3(1.0, 1.0, 1.0);
          vec3 d = vec3(0.263, 0.416, 0.557);

          return a + b * cos(6.28318 * (c * t + d));
        }

        void main() {
          vec3 viewDir = normalize(cameraPosition - vPosition);
          float fresnel = pow(1.0 - dot(viewDir, vNormal), 1.5);

          float noise = sin(vUv.x * 10.0 + time * 0.5) * 
                       sin(vUv.y * 10.0 + time * 0.3) * 
                       sin(vPosition.z * 8.0 + time * 0.2);

          vec3 color1 = palette(vUv.x + vUv.y + time * 0.1);
          vec3 color2 = palette(noise + time * 0.2);
          vec3 finalColor = mix(color1, color2, 0.5 + 0.5 * sin(time * 0.2));

          finalColor = mix(
            finalColor,
            vec3(0.9, 0.8, 1.0),
            fresnel * 0.7
          );

          float alpha = mix(0.9, 1.0, fresnel);

          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
    });

    // Create the orb with shader material
    const orbMesh = new THREE.Mesh(sphereGeometry, orbMaterial);
    scene.add(orbMesh);
    orbRef.current = orbMesh;

    // Register with transition manager
    transitionManager.setCurrentState(scene, camera, orbMesh);

    // Add subtle background glow
    const glowGeometry = new THREE.SphereGeometry(1.67, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.05,
      blending: THREE.AdditiveBlending,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);

    // Animation loop
    const animate = () => {
      if (!orbRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) return;

      const time = performance.now() * 0.001; // Convert to seconds

      // Update shader uniform
      orbMaterial.uniforms.time.value = time;

      // Smooth rotation towards target based on mouse position
      orbRef.current.rotation.x += (targetRotation.current.y - orbRef.current.rotation.x) * 0.05;
      orbRef.current.rotation.y += (targetRotation.current.x - orbRef.current.rotation.y) * 0.05;

      // Subtle constant rotation
      orbRef.current.rotation.z += 0.001;
      glow.rotation.copy(orbRef.current.rotation);

      // Render
      rendererRef.current.render(sceneRef.current, cameraRef.current);

      // Continue animation loop
      frameId.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();

      rendererRef.current.setSize(width, height);
      if (orbMaterial.uniforms && orbMaterial.uniforms.resolution) {
        orbMaterial.uniforms.resolution.value.set(width, height);
      }
    };

    window.addEventListener('resize', handleResize);

    // Handle mouse movement for interactive rotation
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width * 2 - 1;

      mousePosition.current = { x, y: 0 };
      // Limit rotation to 45 degrees (PI/4 radians) and reduce speed
      targetRotation.current = {
        x: Math.max(Math.min(x * Math.PI * 0.1, Math.PI/4), -Math.PI/4), // Limit to ±45 degrees
        y: 0
      };
    };

    // Handle touch events for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (!containerRef.current || e.touches.length === 0) return;

      const touch = e.touches[0];
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;

      mousePosition.current = { x, y: 0 };
      // Limit rotation to 45 degrees (PI/4 radians) and reduce speed
      targetRotation.current = {
        x: Math.max(Math.min(x * Math.PI * 0.1, Math.PI/4), -Math.PI/4), // Limit to ±45 degrees
        y: 0
      };
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove);

    // Handle cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);

      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full cursor-interactive ${className || ''}`}
    />
  );
};

export default OrbScene;