import { useSearchParams } from "next/navigation";
import { memo } from "react";
import { Scroll} from "@react-three/drei";

import RgbTitle from "../../ui/RgbTitle";

import styles from '@/app/styles/components/three/scene.module.scss'
import CommandPrompt from "./command-prompt";

const Html = () => {

    const searchParams = useSearchParams()

    return (
        <Scroll html>
            <div className={styles.html}>
                <RgbTitle>{`Hello ${searchParams.get('visitor') || 'world'}`}</RgbTitle>
                <CommandPrompt/>
            </div>
        </Scroll>
    )
}

export default memo(Html)