import { Suspense, useState, useEffect, useRef, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import Loader from '../components/Loader'
import Island from '../models/Island'
import Sky from '../models/Sky'
import Bird from '../models/Bird'
import Plane from '../models/Plane'
import HomeInfo from '../components/HomeInfo'
import { Volume2 } from 'lucide-react'
import sakura from '../assets/sakura.mp3'

// Performance monitoring component
const PerformanceMonitor = () => {
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    
    const checkPerformance = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = frameCount;
        if (fps < 25) {
          console.warn('Low FPS:', fps);
        }
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(checkPerformance);
    };
    
    const rafId = requestAnimationFrame(checkPerformance);
    return () => cancelAnimationFrame(rafId);
  }, []);
  
  return null;
};

const Home = ({ setSceneLoaded }) => {
  const audioRef = useRef(new Audio(sakura));
  const [currentStage, setCurrentStage] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  const [localSceneLoaded, setLocalSceneLoaded] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [quality, setQuality] = useState('high');
  const [islandRotation, setIslandRotation] = useState(0);

  // Dynamic quality adjustment based on performance
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    
    const checkPerformance = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;
        
        // Adjust quality based on FPS
        if (fps < 30 && quality !== 'low') {
          setQuality('low');
          console.log('Switching to low quality mode');
        } else if (fps > 40 && quality !== 'high') {
          setQuality('high');
          console.log('Switching to high quality mode');
        }
      }
      
      requestAnimationFrame(checkPerformance);
    };
    
    const rafId = requestAnimationFrame(checkPerformance);
    return () => cancelAnimationFrame(rafId);
  }, [quality]);

  // Memoize screen adjustments
  const screenAdjustments = useMemo(() => {
    const isMobile = window.innerWidth < 768;
    const isLowQuality = quality === 'low';

    return {
      island: {
        scale: isMobile ? [0.7, 0.7, 0.7] : [0.85, 0.85, 0.85],
        position: isMobile ? [0, -5.5, -43] : [0, -6.5, -45],
        rotation: [0.1, 4.7, 0]
      },
      plane: {
        scale: isMobile ? [1.2, 1.2, 1.2] : [2, 3, 3],
        position: isMobile ? [0, -1, 1] : [0, -2, -1.5]
      },
      renderSettings: {
        dpr: isLowQuality ? 1 : Math.min(window.devicePixelRatio, 1.5),
        precision: isLowQuality ? 'lowp' : 'mediump'
      }
    };
  }, [quality]);

  // Audio handling
  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = 0.4;
    audio.loop = true;

    const handleAudio = async () => {
      try {
        if (isPlayingMusic && localSceneLoaded) {
          await audio.play();
        } else {
          audio.pause();
        }
      } catch (error) {
        console.error("Audio playback failed:", error);
      }
    };

    handleAudio();
    
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isPlayingMusic, localSceneLoaded]);

  // Scene loading
  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setSceneLoaded(true);
      setLocalSceneLoaded(true);
    }, 2000);

    return () => {
      clearTimeout(loadTimer);
      setSceneLoaded(false);
      setLocalSceneLoaded(false);
    };
  }, [setSceneLoaded]);

  return (
    <section className='w-full md:h-full h-[100vh] relative supports-[overflow-clip]:h-[calc(100dvh-80px)]'>
      <Canvas
        className={`w-full h-full md:h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
        camera={{ 
          near: 0.1, 
          far: 850, // Reduced from 1000
          fov: 65,  // Reduced from 75
          position: [0, 0, 5]
        }}
        gl={{ 
          powerPreference: "high-performance",
          antialias: false,
          stencil: false,
          depth: true,
          precision: screenAdjustments.renderSettings.precision,
          dpr: screenAdjustments.renderSettings.dpr
        }}
        performance={{
          min: 0.5,
          max: 1,
          debounce: 200
        }}
        flat
        legacy
      >
        <PerformanceMonitor />
        {/* <Stats className="stats" /> */}
        <Suspense fallback={<Loader />}>
          {/* Optimized lighting */}
          <directionalLight position={[1, 1, 1]} intensity={2} castShadow={false} />
          <ambientLight intensity={0.5} />
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1} />

          <Bird />
          <Sky islandRotation={islandRotation} />
          <Island
            {...screenAdjustments.island}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            quality={quality}
            onRotationUpdate={setIslandRotation}
          />
          <Plane 
            isRotating={isRotating}
            {...screenAdjustments.plane}
            rotation={[0, 20, 0]}
          />
          <Preload all />
        </Suspense>
      </Canvas>

      <div className={`absolute bottom-2 left-2 transition-opacity duration-1000 ${
        localSceneLoaded ? 'opacity-100' : 'opacity-0'
      }`}>
        <button
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className={`
            w-10 h-10 rounded-full 
            flex items-center justify-center 
            shadow-lg 
            transition-all duration-300 ease-in-out 
            hover:scale-110
            sound-button
            bg-size-200
            ${isPlayingMusic 
              ? 'bg-gradient-to-r from-[#00c6ff] via-[#0072ff] to-[#00c6ff]' 
              : 'bg-gradient-to-r from-[#ff9966] via-[#ff5e62] to-[#ff9966]'
            }`}
        >
          <Volume2 className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        <HomeInfo currentStage={currentStage} sceneLoaded={localSceneLoaded} />
      </div>
    </section>
  );
};

export default Home;