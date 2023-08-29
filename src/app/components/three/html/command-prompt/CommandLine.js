import constants from "@/app/lib/windows/constants"
import { memo } from "react"

const CommandLine = ({ children }) => (
    <div>
        {constants.programs.cmd.prefix}
        {children}
    </div>
)

export default memo(CommandLine)