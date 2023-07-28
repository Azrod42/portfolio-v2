'use client'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {useEffect} from "react";
export function Moon() {
    const gltf = useLoader(GLTFLoader, '3dModel/moon/scene.gltf');
    gltf.scene.position.x = 45;
    gltf.scene.position.y = -10;
    gltf.scene.position.z = 120;
    gltf.scene.scale.x = 5;
    gltf.scene.scale.y = 5;
    gltf.scene.scale.z = 5;
    // gltf.scene.rotation.x = 3.14;
    console.log(gltf.scene)


    useEffect(() => {
        const interval = setInterval(() => {
            gltf.scene.position.x += 0.015
            if (gltf.scene.rotation.z < 3.14)
                gltf.scene.rotation.y += 0.0005;
            else
                gltf.scene.rotation.y = 0
        },30);
        return () => clearInterval(interval);
    },[])
    return <primitive object={gltf.scene} />
}
