import { folder, useControls } from "leva"
import { bezier } from "@leva-ui/plugin-bezier"
import { memo, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { Box, Resize, useHelper, useScroll } from "@react-three/drei"
import { invalidate, useFrame, useThree } from "@react-three/fiber"
import { mapLinear } from "three/src/math/MathUtils"

import Monitor from "./Monitor"
import Screen from "./Screen"
import PlaneReflector from "./PlaneReflector"

import { selectComputerIsVisible } from "@/app/lib/redux/slices/three"
import { Box3, BoxHelper, MathUtils, Vector3 } from "three"


const start = [0, -0.07, 1.071]


const Meshes = () => {

    const isVisible = useSelector(selectComputerIsVisible)
    const ref = useRef()
    const camera = useThree(state => state.camera)
    const size = useThree(state => state.size)
    const get = useThree(state => state.get)
    const scroll = useScroll()
    const bbRef = useRef()
    const [state, setState] = useState({
        start : [0,0,0],
        end : [0,0,0],
        isMounted: false,
    })
    // useHelper(ref, BoxHelper, 'cyan')

    // {"end":[0.3757000000000009,0,0.5855999999999995]}
    const controls = useControls(
       { scroll : folder({
            rotation: -0.25,
            c1 : bezier([0.45,0,0.55,1]),
            c2 : bezier([0.65,0.05,0.36,1]),
            c3 : bezier([0.4,0,0.2,1]),
       } , { collapsed : true })}
    )

    useEffect(
        () => { setState((state) => ({...state, isMounted : true})) } , []
    )

    useEffect(
        () => {
            if (camera.name !== 'default-camera' || !state.isMounted || !ref.current) return

            const rotation = ref.current.rotation.y
            ref.current.rotation.y = 0
            
            if (!bbRef.current) {
                bbRef.current = new Box3().setFromObject(ref.current)
            }
            const boundingScale = new Vector3().copy(bbRef.current.max).sub(bbRef.current.min)
            const boundingRatio = boundingScale.y / boundingScale.x

            ref.current.rotation.y = rotation

            const vFov = camera.fov * Math.PI / 180

            const desiredStartWidth = 0.8 * size.width
            const expectedStartHeight = desiredStartWidth * boundingRatio
            const startDist = (boundingScale.y * size.height ) / (2 * expectedStartHeight * Math.tan(vFov / 2))
            const zStart = -startDist - 0.5 * boundingScale.z
            const start = [0, 0, zStart]

            const sizeGuide = document.getElementById('guide-2')
            const guideWidth = sizeGuide.getBoundingClientRect().width

            const desiredEndWidth = screen.width >= 1024 ? 0.8 * guideWidth : 0.4 * size.width
            const expectedEndHeight = desiredEndWidth * boundingRatio
            const endDist = (boundingScale.y * size.height) / (2 * expectedEndHeight * Math.tan(vFov / 2))
            const zEnd = -endDist - 0.5 * boundingScale.z

            const visibleHeight = - 2 * Math.tan(vFov / 2) * zEnd
            const visibleWidth = visibleHeight * size.width / size.height

            const x = screen.width >= 1024
                ? visibleWidth / 2 - boundingScale.x * 1.1 
                :  visibleWidth / 2 + boundingScale.x
            const end = [x, 0, zEnd]

            setState(state => ({
                ...state,
                start,
                end,
            }))

            invalidate()
        } , [camera, get, size, state.isMounted]
    )

    console.log(state.start, ref.current)

    useFrame(
        () => {
            // console.log(scroll)
            const { c1, c2, c3 , rotation } = controls
            
            const r1 = scroll.range(0, 0.5)
            const r2 = scroll.range(0.3, 0.50)
            const r3 = scroll.range(0.2, 0.80)

            const curve1 = c1.evaluate(r1)
            const curve2 = c2.evaluate(r2)
            const curve3 = c3.evaluate(r3)
    
            ref.current.position.z = mapLinear(curve1, 0, 1, state.start[2], state.end[2])
            ref.current.rotation.y = mapLinear(curve2, 0, 1, 0, 2 * Math.PI + rotation)
            ref.current.position.x = mapLinear(curve3, 0, 1, state.start[0], state.end[0])
            
            // ref.current.position.y = mapLinear( r1, 0, 1, startY, endY )
            // computerRef.current.position.z = mapLinear( curve1, 0, 1, startZ, endZ )
            // computerRef.current.rotation.y = mapLinear( curve2, 0, 1, 0, 2 * Math.PI + rotation )
            // computerRef.current.position.x = mapLinear( curve3, 0, 1, startX, endX )   
        }
    )

    return (
        <group visible={isVisible}>
            <group visible={true}
                ref={ref} 
                // position-z={sta.te.start[2]}
                // position-z={state.start[2]}
                // position-y={state.start[1]}
                // position-x={state.start[0]}
                // position={[0, 0, -1.715450951875592]} 
                // rotation-y={controls.rotation}
            >
                <Monitor/>
                <Screen/>
            </group>

            {/* <mesh position-z={state.z} scale-x={1}>
                <planeGeometry/>
                <meshBasicMaterial/>
            </mesh> */}
            <PlaneReflector/>
        </group>
    )
}

export default memo(Meshes)