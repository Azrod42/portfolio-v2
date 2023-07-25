import React from "react";
import * as THREE from "@react-three/fiber";

function Floor(props: any) {
    return (
        <mesh {...props} recieveShadow>
            <boxGeometry args={[20,1,10]} />
            <meshPhysicalMaterial color='#FFAE00' />
        </mesh>
    );
}

export default Floor;

