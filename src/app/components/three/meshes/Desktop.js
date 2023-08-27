import { memo, useEffect, useMemo, useRef , useCallback, useState } from "react"
import { useSelector } from "react-redux"
import { useFBO } from "@react-three/drei"
import { createPortal, extend, useFrame, useThree } from "@react-three/fiber"
import { Scene , MathUtils, TextureLoader, Texture, CanvasTexture, Vector2 } from "three"

import Camera from "../Camera"

import { selectDesktopBlob } from "@/app/lib/redux/slices/three"
import threeConstants from '@/app/lib/three/constants'
import PerlinDithering from "@/app/lib/three/shaders/perlin-dithering/PerlinDithering"
import constants from "@/app/lib/windows/constants"

extend({ PerlinDithering })

const shaderSettings = threeConstants.screen.commandPromptShader

const Desktop = ({ onTextureUpdate }) => {

    const camera = useRef()
    const scene = useRef(new Scene())
    const [texture, setTexture] = useState(new Texture())
    const renderTarget = useFBO(constants.resolution.width, constants.resolution.height)
    const textureUrl = useSelector(selectDesktopBlob)
    const p5Texture = useRef(null)

    const get = useThree(state => state.get)

    const camPosition = useMemo(() => [0, 0, 5] , [])
    const perlinDitheringResolution = useMemo(() => new Vector2(shaderSettings.resolution.width, shaderSettings.resolution.height), [])

    useEffect(
        () => {
            const { gl } = get()
            gl.compile(scene.current, camera.current)
            const canvas = document.getElementById('command-prompt-sketch')
            p5Texture.current = new CanvasTexture(canvas)
        } , [get]
    )

    useFrame(({ gl }) => {
        if (!camera.current) return
        gl.setRenderTarget(renderTarget)
        gl.render(scene.current, camera.current)
        onTextureUpdate(renderTarget.texture)
        gl.setRenderTarget(null)
    })

    const planeArgs = useCallback((width, height, z) => {
        const scale = { width : 1 , height : 1}
        if (camera.current) {
            const cameraDist = camera.current.position.z - z
            const vFOV = MathUtils.degToRad( camera.current.fov )
            scale.height = 2 * Math.tan( vFOV / 2 ) * cameraDist
            scale.width = scale.height * camera.current.aspect;
            scale.height *= height / constants.resolution.height
            scale.width *= width / constants.resolution.width
        }
        return [scale.width, scale.height]
    }, [])

    const wallpaper = useMemo(
        () => planeArgs(constants.resolution.width, constants.resolution.height, 0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        , [planeArgs, camera.current]
    )

    const commandPrompt = useMemo(
        () => planeArgs(shaderSettings.resolution.width, shaderSettings.resolution.height, 1)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        , [planeArgs, camera.current]
    )

    useEffect(
        () => {
            if (!textureUrl) return
            const loader = new TextureLoader()
            loader.load(textureUrl, image => {
                setTexture(t => {
                    if (t) t.dispose()
                    return image
                })
            })
        },  [textureUrl]
    )
    
    return createPortal(
        <>
            <Camera 
                ref={camera}
                aspect={constants.resolution.width / constants.resolution.height}
                position={camPosition}    
            />
            <group visible={textureUrl}>
                <mesh>
                    <planeGeometry args={wallpaper}/>
                    <meshBasicMaterial map={texture}/>
                </mesh> 
                <mesh position-y={-.18} position-z={1}>
                    <planeGeometry args={commandPrompt}/>
                    <perlinDithering
                        uTexture={p5Texture.current}
                        resolution={perlinDitheringResolution}
                    />
                </mesh>
            </group>
        </> , scene.current
    )
}

export default memo(Desktop)