import { useSearchParams } from "next/navigation";
import { memo, useEffect, useRef, useState, useMemo } from "react";
import { Scroll, useScroll} from "@react-three/drei";

import CommandPrompt from "./command-prompt";

import Button from "../../ui/Button";
import RgbTitle from "../../ui/RgbTitle";

import styles from '@/app/styles/components/three/scene.module.scss'
import { useFrame } from "@react-three/fiber";

const Html = () => {

    const [mounted, setMounted] = useState(false)
    const scroll = useScroll()
    const ref = useRef()

    const searchParams = useSearchParams()

    useEffect(() => {
        setMounted(true)
    }, [])

    const style = useMemo(
        () => {
            return Object.assign({
                top: '300vh',
                opacity: 1
            }, !mounted ? { 
                top : 0,
                opacity: 0
            } : {})
        } , [mounted]
    )

    return (
        <Scroll html>
            <div className={styles.html} ref={ref} style={style}>
                <RgbTitle>{`Hello ${searchParams.get('visitor') || 'world'}`}</RgbTitle>
                <CommandPrompt/>
                <Button className={styles.cta}>
                    Hire me
                </Button>
            </div>
        </Scroll>
    )
}

export default memo(Html)