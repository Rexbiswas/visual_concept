import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, Environment, Html, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { FaPalette, FaCheck, FaMousePointer, FaUndo } from 'react-icons/fa';
import './CarCustomizer.css';

// Import the specific model
const LamboModelUrl = new URL('../assets/lamborghini_terzo_millennio.glb', import.meta.url).href;

const CarModel = ({ onPartSelect, selectedPartName, currentActionColor }) => {
    const { scene } = useGLTF(LamboModelUrl);
    const [hovered, setHover] = useState(null);
    const originalMaterials = useRef({});

    // Apply color change when action color or selected part changes
    useEffect(() => {
        if (selectedPartName && currentActionColor) {
            scene.traverse((object) => {
                if (object.isMesh && object.name === selectedPartName) {

                    // Save original material if not already saved
                    if (!originalMaterials.current[object.name]) {
                        originalMaterials.current[object.name] = object.material;
                    }

                    if (currentActionColor === 'reset') {
                        // Restore default
                        if (originalMaterials.current[object.name]) {
                            object.material = originalMaterials.current[object.name];
                        }
                    } else {
                        // Apply new custom PBR material
                        applyPBRMaterial(object, currentActionColor);
                    }
                }
            });
        }
    }, [currentActionColor, selectedPartName, scene]);

    const applyPBRMaterial = (object, color) => {
        const matName = object.material.name ? object.material.name.toLowerCase() : '';
        const objName = object.name ? object.name.toLowerCase() : '';
        const name = `${objName} ${matName}`;

        let pbrConfig = {};

        // 1. Rubber / Tires
        if (name.includes('tire') || name.includes('rubber') || name.includes('wheel_bk')) {
            pbrConfig = {
                metalness: 0.1,
                roughness: 0.8,
                clearcoat: 0.0,
                color: new THREE.Color(color).multiplyScalar(0.5) // Rubber is usually dark
            };
        }
        // 2. Metal / Rims / Brakes
        else if (name.includes('rim') || name.includes('metal') || name.includes('chrome') || name.includes('silver') || name.includes('brake') || name.includes('caliper')) {
            pbrConfig = {
                metalness: 0.9,
                roughness: 0.2, // Shiny metal
                clearcoat: 1.0,
                clearcoatRoughness: 0.1,
                color: new THREE.Color(color)
            };
        }
        // 3. Glass (Tinting)
        else if (name.includes('glass') || name.includes('window') || name.includes('windshield')) {
            pbrConfig = {
                metalness: 0.1,
                roughness: 0.0,
                transmission: 0.9, // Glass nature
                transparent: true,
                opacity: 0.6,
                color: new THREE.Color(color)
            };
        }
        // 4. Interior / Plastic / Carbon
        else if (name.includes('interior') || name.includes('seat') || name.includes('dash') || name.includes('plastic') || name.includes('grill')) {
            pbrConfig = {
                metalness: 0.2,
                roughness: 0.6,
                clearcoat: 0.0,
                color: new THREE.Color(color)
            };
        }
        // 5. Default: Car Paint (Body)
        else {
            pbrConfig = {
                metalness: 0.9,
                roughness: 0.2,
                clearcoat: 1.0,
                clearcoatRoughness: 0.03,
                sheen: 0.5,
                sheenColor: new THREE.Color(color),
                envMapIntensity: 1.5,
                color: new THREE.Color(color)
            };
        }

        // Apply new material properties directly
        // We use MeshPhysicalMaterial for best PBR results
        const newMat = new THREE.MeshPhysicalMaterial({
            ...pbrConfig
            // Preserve maps if they exist
        });

        if (object.material.map) newMat.map = object.material.map;
        if (object.material.normalMap) newMat.normalMap = object.material.normalMap;
        if (object.material.roughnessMap) newMat.roughnessMap = object.material.roughnessMap;
        if (object.material.aoMap) newMat.aoMap = object.material.aoMap;
        if (object.material.metalnessMap) newMat.metalnessMap = object.material.metalnessMap;

        object.material = newMat;
    };


    return (
        <primitive
            object={scene}
            scale={1.6}
            onPointerOver={(e) => { e.stopPropagation(); setHover(e.object.name); document.body.style.cursor = 'pointer'; }}
            onPointerOut={(e) => { e.stopPropagation(); setHover(null); document.body.style.cursor = 'auto'; }}
            onPointerDown={(e) => {
                e.stopPropagation();
                // Select the part
                onPartSelect(e.object.name, e.object.material.name);
            }}
        />
    );
};

