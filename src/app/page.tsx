'use client'
import styles from './page.module.css'
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Floor from "@/app/(components)/Floor/Floor";
import React, {MutableRefObject, useEffect, useRef, useState} from "react";
import './style.css'
import {Center, Image, OrbitControls, Text, Gltf} from "@react-three/drei";
import { PerspectiveCamera, PresentationControls } from '@react-three/drei'
import Overlay from "@/app/(components)/react/overlay/overlay";
import img from '../../public/profilePicture.webp'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {Ship} from "@/app/(components)/ship/ship";
import {Moon} from "@/app/(components)/moon/moon";
import {Asteroid1} from "@/app/(components)/asteroid/asteroid1";
import {Asteroid2} from "@/app/(components)/asteroid/asteroid2";
import {Asteroid3} from "@/app/(components)/asteroid/asteroid3";


export default function Home() {
    //INIT UTILS-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    const [loadDone, setLoadDone] = useState<boolean>(false);
    const [btnStart, setBtnStart] = useState<boolean>(false);
    // const loader = new GLTFLoader();
    //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

    //CAMERA SETUP-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    const refCam:  MutableRefObject<any> = useRef();
    const camDefaultPos: THREE.Vector3 = new THREE.Vector3(0, 0, 30);
    const camDefaultRot: THREE.Euler = new THREE.Euler(0, -3.2, 0);
    // const camDefaultRot: THREE.Euler = new THREE.Euler(0, -1.6, 0);
    //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

    //HANDLE SCROLL FUNCTION-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    const refScroll: MutableRefObject<any> = useRef() //Scroll ref (main)
    function handle() {
        console.log(window.scrollY)
    }
    //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

    //ONCE USE EFFECT HANDLE SCROLL-=-=-=-=-=-=-=-=-=-=-=-=
    useEffect(() => {
        setTimeout(() => {
            refScroll.current.style.height = '100px';
            setLoadDone(true);
        },400);
        window.addEventListener("scroll", handle);
        return () => {
            window.removeEventListener("scroll", handle);
        }
    }, []); // handle scroll
    //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-


    //START BUTTON TRIGGER ANIMATION-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    const [animDone, setAnimDone] = useState<boolean>(false);
    function onClickStart() {
        setAnimDone(true);
        setBtnStart(true);
        const interval = setInterval(() => {

            console.log(refCam.current.rotation.y)
            //rotation Y
            if (refCam.current.rotation.y < -2.1)
                refCam.current.rotation.y += 0.012;
            else if (refCam.current.rotation.y < -1.6)
                refCam.current.rotation.y += 0.010;
            else if (refCam.current.rotation.y < 0)
                refCam.current.rotation.y += 0.012;



            //fov
            if (refCam.current.fov < 90)
                refCam.current.fov += 1;

            //translation
            if (refCam.current.position.z > 10) {
                // console.log(refCam.current.position.z)
                if (refCam.current.position.z < 20 && refCam.current.position.z > 15)
                    refCam.current.position.z -= 0.15
                else if (refCam.current.position.z < 10)
                    refCam.current.position.z -= 0.2;
                    else
                    refCam.current.position.z -= 0.05;
            }

            //rotation Z
            if (refCam.current.rotation.z < 0.9 && refCam.current.position.z > 20)
                refCam.current.rotation.z += 0.005;
            if (refCam.current.rotation.z > 0 && refCam.current.position.z < 20)
                refCam.current.rotation.z -= 0.01       ;


            if (refCam.current.rotation.y >= 0 && refCam.current.position.z <= 10 && refCam.current.rotation.z <= 0 ) {
                refCam.current.rotation.y = 0;
                refCam.current.rotation.z = 0;
                refCam.current.position.z = 10;
                refScroll.current.style.height = '10000px';
                clearInterval(interval);
            }
        }, 16);

        return () => clearInterval(interval);
    } // animation setup
    //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

    //IMAGE PROFILE PICTURE -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    const refImage: React.MutableRefObject<any> = useRef();
    useEffect(() => {
        if (loadDone) {
            refImage.current.position.x = -4.5;
            refImage.current.position.y = -1;
            refImage.current.position.z = 54.2;
            refImage.current.rotation.y = 3.10;
            refImage.current.scale.x = 22
            refImage.current.scale.y = 22
            refImage.current.scale.z = 22
        }
    },[loadDone]); // image position
    //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

    return (
        <main className={styles.main} ref={refScroll}>
            <div className={styles.scene} id='canvas'>
                <Canvas shadows className={styles.canvas} >
                    <PerspectiveCamera makeDefault position={camDefaultPos} rotation={camDefaultRot} ref={refCam}/>
                    {/*<pointLight position={[0, 5, 0]} />*/}
                      <Floor position={[0, -2, 0]} rotate={[0, 0, 0]}/>
                      {/*<Floor position={[0, -7, 40]} rotate={[0, 0, 0]}/>*/}
                      <ambientLight />
                      {/*<OrbitControls />*/}
                    <Text color="white" position={[0, 3.4, 40]} rotation={[0, 3.14, 0]} scale={[0.5, 0.5, 0.5]}>Tom Sorabella</Text>
                    <Text color="white" position={[0.3, 2.7, 40]} rotation={[0, 3.14, 0]} scale={[0.3, 0.3, 0.3]}>Student @ 42 Nice</Text>
                    <Text color="white" position={[-0.12, 2.45, 40]} rotation={[0, 3.14, 0]} scale={[0.17, 0.17, 0.17]}>Passionate about code, especially webdev !</Text>
                    <Text color="white" position={[15, 0.4, 15]} rotation={[0,- 1.6, 0]} scale={[0.5, 0.5, 0.5]}>HTML</Text>
                    <Text color="white" position={[15, -1.4, 27]} rotation={[0,- 1.6, 0]} scale={[0.5, 0.5, 0.5]}>CSS</Text>
                    <Text color="white" position={[15, 1.4, 13]} rotation={[0,- 1.6, 0]} scale={[0.5, 0.5, 0.5]}>JavaScript</Text>
                    <Text color="white" position={[15, -2.4, 25]} rotation={[0,- 1.6, 0]} scale={[0.5, 0.5, 0.5]}>TypeScript</Text>
                    <Text color="white" position={[15, 0.4, 22]} rotation={[0,- 1.6, 0]} scale={[0.5, 0.5, 0.5]}>C++</Text>
                    <Text color="white" position={[15, 1.4, 20]} rotation={[0,- 1.6, 0]} scale={[0.5, 0.5, 0.5]}>C</Text>
                    <Text color="white" position={[15, -2.4, 18]} rotation={[0,- 1.6, 0]} scale={[0.5, 0.5, 0.5]}>Docker</Text>
                    <Text color="white" position={[15, -1.4, 17]} rotation={[0,- 1.6, 0]} scale={[0.5, 0.5, 0.5]}>Shell</Text>
                    <Text color="white" position={[15, 0.4, 14]} rotation={[0,- 1.6, 0]} scale={[0.5, 0.5, 0.5]}>Figma</Text>
                    <Text color="white" position={[15, 1.4, 16]} rotation={[0,- 1.6, 0]} scale={[0.5, 0.5, 0.5]}>Git</Text>
                    <Text color="white" position={[15, -3.4, 13]} rotation={[0,- 1.6, 0]} scale={[0.5, 0.5, 0.5]}>React</Text>
                    <Text color="white" position={[15, -2.4, 12]} rotation={[0,- 1.6, 0]} scale={[0.5, 0.5, 0.5]}>Next.js</Text>
                    <Text color="white" position={[15, 1.4, 11]} rotation={[0,- 1.6, 0]} scale={[0.5, 0.5, 0.5]}>Node</Text>
                    <Text color="white" position={[15, -1.4, 22]} rotation={[0,- 1.6, 0]} scale={[0.5, 0.5, 0.5]}>Nest.js</Text>
                    <Text color="white" position={[15, -0.4, 20]} rotation={[0,- 1.6, 0]} scale={[0.5, 0.5, 0.5]}>Postman</Text>
                    <Text color="white" position={[15, 2.4, 25]} rotation={[0,- 1.6, 0]} scale={[0.5, 0.5, 0.5]}>PostgresSQL</Text>

                    <Image transparent ref={refImage} url={img.src} />
                    {!btnStart ? <Ship /> : <></>}
                    <Moon />
                    <Asteroid1 />
                    <Asteroid2 />
                    <Asteroid3 />
                </Canvas>
            </div>
            <Overlay />
            <div className={styles.pageOverlay}>
                {!btnStart ?<button onClick={onClickStart} className={styles.btnStart}>Start</button>: <></>}
            </div>
        </main>
  )
}
