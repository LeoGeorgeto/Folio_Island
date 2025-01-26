import { useGLTF } from '@react-three/drei';
import { useEffect, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import skySceneModel from '../assets/3d/sky.glb';

const Sky = ({ isRotating }) => {
  const skyRef = useRef();
  const { scene } = useGLTF(skySceneModel);

  // Memoize rotation speed to prevent recreation
  const rotationSpeed = useMemo(() => ({
    value: 0.5
  }), []);

  // Optimized frame update using delta time
  useFrame((_, delta) => {
    if (isRotating && skyRef.current) {
      // Smooth rotation based on delta time
      skyRef.current.rotation.y += rotationSpeed.value * delta;
    }
  });

  // Comprehensive cleanup of resources
  useEffect(() => {
    // Store the scene for cleanup
    const currentScene = scene;

    return () => {
      if (!currentScene) return;

      const disposeTexture = (material) => {
        if (material.map) material.map.dispose();
        if (material.lightMap) material.lightMap.dispose();
        if (material.bumpMap) material.bumpMap.dispose();
        if (material.normalMap) material.normalMap.dispose();
        if (material.specularMap) material.specularMap.dispose();
        if (material.envMap) material.envMap.dispose();
        if (material.alphaMap) material.alphaMap.dispose();
        if (material.aoMap) material.aoMap.dispose();
        if (material.displacementMap) material.displacementMap.dispose();
        if (material.emissiveMap) material.emissiveMap.dispose();
        if (material.gradientMap) material.gradientMap.dispose();
        if (material.metalnessMap) material.metalnessMap.dispose();
        if (material.roughnessMap) material.roughnessMap.dispose();
      };

      currentScene.traverse((child) => {
        // Dispose geometries
        if (child.geometry) {
          child.geometry.dispose();
        }

        // Dispose materials and textures
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(material => {
              disposeTexture(material);
              material.dispose();
            });
          } else {
            disposeTexture(child.material);
            child.material.dispose();
          }
        }
      });
    };
  }, [scene]);

  // Memoize the sky scene to prevent unnecessary recreations
  const memoizedSkyScene = useMemo(() => (
    <primitive object={scene} />
  ), [scene]);

  return (
    <mesh ref={skyRef}>
      {memoizedSkyScene}
    </mesh>
  );
};

// Preload sky model
useGLTF.preload(skySceneModel);

export default Sky;