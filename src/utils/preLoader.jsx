// --- Function to preload 3D models for improved scene loading performance ---
import { useGLTF } from '@react-three/drei';
import birdScene from '../assets/3d/bird.glb';
import islandScene from '../assets/3d/island.glb';
import planeScene from '../assets/3d/plane.glb';
import skyScene from '../assets/3d/sky.glb';

// Function to preload all the necessary 3D models before rendering
export const preloadModels = () => {
    useGLTF.preload(birdScene);
    useGLTF.preload(islandScene);
    useGLTF.preload(planeScene);
    useGLTF.preload(skyScene);
};