import { folder, useControls } from "leva"
import { memo, useEffect } from "react"
import { useLoader, useThree } from "@react-three/fiber"
import { EquirectangularReflectionMapping } from "three"
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader"

import constants from "@/app/lib/three/constants"

const background = [constants.background]

const Environment = () => {

    const hdr = useLoader(RGBELoader, constants.hdrPath)

    const fog = useControls({
        fog: folder(constants.fog, { collapsed : true })
    })
    const directionalLight = useControls({
        directionalLight : folder(constants.directionalLight, { collapsed : true })
    })
    const ambientLight = useControls({
        ambientLight : folder(constants.ambientLight, { collapsed : true })
    })
    const pointLight = useControls({
        pointLight : folder(constants.pointLight, { collapsed : true })
    })

    hdr.mapping = EquirectangularReflectionMapping


    useEffect(
        () => {
            if (!hdr) return
            hdr.mapping = EquirectangularReflectionMapping
        } , [hdr]
    )




    return (
        <>
            <color 
                attach="background"
                args={background}
            />
            <fog attach="fog" {...fog}/>
            <directionalLight
                {...directionalLight}
                castShadow
            />
            <ambientLight
                {...ambientLight}
            />
            <pointLight
                {...pointLight}
                castShadow
            />
            <dataTexture attach="environment" {...hdr}/>
        </>
    )
}

export default memo(Environment)