const CarCustomizer = () => {
    // UI selections
    const [selectedPart, setSelectedPart] = useState(null); // { name: string, matName: string }
    const [actionColor, setActionColor] = useState(null); // Triggers color application

    // Responsive Camera State
    const [cameraPos, setCameraPos] = useState([4.5, 2.5, 5]);
    const [cameraFov, setCameraFov] = useState(30);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setCameraPos([6, 3.5, 7]); // Further back & higher for mobile
                setCameraFov(40);
            } else if (width < 1024) {
                setCameraPos([5, 3, 6]);
                setCameraFov(35);
            } else {
                setCameraPos([4.5, 2.5, 5]);
                setCameraFov(30);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handlePartSelect = (name, matName) => {
        console.log("Selected Part:", name, "Material:", matName);
        setSelectedPart({ name, matName });
        // Reset action color so we don't auto-apply old color to new part immediately if unwanted, 
        // OR keep it null to wait for user input.
        setActionColor(null);
    };

    const handleColorClick = (hex) => {
        if (selectedPart) {
            setActionColor(hex);
        } else {
            alert("Please select a part on the car model first!");
        }
    };

    // ... colors array ...
    const colors = [
        { name: 'Cyber Cyan', hex: '#00ffff' },
        { name: 'Neon Purple', hex: '#b026ff' },
        { name: 'Crimson Red', hex: '#ff003c' },
        { name: 'Stealth Black', hex: '#111111' },
        { name: 'Ghost White', hex: '#ffffff' },
        { name: 'Toxic Green', hex: '#39ff14' },
        { name: 'Plasma Blue', hex: '#0051ff' },
        { name: 'Sunset Gold', hex: '#ffae00' },
        { name: 'Dark Grey', hex: '#444444' },
        { name: 'Bronze', hex: '#cd7f32' },
        { name: 'Reset', hex: 'reset' },
    ];

    return (
        <div className="customizer-container">

            {/* Header / Title */}
            <div className="customizer-header">
                <h1>Interactive Customizer</h1>
                <p>
                    {selectedPart ? `SELECTED: ${selectedPart.name.replace(/_/g, ' ')}` : "CLICK A PART TO SELECT"}
                </p>
                <div style={{ marginTop: '15px' }}>
                    <a href="/" className="back-btn-inline">
                        ← Back Home
                    </a>
                </div>
            </div>

            <Canvas shadows dpr={[1, 2]} style={{ width: '100%', height: '100%' }}>
                <PerspectiveCamera makeDefault position={cameraPos} fov={cameraFov} />
                <color attach="background" args={['#050505']} />

                <fog attach="fog" args={['#050505', 10, 50]} />

                <ambientLight intensity={0.4} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

                <Suspense fallback={<Html center><div style={{ color: 'cyan' }}>LOADING ASSETS...</div></Html>}>
                    <Stage environment="city" intensity={0.6} adjustCamera={false} contactShadow={{ resolution: 1024, scale: 100, blur: 2, opacity: 0.5, color: '#000' }}>
                        <CarModel
                            onPartSelect={handlePartSelect}
                            selectedPartName={selectedPart?.name}
                            currentActionColor={actionColor}
                        />
                    </Stage>

                    <Environment preset="night" blur={0.8} />
                </Suspense>

                <OrbitControls
                    enablePan={false}
                    minPolarAngle={0}
                    maxPolarAngle={Math.PI / 2.2}
                    autoRotate={false}
                />
            </Canvas>

            {/* Customization Panel */}
            <div className="customizer-panel">
                <div className={`panel-status ${selectedPart ? 'active' : ''}`}>
                    {selectedPart ? <FaPalette /> : <FaMousePointer />}
                    <span>{selectedPart ? "CHANGE COLOR" : "SELECT PART"}</span>
                </div>

                <div className="color-options-wrapper">
                    {colors.map((c) => (
                        <button
                            key={c.name}
                            onClick={() => handleColorClick(c.hex)}
                            className={`color-btn ${actionColor === c.hex ? 'active' : ''} ${!selectedPart ? 'disabled' : ''}`}
                            style={{
                                background: c.hex === 'reset' ? 'rgba(255,255,255,0.1)' : c.hex,
                                boxShadow: actionColor === c.hex ? `0 0 15px ${c.hex === 'reset' ? '#fff' : c.hex}` : 'none',
                            }}
                            title={c.name}
                        >
                            {c.hex === 'reset' && <FaUndo style={{ color: '#fff', fontSize: '0.9rem' }} />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Back Button Removed from here */}
        </div>
    );
};

export default CarCustomizer;
