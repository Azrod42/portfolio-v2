'use client'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {useEffect} from "react";
export function Asteroid1() {
    const gltf = useLoader(GLTFLoader, '3dModel/asteroid_1.glb');
    gltf.scene.position.x = -15;
    gltf.scene.position.y = -0.5;
    gltf.scene.position.z = 50;
    gltf.scene.scale.x = 0.24;
    gltf.scene.scale.y = 0.24;
    gltf.scene.scale.z = 0.24;
    // gltf.scene.rotation.x = 3.14;
    useEffect(() => {
        const interval = setInterval(() => {
            gltf.scene.rotation.x += 0.002;
            gltf.scene.rotation.y += 0.002;
        },50);
        return () => clearInterval(interval);
    },[])
    return <primitive object={gltf.scene} />
}
