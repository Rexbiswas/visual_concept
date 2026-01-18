import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls, useGLTF, Stage, Environment, ContactShadows, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// --- Reusable Generic Car Model ---
const GenericCarModel = ({ modelPath, scale }) => {
    // Dynamic load
    const gltf = useGLTF(modelPath);

    useEffect(() => {
        if (gltf.scene) {
            gltf.scene.traverse((object) => {
                if (object.isMesh) {
                    object.castShadow = true;
                    object.receiveShadow = true;

                    // Generic Material Enhancement (Auto-detect common names)
                    const matName = object.material.name ? object.material.name.toLowerCase() : '';

                    if (matName.includes('body') || matName.includes('paint') || matName.includes('carpaint')) {
                        const paintMat = new THREE.MeshPhysicalMaterial({
                            color: object.material.color, // Keep original color or override
                            metalness: 0.8,
                            roughness: 0.2,
                            clearcoat: 1.0,
                            clearcoatRoughness: 0.05,
                            envMapIntensity: 2.0
                        });
                        if (object.material.map) paintMat.map = object.material.map;
                        object.material = paintMat;
                    }
                }
            });
        }
    }, [gltf]);

    return (
        <primitive object={gltf.scene} scale={scale || 1} />
    );
};

// --- Animated Spotlight ---
const MovingLight = () => {
    const lightRef = useRef();
    useFrame(({ clock }) => {
        const t = clock.getElapsedTime() * 0.5;
        if (lightRef.current) {
            lightRef.current.position.x = Math.sin(t) * 10;
            lightRef.current.position.z = Math.cos(t) * 10;
        }
    });
    return <spotLight ref={lightRef} position={[10, 10, 10]} intensity={5} angle={0.5} penumbra={1} castShadow shadow-bias={-0.0001} color="#00ffff" />;
};

const ExploreCar = ({ modelPath, scale = 1 }) => {
    // If no model path provided, don't render or render default
    if (!modelPath) return null;

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas shadows camera={{ position: [6, 2, 8], fov: 35 }}>
                <fog attach="fog" args={['#050505', 5, 25]} />
                <ambientLight intensity={0.5} />
                <MovingLight />
                <Environment preset="city" blur={0.8} />

                <React.Suspense fallback={<Html center><div style={{ color: 'cyan', fontFamily: 'Rajdhani' }}>LOADING MODEL...</div></Html>}>
                    <Stage environment={null} intensity={1} contactShadow={{ opacity: 0.8, blur: 2 }} adjustCamera={false}>
                        <GenericCarModel modelPath={modelPath} scale={scale} />
                    </Stage>
                    <ContactShadows resolution={1024} scale={50} blur={2} opacity={0.5} far={10} color="#000000" />
                    {/* Sparkles removed */}
                </React.Suspense>

                <OrbitControls
                    enablePan={false}
                    enableZoom={false} // Disable zoom for hero background interaction
                    autoRotate={true}
                    autoRotateSpeed={0.5}
                    minPolarAngle={0}
                    maxPolarAngle={Math.PI / 2}
                />
            </Canvas>
        </div>
    );
};

export default ExploreCar;
