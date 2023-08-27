import { useControls , folder } from "leva"
import { memo , useMemo } from "react"
import { useTexture } from "@react-three/drei"
import { useLoader } from "@react-three/fiber"
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader"

import constants from "@/app/lib/three/constants"

const Monitor = () => {

    const group = useLoader(FBXLoader, constants.monitor.meshPath)

    const plasticMaps = useTexture(constants.monitor.plasticMaps)
    const glassMaps = useTexture(constants.monitor.glassMaps)

    const plasticSettings = useControls({
        monitorPlastic: folder(constants.monitor.materialSettings.plastic, { collapsed: true })
    })
    const glassSettings = useControls({
        monitorGlass: folder(constants.monitor.materialSettings.glass, { collapsed : true})
    })

    const mesh = useMemo(
        () => {
            if (!group) return null
            return group?.children[0] || null
        } , [group]
    )

    const plasticProps = useMemo(
        () => {
            if (!mesh) return 
            const id = mesh.material.findIndex(m => m.name.includes('plastic'))
            return {
                attach: `material-${id}`,
                ...constants.monitor.mapsSettings.plastic,
                ...plasticMaps
            }
        } , [mesh, plasticMaps]
    )

    const glassProps = useMemo(
        () => {
            if (!mesh) return
            const id = mesh.material.findIndex(m => m.name.includes('glass'))
            return {
                attach: `material-${id}`,
                ...constants.monitor.mapsSettings.glass,
                ...glassMaps
            }
        } , [mesh, glassMaps]
    )


    return (
        <mesh 
            rotation={mesh.rotation}
            castShadow
        >
            <bufferGeometry attach="geometry" {...mesh.geometry}/>
            <meshPhysicalMaterial
                {...plasticProps}
                {...plasticSettings}
            />
            <meshPhysicalMaterial
                {...glassProps}
                {...glassSettings}
                opacity={glassSettings.transmission <= 0}
            />
        </mesh>
    )
}

export default memo(Monitor)