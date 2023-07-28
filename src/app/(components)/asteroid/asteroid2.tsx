'use client'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {useEffect} from "react";
export function Asteroid2() {
    const gltf = useLoader(GLTFLoader, '3dModel/asteroid_2.glb');
    gltf.scene.position.x = -12;
    gltf.scene.position.y = 2;
    gltf.scene.position.z = 54;
    gltf.scene.scale.x = 0.14;
    gltf.scene.scale.y = 0.14;
    gltf.scene.scale.z = 0.14;
    gltf.scene.rotation.x = 3.14;


    useEffect(() => {
        const interval = setInterval(() => {
            gltf.scene.rotation.x += 0.001;
            gltf.scene.rotation.y += 0.001;
        },50);
        return () => clearInterval(interval);
    },[])
    return <primitive object={gltf.scene} />
}
