import React, { useEffect, useRef, useMemo } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import planeScene from '../assets/3d/plane.glb';
import * as THREE from 'three';

const Plane = ({ isRotating, ...props }) => {
  const planeRef = useRef();
  const { scene, animations } = useGLTF(planeScene);
  const { actions } = useAnimations(animations, planeRef);
  const lastY = useRef(props.position[1]);

  // Memoize animation speeds
  const animationSpeeds = useMemo(() => ({
    rotating: 2.2,
    normal: 0.8,
    transitionDuration: 0.5
  }), []);

  // Initialize and handle animations
  useEffect(() => {
    const action = actions['Take 001'];
    if (!action) return;

    // Ensure animation is always playing
    action.play();

    // Get current speed before transition
    const startSpeed = isRotating ? animationSpeeds.rotating : animationSpeeds.normal;
    const targetSpeed = isRotating ? animationSpeeds.rotating : animationSpeeds.normal;

    let animationFrameId;

    // Only perform speed transition if there's a change
    if (action.getEffectiveTimeScale() !== targetSpeed) {
      const startTime = Date.now();

      const animate = () => {
        const elapsed = (Date.now() - startTime) / 1000;
        const progress = Math.min(elapsed / animationSpeeds.transitionDuration, 1);

        const newSpeed = startSpeed + (targetSpeed - startSpeed) * progress;
        action.setEffectiveTimeScale(newSpeed);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        }
      };

      animate();
    }

    // Cleanup function
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      // Don't stop the animation on cleanup, just let it continue
    };
  }, [actions, isRotating, animationSpeeds]);

  // Optional: Add subtle floating motion
  useFrame((_, delta) => {
    if (!planeRef.current) return;

    let targetY = props.position[1];

    if (!isRotating) {
      // Add floating motion only when not rotating/dragging
      const time = Date.now() * 0.001;
      const floatIntensity = 0.05;
      const floatSpeed = 1.5;
      const floatingOffset = Math.sin(time * floatSpeed) * floatIntensity;
      targetY += floatingOffset;

      // Apply smoother transition when floating
      planeRef.current.position.y = THREE.MathUtils.lerp(
        planeRef.current.position.y,
        targetY,
        0.05  // Slower lerp during floating
      );
    } else {
      // When rotating/dragging, move directly to target with faster lerp
      planeRef.current.position.y = THREE.MathUtils.lerp(
        planeRef.current.position.y,
        targetY,
        0.3  // Faster lerp during dragging
      );
    }
  });

  // Cleanup effect for geometry and materials
  useEffect(() => {
    return () => {
      if (scene) {
        scene.traverse((object) => {
          if (object.geometry) {
            object.geometry.dispose();
          }
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => {
                if (material.map) material.map.dispose();
                material.dispose();
              });
            } else {
              if (object.material.map) object.material.map.dispose();
              object.material.dispose();
            }
          }
        });
      }
    };
  }, [scene]);

  return (
    <mesh ref={planeRef} {...props}>
      <primitive object={scene} />
    </mesh>
  );
};

// Preload the model
useGLTF.preload(planeScene);

export default Plane;