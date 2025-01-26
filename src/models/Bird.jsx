import { useRef, useEffect, useMemo } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import birdScene from '../assets/3d/bird.glb';

const Bird = ({ quality = 'high' }) => {
    const birdRef = useRef();
    const { scene, animations } = useGLTF(birdScene);
    const { actions } = useAnimations(animations, birdRef);

    // Animation parameters
    const animationConfig = useMemo(() => ({
        FLIGHT_SPEED: 2,
        WAVE_SPEED: 1.5,
        WAVE_HEIGHT: 0.2,
        INITIAL_Y: 2,
        POSITION_LIMIT: 15
    }), []);

    // Initialize bird position and animation
    useEffect(() => {
        if (!birdRef.current) return;

        // Set initial position
        birdRef.current.position.x = -5;
        birdRef.current.position.y = animationConfig.INITIAL_Y;
        birdRef.current.position.z = 1;
        birdRef.current.rotation.y = 0;

        // Start animation
        const action = actions['Take 001'];
        if (action) {
            action.reset().play();
            action.setEffectiveTimeScale(quality === 'high' ? 1 : 0.8);
            action.setEffectiveWeight(1);
        }

        return () => {
            if (action) {
                action.stop();
                action.reset();
            }
        };
    }, [actions, animationConfig.INITIAL_Y, quality]);

    // Optimized frame update
    useFrame((state, delta) => {
        if (!birdRef.current) return;

        const bird = birdRef.current;
        const time = state.clock.getElapsedTime();

        // Calculate wave motion
        bird.position.y = 
            Math.sin(time * animationConfig.WAVE_SPEED) * 
            animationConfig.WAVE_HEIGHT + 
            animationConfig.INITIAL_Y;

        // Update position based on direction
        if (bird.position.x > state.camera.position.x + animationConfig.POSITION_LIMIT) {
            bird.rotation.y = Math.PI;
        } else if (bird.position.x < state.camera.position.x - animationConfig.POSITION_LIMIT) {
            bird.rotation.y = 0;
        }

        // Move bird
        if (bird.rotation.y === 0) {
            bird.position.x += animationConfig.FLIGHT_SPEED * delta;
            bird.position.z -= animationConfig.FLIGHT_SPEED * delta;
        } else {
            bird.position.x -= animationConfig.FLIGHT_SPEED * delta;
            bird.position.z += animationConfig.FLIGHT_SPEED * delta;
        }
    });

    return (
        <group ref={birdRef}>
            <primitive 
                object={scene} 
                scale={[0.003, 0.003, 0.003]}
            />
        </group>
    );
};

// Preload the model
useGLTF.preload(birdScene);

export default Bird;