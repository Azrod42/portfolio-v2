'use client'
import styles from './page.module.css'
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Floor from "@/app/(components)/Floor/Floor";
import { OrbitControls } from "@react-three/drei";
import {MutableRefObject, useEffect, useRef} from "react";
import {set} from "zod";




export default function Home() {
    const refCanvas:  MutableRefObject<any> = useRef();
    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({canvas: refCanvas.current})
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.set(0, 9, 10)
    renderer.render(scene, camera);
    useEffect(() => {
        setTimeout(() => {
            camera.fov = 120;
            renderer.render(scene, camera);
        }, 2000)
    })

    return (
    <main className={styles.main}>
      <div className={styles.scene}>
          <Canvas shadows className={styles.canvas} scene={scene} camera={camera}>
              <pointLight position={[0, 5, 0]} />
              <Floor position={[0, -1, 0]} rotate={[0, 90, 0]}/>
              <ambientLight />
              <OrbitControls />
          </Canvas>
      </div>
    </main>
  )
}
