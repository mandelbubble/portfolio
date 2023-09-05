"use client"

import { Leva } from "leva";
import { Suspense, memo, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Html, ScrollControls } from "@react-three/drei";
import { Canvas as ThreeCanvas} from "@react-three/fiber";

import Scene from "./Scene";

import styles from '@/app/styles/components/three/scene.module.scss'

const Canvas = () => {

    const renderError = useMemo(
        () => {
            return (
                <div>
                    Oops something went wrong
                </div>
            )
        } , []
    )

    const renderLoader = useMemo(
        () => {
            return (
                <Html fullscreen>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        background: '#0c0c0C'
                    }}>
                    Loading
                    </div>
                </Html>
            )
        } , []
    )

    return (
        <>
            <div className={styles.guide}>
                <div id="guide-1" className={styles.g1}>
                    <div id="guide-2" className={styles.g2}></div>
                </div>
            </div>
            <div className={styles.canvasHolder}>
                <ErrorBoundary fallback={renderError}>
                    <ThreeCanvas
                        frameloop="demand"
                        shadows
                    >
                        <Suspense fallback={renderLoader}>
                            <ScrollControls 
                                pages={4}
                                damping={0.2}>
                                <Scene/>
                            </ScrollControls>
                        </Suspense>
                    </ThreeCanvas>
                </ErrorBoundary>
            </div>
            <Leva hidden/>
        </>
    )
}

export default memo(Canvas)