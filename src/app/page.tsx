'use client'
import styles from './page.module.css'
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Floor from "@/app/(components)/Floor/Floor";
import {MutableRefObject, useEffect, useRef, useState} from "react";
import './style.css'
import {OrbitControls} from "@react-three/drei";
import { PerspectiveCamera, PresentationControls } from '@react-three/drei'

export default function Home() {

    //CAMERA SETUP
    const refCam:  MutableRefObject<any> = useRef();
    const camDefaultPos: THREE.Vector3 = new THREE.Vector3(0, 0, 10);

    //HANDLE SCROLL FUNCTION
    function handle() {
        console.log(window.scrollY)
    }



    //ONCE USE EFFECT HANDLE SCROLL
    useEffect(() => {
        setTimeout(() => {
            refCam.current.fov = 90;
            console.log(refCam.current)

        },1000);
        window.addEventListener("scroll", handle);
            const timeout = setTimeout(() => {
                const interval = setInterval(() => {
                    refCam.current.rotation.y += 0.05;
                    console.log(refCam.current.rotation.y);
                    if (refCam.current.rotation.y >= 0) {
                        refCam.current.rotation.y = 0
                        clearInterval(interval);
                    }
                }, 20);
            }, 4000); //Timeout intro

        return () => {
            clearTimeout(timeout);
            window.removeEventListener("scroll", handle);
        }
    }, []);


    //
    // useEffect(() => {
    //
    //     //add eventlistener to window
    //     window.addEventListener("scroll", handle);
    //     refDivScene.current.appendChild(renderer.domElement);
    //     camera.position.set(0, (-8 * 0), 10);
    //     renderer.render(scene, camera);
    //
    //         // remove event on unmount to prevent a memory leak with the cleanup
    //     setTimeout(() => {
    //         const interval = setInterval(() => {
    //             camera.rotation.y -= 0.03;
    //             renderer.render(scene, camera);
    //             if (camera.rotation.y <= 0) {
    //                 camera.rotation.y = 0;
    //                 refMain.current.classList.remove("scrollOff");
    //                 setIsScrollOff(false);
    //                 clearInterval(interval);
    //             }
    //         }, 15);
    //     }, 4000); //Timeout intro
    //     return () => {
    //         window.removeEventListener("scroll", handle);
    //         refMain.current.style.overflowY = 'scroll'
    //     }
    // }, []);
    const props = {position: [0, 0, 10]};
    return (
        <main className={styles.main}>
            <div className={styles.scene} id='canvas'>
                <Canvas shadows className={styles.canvas} >
                    <PerspectiveCamera makeDefault position={camDefaultPos} rotation={[0, -3, 0]} ref={refCam}/>
                    {/*<pointLight position={[0, 5, 0]} />*/}
                      <Floor position={[0, -2, 0]} rotate={[0, 90, 0]}/>
                      <Floor position={[0, -2, 20]} rotate={[0, 90, 0]}/>
                      <ambientLight />
                      {/*<OrbitControls />*/}
                </Canvas>
          </div>
        </main>
  )
}
