import React, { useEffect, useRef, useState } from 'react';
import { Engine, Scene, ArcRotateCamera, Vector3, DirectionalLight, HemisphericLight, SceneLoader, Color3, CubeTexture } from '@babylonjs/core';
import '@babylonjs/loaders/glTF';

const BabylonScene = ({ onLoadingStateChange }) => {
    const canvasRef = useRef(null);
    const [rotationSpeed] = useState(0.05);
    const [hemisphericLightIntensity] = useState(0.7);
    const [topLightIntensity] = useState(0.5);
    const [frontLightIntensity] = useState(0.5);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const engineRef = useRef(null);
    const hasStartedLoading = useRef(false);

    const [environmentIntensity] = useState(0.75);

    // Update parent component with loading state
    useEffect(() => {
        onLoadingStateChange?.(isLoading);
    }, [isLoading, onLoadingStateChange]);

    // Pre-load the model and set up scene
    useEffect(() => {
        if (!canvasRef.current || hasStartedLoading.current) return;
        hasStartedLoading.current = true;

        const setupScene = async () => {
            try {
                // First, preload the model
                const response = await fetch('/3d/champagne-9.glb');
                if (!response.ok) {
                    throw new Error(`Failed to preload model: ${response.statusText}`);
                }

                // Now set up the scene
                const canvas = canvasRef.current;
                if (!canvas) return;

                const engine = new Engine(canvas, true, { antialias: true, preserveDrawingBuffer: true, stencil: true });
                engineRef.current = engine;

                engine.setHardwareScalingLevel(1 / window.devicePixelRatio);

                const scene = new Scene(engine);
                sceneRef.current = scene;

                scene.clearColor = Color3.FromHexString("#F7F6F3");

                const isMobile = window.innerWidth <= 768; // Define isMobile

                const camera = new ArcRotateCamera(
                    "camera",
                    0,
                    1.4,
                    isMobile ? 33 : 22,
                    Vector3.Zero(),
                    scene
                );
                camera.attachControl(canvas, false);
                camera.fov = 0.6;
                cameraRef.current = camera;

                camera.lowerBetaLimit = Math.PI / 2;
                camera.upperBetaLimit = Math.PI / 2;
                camera.panningSensibility = 0;
                camera.lowerRadiusLimit = isMobile ? 33 : 22;
                camera.upperRadiusLimit = isMobile ? 33 : 22;

                const hemisphericLight = new HemisphericLight("hemisphericLight", new Vector3(0, 1, 0), scene);
                const topLight = new DirectionalLight("topLight", new Vector3(0, -1, 0), scene);
                const frontLight = new DirectionalLight("frontLight", new Vector3(0, 0, 1), scene);

                hemisphericLight.intensity = hemisphericLightIntensity;
                topLight.intensity = topLightIntensity;
                frontLight.intensity = frontLightIntensity;

                // Load environment texture
                try {
                    const envTexture = CubeTexture.CreateFromPrefilteredData("/3d/sanGiuseppeBridge.env", scene);
                    scene.environmentTexture = envTexture;
                    scene.environmentIntensity = environmentIntensity;
                } catch (error) {
                    console.warn("Continuing without environment texture:", error);
                }

                // Load the 3D model
                SceneLoader.ImportMesh("", "/3d/", "champagne-9.glb", scene,
                    function (meshes) {
                        if (meshes.length > 0) {
                            const iceBucket = meshes.find(mesh => mesh.name === "Ice_bucket01");
                            if (iceBucket) {
                                const rootMesh = meshes[0];
                                rootMesh.scaling = new Vector3(40, 40, 40);

                                iceBucket.computeWorldMatrix(true);
                                const boundingBox = iceBucket.getBoundingInfo().boundingBox;
                                const bottomCenter = new Vector3(
                                    (boundingBox.minimumWorld.x + boundingBox.maximumWorld.x) / 2,
                                    boundingBox.minimumWorld.y,
                                    (boundingBox.minimumWorld.z + boundingBox.maximumWorld.z) / 2
                                );

                                camera.setTarget(bottomCenter);
                                camera.target = bottomCenter;
                                rootMesh.position.y -= isMobile ? 8 : 5;

                                setIsLoading(false);
                            } else {
                                throw new Error("Model structure is invalid - Ice bucket not found");
                            }
                        } else {
                            throw new Error("No meshes were loaded");
                        }
                    },
                    null,
                    function (scene, message, exception) {
                        throw new Error(`Error loading model: ${message}`);
                    }
                );

                // Set up render loop
                const renderLoop = () => {
                    if (cameraRef.current) {
                        cameraRef.current.alpha += rotationSpeed;
                    }
                    scene.render();
                };

                engine.runRenderLoop(renderLoop);

                const handleResize = () => {
                    engine.resize();
                };

                window.addEventListener('resize', handleResize);

                return () => {
                    window.removeEventListener('resize', handleResize);
                    engine.stopRenderLoop(renderLoop);
                    scene.dispose();
                    engine.dispose();
                };

            } catch (error) {
                console.error('Setup failed:', error);
                setLoadError(error.message);
                setIsLoading(false);
            }
        };

        setupScene();
    }, [rotationSpeed, environmentIntensity, hemisphericLightIntensity, topLightIntensity, frontLightIntensity]);

    return (
        <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#F7F6F3',
            position: 'relative'
        }}>
            <canvas
                ref={canvasRef}
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    outline: 'none',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    opacity: isLoading ? 0 : 1,
                    transition: 'opacity 0.3s ease-in-out'
                }}
            />
            {loadError && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#F7F6F3'
                }}>
                    <p>Error loading 3D model: {loadError}</p>
                </div>
            )}
        </div>
    );
};

export default BabylonScene;
