import {MutableRefObject, useRef} from "react";
import {useFrame, Vector3} from "@react-three/fiber";
import * as THREE from "three";
import { Image } from '@react-three/drei'


export function Foo(pos: any) {
    const ref:  MutableRefObject<any> = useRef()
    useFrame(() => {
        if (ref.current) {
            ref.current.material.zoom = 1 // 1 and higher
            ref.current.material.grayscale = 1 // between 0 and 1
            ref.current.position.x = pos.x;
            ref.current.position.y = pos.y;
            ref.current.position.z = pos.z;
            console.log(ref.current);
        }
        // ref.current.material.color.set(...) // mix-in color
    })
    return
}
