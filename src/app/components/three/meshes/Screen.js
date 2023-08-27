import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { useLoader } from "@react-three/fiber"
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader"

import Desktop from "./Desktop"

import constants from "@/app/lib/three/constants"
import { showComputer } from "@/app/lib/redux/slices/three"

const Screen = () => {
    const group = useLoader(FBXLoader, constants.screen.meshPath)
    const [texture, setTexture] = useState(null)
    const [firstRender, setFirstRender] = useState(false)
   
    const dispatch = useDispatch()

    const mesh = useMemo(
        () => {
            if (!group) return null
            const mesh = group?.children[0] || null
            if (mesh) {
                mesh.position.divide(mesh.scale)
                mesh.scale.setScalar(1)
            }
            return mesh
        } , [group]
    )

    const onTextureUpdate = useCallback(
        newTexture => {
            setTexture(texture => {
                if (texture) texture.dispose()
                return newTexture
            })
            setFirstRender(true)
        } , []
    )

    useEffect(
        () => {
            if (firstRender) {
               dispatch(showComputer()) 
            }  
        } , [firstRender, dispatch]
    )

    useEffect(
        () => {
            setFirstRender(true)
            return (
                () => {
                    setTexture((t) => {
                        t.dispose()
                        return null
                    })
                }
            )
        } , []
    )


    return (
        <>
            <mesh
                rotation={mesh.rotation}
                position={mesh.position}
                name="screen"
            >
                <bufferGeometry attach="geometry" {...mesh.geometry}/>
                <meshBasicMaterial map={texture}/>
            </mesh>
            <Desktop onTextureUpdate={onTextureUpdate}/>
        </>
    )
}

export default memo(Screen)