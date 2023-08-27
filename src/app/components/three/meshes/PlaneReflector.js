import { folder, useControls } from "leva"
import { memo, useEffect, useMemo } from "react"
import { MeshReflectorMaterial, useTexture } from "@react-three/drei"
import { NearestFilter, RepeatWrapping } from "three"

import constants from "@/app/lib/three/constants"

const settings = constants.planeReflector

const PlaneReflector = () => {

    const textures = useTexture(settings.maps)

    // useEffect(
    //     () => {
    //         if (!textures) return


    //     , [textures]
    // )
    
        const controls = useControls({
            planeReflector : folder(settings.controls, { collapsed: true})
        })

    if (textures) {
            Object.keys(textures).forEach(
                (texture, i) => {
                    textures[texture].wrapS = RepeatWrapping
                    textures[texture].wrapT = RepeatWrapping
                    textures[texture].magFilter = NearestFilter
                    textures[texture].repeat.set(10, 10)
                }
            )
        }
    



    return (
        <mesh rotation-x={-Math.PI/2}>
            <planeGeometry args={settings.scale}/>
            <MeshReflectorMaterial
                {...controls}
                {...textures}
                // color={'#ff00ff'}
                // envMapIntensity={null}
                resolution={512}
            />
        </mesh>
    )
}

export default memo(PlaneReflector)

