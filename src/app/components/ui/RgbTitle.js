import { memo } from "react"

import { pt_Bold } from "@/app/lib/fonts"

import styles from '@/app/styles/components/ui/rgb-title.module.scss'

const RgbTitle = ({ children , className }) => {

    return (
        <div className={`${styles.title} ${pt_Bold.className} ${className}`}>
            <span className={styles.green}>{children}</span>
            <span className={styles.red}>{children}</span>
            <span className={styles.blue}>{children}</span>
            <h1>{children}</h1>
        </div>
    )
}

export default memo(RgbTitle)