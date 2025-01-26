// --- Imports ---
import { useRef, useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber'
import { a } from '@react-spring/three'
import { throttle } from 'lodash';

import islandScene from '../assets/3d/island.glb';

const Island = ({isRotating, setIsRotating, setCurrentStage, ...props}) => {
  // --- Refs and Hooks ---
  const islandRef = useRef();
  const { gl, viewport } = useThree();
  const { nodes, materials, scene } = useGLTF(islandScene);
  const lastX = useRef(0);
  const rotationSpeed = useRef(0);

  // --- Constants ---
  const ROTATION_SPEED = 0.003;
  const DAMPING_FACTOR = 0.95;
  const VELOCITY_THRESHOLD = 0.0001;

  // --- Stage Angles Configuration ---
  const stageAngles = useMemo(() => ({
    4: { min: 5.45, max: 5.85 },
    3: { min: 0.85, max: 1.3 },
    2: { min: 2.4, max: 2.6 },
    1: { min: 4.25, max: 4.75 }
  }), []);

  // --- Animation Frame Logic ---
  useFrame((state, delta) => {
    if (!isRotating) {
      rotationSpeed.current *= DAMPING_FACTOR;

      if (Math.abs(rotationSpeed.current) < VELOCITY_THRESHOLD) {
        rotationSpeed.current = 0;
      } else {
        islandRef.current.rotation.y += rotationSpeed.current;
      }
    }

    const rotation = islandRef.current.rotation.y;
    const normalizedRotation = ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

    const newStage = Object.entries(stageAngles).find(
      ([stage, { min, max }]) => normalizedRotation >= min && normalizedRotation <= max
    );
    
    setCurrentStage(newStage ? Number(newStage[0]) : null);
  });

  // --- Event Handlers ---
  const handlePointerDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);

    const canvas = gl.domElement;
    canvas.style.cursor = 'none';
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    lastX.current = clientX;
  }

  const handlePointerUp = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);

    const canvas = gl.domElement;
    canvas.style.cursor = 'grab';
  }

  const handlePointerLeave = (e) => {
    if (isRotating) {
      setIsRotating(false);
      const canvas = gl.domElement;
      canvas.style.cursor = 'grab';
    }
  }

  const handlePointerMove = throttle((e) => {
    e.stopPropagation();
    e.preventDefault();
  
    if (isRotating) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const delta = (clientX - lastX.current) / viewport.width;
  
      islandRef.current.rotation.y += delta * ROTATION_SPEED * Math.PI;
      lastX.current = clientX;
      rotationSpeed.current = delta * ROTATION_SPEED * Math.PI;
    }
  }, 32);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      if (!isRotating) setIsRotating(true);
      islandRef.current.rotation.y += 0.01 * Math.PI;
      rotationSpeed.current = 0.0125;
    } else if (e.key === 'ArrowRight') {
      if (!isRotating) setIsRotating(true);
      islandRef.current.rotation.y -= 0.01 * Math.PI;
      rotationSpeed.current = -0.0125;
    }
  }

  const handleKeyUp = (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      setIsRotating(false);
    }
  }

  // --- Cleanup Effect ---
  useEffect(() => {
    return () => {
      if (scene) return;
      
      scene.traverse((child) => {
        if (child.geometry) {
          child.geometry.dispose();
        }
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(material => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    };
  }, [scene]);

  // --- Event Listeners Setup ---
  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointerleave', handlePointerLeave);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener("touchstart", handlePointerDown);
    canvas.addEventListener("touchmove", handlePointerMove);
    canvas.addEventListener("touchend", handlePointerUp);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener("touchstart", handlePointerDown);
      canvas.removeEventListener("touchmove", handlePointerMove);
      canvas.removeEventListener("touchend", handlePointerUp);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    }
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  // --- Render ---
  return (
    <a.group ref={islandRef} {...props}>
      <instancedMesh
        count={materials.PaletteMaterial001 ? Object.keys(nodes).length : 0}
        geometry={nodes.polySurface944_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface944_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface945_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface946_tree2_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface947_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface948_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface949_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.pCube11_rocks1_0.geometry}
        material={materials.PaletteMaterial001}
      />
    </a.group>
  )
}

export default Island;