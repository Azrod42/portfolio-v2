'use client'
import styles from './page.module.css'
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Floor from "@/app/(components)/Floor/Floor";
import { OrbitControls } from "@react-three/drei";
import {MutableRefObject, useRef} from "react";




export default function Home() {
    const refCanvas:  MutableRefObject<any> = useRef();
    let scene = new THREE.Scene();

    let camera: any;
    let renderer: any;


    if (typeof window !== "undefined") {
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({canvas: refCanvas.current})
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.position.set(0, 9, 10)
        renderer.render(scene, camera);
    }

    return (
    <main className={styles.main}>
      <div className={styles.scene}>
          <Canvas shadows className={styles.canvas} camera={camera}>
              <pointLight position={[0, 5, 0]} />
              <Floor position={[0, -1, 0]} rotate={[0, 90, 0]}/>
              <ambientLight />
              <OrbitControls />
          </Canvas>
      </div>
    </main>
  )
}
