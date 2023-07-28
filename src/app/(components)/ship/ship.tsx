'use client'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {useEffect} from "react";
export function Ship() {
    const gltf = useLoader(GLTFLoader, '3dModel/the-saturn-orbiter/source/model.gltf');
    gltf.scene.position.x = 3;
    gltf.scene.position.y = 5;
    gltf.scene.position.z = 60;
    gltf.scene.rotation.x = -2.2;

    useEffect(() => {
        const interval = setInterval(() => {
            gltf.scene.position.y -= 0.05;
            gltf.scene.position.z -= 0.05;
            gltf.scene.rotation.y += 0.005;
                },25);

        return () => clearInterval(interval);
    },[])
    return <primitive object={gltf.scene} />
}
