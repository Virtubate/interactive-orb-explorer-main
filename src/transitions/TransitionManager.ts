
import { gsap } from 'gsap';
import * as THREE from 'three';

export interface TransitionState {
  cameraPosition: THREE.Vector3;
  rotation: THREE.Euler;
  scale: THREE.Vector3;
}

export class TransitionManager {
  private currentScene: THREE.Scene | null = null;
  private currentCamera: THREE.PerspectiveCamera | null = null;
  private currentMesh: THREE.Mesh | null = null;

  constructor() {}

  public setCurrentState(scene: THREE.Scene, camera: THREE.PerspectiveCamera, mesh: THREE.Mesh) {
    this.currentScene = scene;
    this.currentCamera = camera;
    this.currentMesh = mesh;
  }

  public async morphToGlobe(): Promise<void> {
    if (!this.currentMesh || !this.currentCamera) return;

    return new Promise((resolve) => {
      // Save initial state
      const initialScale = this.currentMesh.scale.clone();
      const initialPosition = this.currentCamera.position.clone();

      // Create timeline for smooth transition
      const tl = gsap.timeline({
        onComplete: () => resolve()
      });

      // Directly expand into globe shape
      tl.to(this.currentMesh.scale, {
        x: 2,
        y: 2,
        z: 2,
        duration: 1.5,
        ease: "power2.inOut"
      })
      // Move camera back simultaneously
      .to(this.currentCamera.position, {
        z: 8,
        duration: 1.5,
        ease: "power2.inOut"
      }, "-=1.5");
    });
  }

  public async morphToOrb(): Promise<void> {
    if (!this.currentMesh || !this.currentCamera) return;

    return new Promise((resolve) => {
      const tl = gsap.timeline({
        onComplete: () => resolve()
      });

      // Flatten the globe
      tl.to(this.currentMesh.scale, {
        x: 2,
        y: 0.1,
        z: 2,
        duration: 1,
        ease: "power2.inOut"
      })
      // Transform into orb
      .to(this.currentMesh.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 1,
        ease: "power2.inOut"
      })
      // Reset camera position
      .to(this.currentCamera.position, {
        z: 5,
        duration: 1,
        ease: "power2.inOut"
      }, "-=1");
    });
  }
}

export const transitionManager = new TransitionManager();
