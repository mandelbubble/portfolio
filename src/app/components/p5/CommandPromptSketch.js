"use client"

import { memo , useCallback, useMemo } from "react"
import { useDispatch } from "react-redux"
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation"

import { setCommandPromptSketchReady } from "@/app/lib/redux/slices/three"
import constants from "@/app/lib/three/constants"

const P5 = dynamic(() => import('react-p5')
    .then(mod => mod.default), { ssr: false })

const settings = constants.screen.commandPromptShader
const pixelSize = settings.gridSize

const CommandPromptSketch = () => {

    const dispatch = useDispatch()
    const searchParams = useSearchParams()

    const setup = useCallback(
        (p5, canvasParentRef) => {
            const canvas = p5
                .createCanvas(settings.resolution.width, settings.resolution.height)
                .parent(canvasParentRef)
            canvas.id('command-prompt-sketch')
            p5.textSize(pixelSize)
            p5.loadFont('/fonts/perfect_dos_vga_437/PerfectDOSVGA437Win.ttf', font => {
                dispatch(setCommandPromptSketchReady())
                const str = `hello·${searchParams.get('visitor')?.replace(" ", '·' ) || "world"}·`

                let i = 0;
                let k = 0;

                while (i < p5.height) {
                    let j = 0;
                    while (j < p5.width) {
                        p5.push();
                        p5.translate(j, i);
                        p5.fill(255);
                        const w = p5.textWidth(str[k])
                        // p5.textAlign(p5.CENTER, p5.CENTER)
                        p5.text(str[k], pixelSize / 2 - w/2, 8, pixelSize, pixelSize)
                        p5.pop();
                        j += pixelSize
                        k = k === str.length - 1 ? 0 : k + 1
                    }
                    i += pixelSize
                }
            })
            p5.noLoop()
        } , [dispatch, searchParams]
    )

    const style = useMemo(
        () => ({
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: -2,
            // zIndex: -99,
            transformOrigin: 'top left',
            transform: ' scale(0.1)',
        }) , []
    )

    return <P5
        style={style}
        setup={setup}
    />
}

export default memo(CommandPromptSketch)