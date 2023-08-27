import { memo } from "react"

import Window from "./Window"

import constants from "@/app/lib/windows/constants"

import styles from '@/app/styles/components/windows/command-prompt.module.scss'

const CommandPrompt = ({
    className = '', 
    children 
}) => {
    return (
        <Window
            style={constants.programs.cmd.resolution}
            className={className}
            label={constants.programs.cmd.label}
            iconPath={constants.programs.cmd.icon}
        >
            <div className={styles.main}>
                <div className={styles.cmd}>
                    <div>
                        {`Microsoft❮R❯ Windows DOS \n❮C❯ Copyright Microsoft Corp 1990-2001.\n`}
                    </div> <br/>
                    { children }
                </div>
            </div>
        </Window>
    )
}

export default memo(CommandPrompt)