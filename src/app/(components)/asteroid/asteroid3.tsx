'use client'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {useEffect} from "react";
export function Asteroid3() {
    const gltf = useLoader(GLTFLoader, '3dModel/asteroid_3.glb');
    gltf.scene.position.x = -25;
    gltf.scene.position.y = 6;
    gltf.scene.position.z = 64;
    gltf.scene.scale.x = 0.14;
    gltf.scene.scale.y = 0.14;
    gltf.scene.scale.z = 0.14;
    gltf.scene.rotation.x = 1.14;


    useEffect(() => {
        const interval = setInterval(() => {
            gltf.scene.rotation.x += 0.0015;
            gltf.scene.rotation.y += 0.0015;
        },50);
        return () => clearInterval(interval);
    },[])
    return <primitive object={gltf.scene} />
}
