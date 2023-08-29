import { memo, useCallback, useEffect, useMemo, useRef } from "react"

import constants from "@/app/lib/windows/constants"
import styles from '@/app/styles/components/three/command-prompt.module.scss'

const { 
    pieceType,
} = constants.programs.cmd.ticTacToe

const TicTacToeGame = ({
    value,
    onChange,
    isWaitingForAI,
    error,
    gameOver,
    exit,
    submit,
    restart
}) => {

    const ref = useRef()

    useEffect(
        () => {
            ref.current?.focus()
        } , []
    )

    const label = useMemo(
        () => {
            if (gameOver) return `${gameOver === pieceType.human
                ? 'YOU WON!' 
                : 'GAME OVER!'
            } (PRESS ESC TO EXIT, ENTER TO RESTART)`
            if (isWaitingForAI) return 'ai is thinking...'
            return `(PRESS ESC TO EXIT) Pick a cell: ${
                error ? '(invalid cell)' : ''
            }`
        } , [gameOver, isWaitingForAI, error]
    )

    const onChangeInput = useCallback(
        event => {
            event.preventDefault()
            onChange(event.target.value)
            event.stopPropagation()
        } , [onChange]
    )

    const onKeyDown = useCallback(
        event => {

            if (['Escape', 'Enter'].find(key => key === event.key)) {
                event.preventDefault()
                if (event.key === 'Escape') exit()
                else {
                    if (gameOver) restart()
                    else submit()

                }
                event.stopPropagation()
            }

        } , [gameOver, exit, restart, submit]
    )

    return (
        <div className={styles.ticTacToeInputHolder}>
            { label }
            <input
                ref={ref}
                value={value}
                onChange={onChangeInput}
                onKeyDown={onKeyDown}
            />
        </div>
    )
}

export default memo(TicTacToeGame)