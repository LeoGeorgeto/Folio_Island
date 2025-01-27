import React, { useEffect, useRef, useMemo } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import planeScene from '../assets/3d/plane.glb';
import * as THREE from 'three';

const Plane = ({ isRotating, ...props }) => {
  const planeRef = useRef();
  const { scene, animations } = useGLTF(planeScene);
  const { actions } = useAnimations(animations, planeRef);
  const currentSpeed = useRef(0);

  // Memoize animation speeds
  const constants = useMemo(() => ({
    speeds: {
      rotating: 2.5,
      normal: 0.85,
    },
    damping: {
      factor: .99,
      threshold: 0.001
    }
  }), []);

  // Initialize and handle animations
  useEffect(() => {
    const action = actions['Take 001'];
    if (!action) return;

    // Always keep animation playing
    action.play();

    // Set initial speed based on rotation state
    if (isRotating) {
      currentSpeed.current = constants.speeds.rotating;
    }

    return () => {
      // Don't stop animation on cleanup
    };
  }, [actions, isRotating, constants.speeds]);

  //  Handle speed changes and floating motion subtle floating motion
  useFrame(() => {
    if (!planeRef.current || !actions['Take 001']) return;

    const action = actions['Take 001'];

    if (isRotating) {
      currentSpeed.current = constants.speeds.rotating;
    } else {
      currentSpeed.current = Math.max(
        constants.speeds.normal,
        currentSpeed.current * constants.damping.factor
      );
    }

    // Apply the current speed to the animation
    action.setEffectiveTimeScale(currentSpeed.current);

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