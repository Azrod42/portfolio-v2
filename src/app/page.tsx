'use client'
import styles from './page.module.css'
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Floor from "@/app/(components)/Floor/Floor";
import {MutableRefObject, useEffect, useRef, useState} from "react";
import './style.css'
import {OrbitControls} from "@react-three/drei";
import {PerspectiveCamera} from "three";

export default function Home() {
    const refCanvas:  MutableRefObject<any> = useRef();
    const refMain:  MutableRefObject<any> = useRef();
    const refDivScene:  MutableRefObject<any> = useRef();

    const [isScrollOff, setIsScrollOff] = useState<boolean>(true);

    let scene = new THREE.Scene();

    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.rotation.y = 3.1;
    let renderer = new THREE.WebGLRenderer({canvas: refCanvas.current})
    let geometry = new THREE.BoxGeometry( 1, 1, 1 );
    let material = new THREE.MeshBasicMaterial( { color: 0x444444 } );
    let cube = new THREE.Mesh( geometry, material );
    let cube2 = new THREE.Mesh( geometry, material );
    cube2.position.set(0, 0 , 20)
    camera.position.set(0, (-8 * 0), 10);
    scene.add( cube );
    scene.add( cube2 );
    scene.add(camera)
    renderer.render(scene, camera);


    if (typeof window !== "undefined") {
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        // camera.position.set(0, 0, 10)
        // camera.rotation.y = 3.1;
        // renderer.render(scene, gound);
    }
    function handle() {
        console.log(window.scrollY, camera.position)
        const pct = (window.scrollY * 100/ 1200)/100;
        camera.position.set(0, 0, 10);
        renderer.render(scene, camera);
    }

    useEffect(() => {
        // refMain.current.style.position = isScrollOff ? 'fixed' : 'relative';
        // refMain.current.style.height = isScrollOff ? '100%' : '2000px';
    }, [isScrollOff])

        useEffect(() => {

        //add eventlistener to window
        window.addEventListener("scroll", handle);
        refDivScene.current.appendChild(renderer.domElement);
        camera.position.set(0, (-8 * 0), 10);
        renderer.render(scene, camera);



            // remove event on unmount to prevent a memory leak with the cleanup
        setTimeout(() => {
            const interval = setInterval(() => {
                camera.rotation.y -= 0.03;
                renderer.render(scene, camera);
                if (camera.rotation.y <= 0) {
                    camera.rotation.y = 0;
                    refMain.current.classList.remove("scrollOff");
                    setIsScrollOff(false);
                    clearInterval(interval);
                }
            }, 15);
        }, 4000); //Timeout intro
        return () => {
            window.removeEventListener("scroll", handle);
            refMain.current.style.overflowY = 'scroll'
        }
    }, []);

    return (
        <main className={styles.main} ref={refMain}>
            <div className={styles.scene} ref={refDivScene}>
                {/*<Canvas shadows className={styles.canvas}  >*/}
              {/*    <pointLight position={[0, 5, 0]} />*/}
              {/*    <Floor position={[0, -1, 0]} rotate={[0, 90, 0]}/>*/}
              {/*    <Floor position={[0, -11, 0]} rotate={[0, 90, 0]}/>*/}
              {/*    <Floor position={[0, -11, 20]} rotate={[0, 90, 0]}/>*/}

              {/*    <ambientLight />*/}
              {/*    /!*<OrbitControls />*!/*/}
              {/*</Canvas>*/}
          </div>
        </main>
  )
}
