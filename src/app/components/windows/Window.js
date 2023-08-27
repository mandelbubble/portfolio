import { memo } from "react"

import styles from '@/app/styles/components/windows/window.module.scss'
import WindowHeader from "./WindowHeader"

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
            className={`${styles.window} ${className}`}
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