import React from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function ImprovedLighting() {
    const { scene } = useThree();

    React.useEffect(() => {
        scene.add(new THREE.AmbientLight(0xffffff, 0.5));
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // Clean up function
        return () => {
            scene.remove(scene.getObjectByName('AmbientLight'));
            scene.remove(scene.getObjectByName('DirectionalLight'));
        };
    }, [scene]);

    return null;
}