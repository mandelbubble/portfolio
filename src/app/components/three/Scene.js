import { folder, useControls } from "leva";
import { memo , useEffect, useRef, useState } from "react"
import tunnel from "tunnel-rat";

import Camera from "./Camera";
import Environment from "./Environment";
import Html from "./html";
import Meshes from "./meshes";

import constants from "@/app/lib/three/constants";

const ui = tunnel()

const Scene = () => {

    const camera = useRef()
    const [aspect, setAspect] = useState()

    const { cameraPosition } = useControls({
        main: folder({
            cameraPosition : constants.camera.position
        })
    })

    useEffect(
        () => {
            setAspect(window.innerWidth / window.innerHeight)
            const listener = () => setAspect(window.innerWidth/window.innerHeight)
            window.addEventListener('resize', listener)

            return (() => {
                window.removeEventListener('resize', listener)
            })
        } , []
    )

return (
        <>
            <Html/> 
            <Environment/>
            <Meshes/>
            <Camera
                ref={camera}
                aspect={aspect}
                position={cameraPosition}
                name='default-camera'
                useDefault
            />
        </>
    )
}
export default memo(Scene)