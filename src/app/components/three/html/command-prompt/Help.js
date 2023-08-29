import { memo } from "react"

import constants from "@/app/lib/windows/constants"

import styles from '@/app/styles/components/three/command-prompt.module.scss'

const Help = ({ disabled , index }) => constants.programs.cmd.commands.map(
    ({ cmd , info } , i ) => {

        const focused = !disabled && i === index 
            ? styles.focus
            : ''

        const className = `${styles.help} ${focused}`

        return (
            <div key={cmd} className={className}>
                <span>{cmd}</span>
                <span className={styles.spacer}/>
                <span>{info}</span>
            </div>
        )
    }
)


export default memo(Help)