import { useBox } from "@react-three/cannon";
import React, { forwardRef } from "react";
import { PerspectiveCamera } from "@react-three/drei"

const Chassis = forwardRef(({args = [1.3, 0.1, 4],mass=500,...props},ref) => {

    const [,api] = useBox(() => ({mass,args,allowSleep:false,...props,}),ref)

    return (
        <mesh ref={ref} api={api} >
            <mesh position={[0,0.3,0]}>
                <boxGeometry args={args}/>
                <meshMatcapMaterial />
            </mesh>
            <PerspectiveCamera makeDefault position={[0,1,-6]} rotation={[0.,3.1,0]}/>
        </mesh>
    )
})

export default Chassis