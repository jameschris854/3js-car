import React from "react"
import {usePlane} from '@react-three/cannon'

const Plane = (props) => {
    
    const [ref,api] = usePlane(() => ({ type:'Static' ,material: 'ground',mass:10000, ...props}))

    return (
        <group ref={ref} api={api} >
            <mesh receiveShadow>
                <planeGeometry args={[1000,1000]} />
                <meshStandardMaterial color="red" />
            </mesh>
        </group>
    )
}

export default Plane