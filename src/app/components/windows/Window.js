import { memo } from "react"

import WindowHeader from "./WindowHeader"

import { open_Sans } from "@/app/lib/fonts"

import styles from '@/app/styles/components/windows/window.module.scss'

const Window = ({ 
    className = '', 
    style = {},
    label,
    iconPath,
    children 
}) => {
    return (
        <div
            style={style}
            className={`${styles.window} ${className} ${open_Sans.className}`}
        >
            <WindowHeader
                iconPath={iconPath}
                label={label}
            />
            { children }
        </div>
    )
}

export default memo(Window)