'use client'
import styles from './page.module.css'
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Floor from "@/app/(components)/Floor/Floor";
import React, {MutableRefObject, useEffect, useRef, useState} from "react";
import './style.css'
import {Center, OrbitControls, Text} from "@react-three/drei";
import { PerspectiveCamera, PresentationControls } from '@react-three/drei'
import Overlay from "@/app/(components)/react/overlay/overlay";

export default function Home() {

    //CAMERA SETUP
    const refCam:  MutableRefObject<any> = useRef();
    const camDefaultPos: THREE.Vector3 = new THREE.Vector3(0, 0, 30);
    const camDefaultRot: THREE.Euler = new THREE.Euler(0, -3.2, 0);

    //HANDLE SCROLL FUNCTION
    const refScroll: MutableRefObject<any> = useRef() //Scroll ref (main)
    function handle() {
        console.log(window.scrollY)
    }



    //ONCE USE EFFECT HANDLE SCROLL
    useEffect(() => {
        setTimeout(() => {
            refScroll.current.style.height = '100px';
            console.log(refCam.current)

        },400);
        window.addEventListener("scroll", handle);
        return () => {
            window.removeEventListener("scroll", handle);
        }
    }, []);


    //START BUTTON TRIGGER ANIMATION
    const [animDone, setAnimDone] = useState<boolean>(false);
    function onClickStart() {
        setAnimDone(true);
        const interval = setInterval(() => {

            //rotation Y
            if (refCam.current.rotation.y < 0)
                refCam.current.rotation.y += 0.025;

            //fov
            if (refCam.current.fov < 90)
                refCam.current.fov += 1;

            //translation
            if (refCam.current.position.z > 10)
                refCam.current.position.z -= 0.1;

            //rotation Z
            if (refCam.current.rotation.z < 0.9 && refCam.current.position.z > 20)
                refCam.current.rotation.z += 0.01;
            if (refCam.current.rotation.z > 0 && refCam.current.position.z < 20)
                refCam.current.rotation.z -= 0.01;
            console.log(refCam.current.rotation.z);


            if (refCam.current.rotation.y >= 0 && refCam.current.position.z <= 10 && refCam.current.rotation.z <= 0) {
                refCam.current.rotation.y = 0;
                refCam.current.position.z = 10;
                refScroll.current.style.height = '10000px';
                clearInterval(interval);
            }
        }, 16);

        return () => clearInterval(interval);
    }

    return (
        <main className={styles.main} ref={refScroll}>
            <div className={styles.scene} id='canvas'>
                <Canvas shadows className={styles.canvas} >
                    <PerspectiveCamera makeDefault position={camDefaultPos} rotation={camDefaultRot} ref={refCam}/>
                    {/*<pointLight position={[0, 5, 0]} />*/}
                      <Floor position={[0, -2, 0]} rotate={[0, 0, 0]}/>
                      <Floor position={[0, -2, 40]} rotate={[0, 0, 0]}/>
                      <ambientLight />
                      {/*<OrbitControls />*/}
                    <Text color="white" position={[0, 2, 40]} rotation={[0, 3, 0]}>hello world!</Text>
                </Canvas>
            </div>
            <Overlay />
            <div className={styles.pageOverlay}>
                {!animDone ?<button onClick={onClickStart}>Clic zebi</button>: <></>}
            </div>
        </main>
  )
}
