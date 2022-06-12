import { useRaycastVehicle } from "@react-three/cannon";
import React, { useRef } from "react";
import Chassis from "./Chassis";
import Wheel from "./Wheele";
import {useFrame,Camera} from '@react-three/fiber'
import { useControls } from "../utils/controls";

const Vehicle = ({ radius = 0.4, height = -0.04, width = 1.2 ,force=2000,steer=0.65,maxBrake=1,...props}) => {
    // radius = 0.7, width = 1.2, height = -0.04, front = 1.3, back = -1.15, steer = 0.75, force = 2000, maxBrake = 1e5, ...props
    const chassis = useRef()
    const wheel1 = useRef()
    const wheel2 = useRef()
    const wheel3 = useRef()
    const wheel4 = useRef()
    const camera = useRef()
    const controls = useControls()

    const wheelInfos = {
        radius,
        directionLocal: [0, -1, 0],
        suspensionStiffness: 30,
        suspensionRestLength: 0.3,
        maxSuspensionForce: 1e4,
        maxSuspensionTravel: 0.3,
        dampingRelaxation: 10,
        dampingCompression: 4.4,
        axleLocal: [-1, 0, 0],
        chassisConnectionPointLocal: [1, 0, 1],
        useCustomSlidingRotationalSpeed: true,
        customSlidingRotationalSpeed: -30,
        frictionSlip: 2

    }

    const wheelInfo1 = { ...wheelInfos, isFrontWheel: true, chassisConnectionPointLocal: [-width / 2, height, 1] }
    const wheelInfo2 = { ...wheelInfos, isFrontWheel: true, chassisConnectionPointLocal: [width / 2, height, 1] }
    const wheelInfo3 = { ...wheelInfos, isFrontWheel: false, chassisConnectionPointLocal: [-width / 2, height, -1] }
    const wheelInfo4 = { ...wheelInfos, isFrontWheel: false, chassisConnectionPointLocal: [width / 2, height, -1] }

    const [vehicle, api] = useRaycastVehicle(() => ({
        chassisBody: chassis,
        wheels: [wheel1, wheel2, wheel3, wheel4],
        wheelInfos: [wheelInfo1, wheelInfo2, wheelInfo3, wheelInfo4],
        indexForwardAxis: 2,
        indexRightAxis: 0,
        indexUpAxis: 1
    }))

    useFrame(() => {
        const { forward, backward, left, right, brake, reset } = controls.current
        for (let e = 2; e < 4; e++) api.applyEngineForce(forward || backward ? force * (forward && !backward ? -1 : 1) : 0, 2)
        for (let e = 2; e < 4; e++) api.applyEngineForce(forward || backward ? force * (forward && !backward ? -1 : 1) : 0, 3)
        for (let s = 0; s < 2; s++) api.setSteeringValue(left || right ? steer * (left && !right ? 1 : -1) : 0, s)
        for (let b = 2; b < 4; b++) api.setBrake(brake ? maxBrake : 0, b)
        if (reset) {
          chassis.current.api.position.set(0, 2, 0)
          chassis.current.api.velocity.set(0, 0, 0)
          chassis.current.api.angularVelocity.set(0, 0.5, 0)
          chassis.current.api.rotation.set(0, -Math.PI / 4, 0)
        }
      })

    return (
        <group ref={vehicle}>
                <Chassis ref={chassis} rotation={props.rotation} position={props.position} angularVelocity={props.angularVelocity} />
                <Wheel ref={wheel1} radius={radius} leftSide />
                <Wheel ref={wheel2} radius={radius} />
                <Wheel ref={wheel3} radius={radius} leftSide />
                <Wheel ref={wheel4} radius={radius} />
        </group>
    )
}

export default Vehicle;