import { forwardRef, memo, useCallback, useEffect } from "react"
import { useThree } from "@react-three/fiber"

const TAN_FOV = 0.4663076581549986
const HEIGHT = 932

const Camera = forwardRef(({
    useDefault,
    aspect,
    name, 
    ...props
}, ref) => {
    const set = useThree(state => state.set)
    const invalidate = useThree(state => state.invalidate)
    const size = useThree(state => state.size)

    useEffect(
        () => {
            ref.current.aspect = aspect
            ref.current.updateProjectionMatrix()
            // ref.current.updateMatrixWorld()
            // invalidate()
        } , [ref, aspect, invalidate]
    )

    useEffect(() => {
        if (!useDefault) return
        // ref.current.fov = (360 / Math.PI) * Math.atan(TAN_FOV * (window.innerHeight / HEIGHT ))
        // ref.current.updateProjectionMatrix()
        // invalidate()
        // ref.current.updateMatrixWorld().
    } , [size, useDefault, ref, invalidate])

    useEffect(
        () =>  {
            if (useDefault) {
                set({ camera : ref.current })
                ref.current.name = name || ''
                ref.current.near = 0.001
            }
        } , [set, ref, useDefault, name]
    )
    return (
        <perspectiveCamera
            ref={ref}
            {...props}
        />
    )
})

Camera.displayName = "Camera"

export default memo(Camera)