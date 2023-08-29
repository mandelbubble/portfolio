import { memo, useState, useMemo, useCallback, useEffect } from "react"

import constants from "@/app/lib/windows/constants"

import styles from "@/app/styles/components/three/command-prompt.module.scss"
import TicTacToeGame from "./TicTacToeGame"

const { 
    pieceType,
    playerType,
    gameIsOver,
    minimax,
} = constants.programs.cmd.ticTacToe

const TicTacToe = ({ onExit, isPlaying }) => {
    
    const [game, updateGame] = useState({
        board: new Array(9).fill(pieceType.empty),
        currentPlayer: playerType.human,
        input: '',
        cellSubmitted: false,
        error: false,
        isOver: false,
    })

    const renderBoard = useMemo(
        () => {
            const [A0, B0, C0, A1, B1, C1, A2, B2, C2] = game.board
            return (
                <>
                    <pre>{`      A   B   C  `}</pre>
                    <pre>{`    ┌───┬───┬───┐`}</pre>
                    <pre>{` 0  │ ${A0} │ ${B0} │ ${C0} │`}</pre>
                    <pre>{`    │───│───│───│`}</pre>
                    <pre>{` 1  │ ${A1} │ ${B1} │ ${C1} │`}</pre>
                    <pre>{`    │───│───│───│`}</pre>
                    <pre>{` 2  │ ${A2} │ ${B2} │ ${C2} │`}</pre>
                    <pre>{`    └───┴───┴───┘`}</pre>
                </>
            )
        } , [game.board]
    )

    const onChange = useCallback(
        input => {
            updateGame(game => ({
                ...game,
                input,
            }))
        } , []
    )

    const onSubmit = useCallback(
        () => {
            updateGame(game => ({
                ...game,
                cellSubmitted: true
            }))
        } , []
    )

    const onRestart = useCallback(
        () => {
            updateGame(game => ({
                ...game,
                board : game.board.map(() => pieceType.empty),
                isOver : false,
                error: false,
                currentPlayer : playerType.human
            }))
        } , []
    )

    const handleError = useCallback(
        () => {
            updateGame(game => ({
                ...game,
                error: true,
                input: '',
                cellSubmitted: false,
            }))
        } , []
    )


    useEffect(
        () => {
            if (game.currentPlayer !== playerType.human
                || game.isOver
                || !game.cellSubmitted) return

            const cells = [
                ...game.input.trim().toUpperCase()
            ]

            const formattedCell = {
                row : cells.find(r => r >= '0' && r <= '2'),
                col : cells.find(c => c >= 'A' && c <= 'C')
            }

            if (cells.length !== 2
                || !formattedCell.col    
                || !formattedCell.row) handleError()
            else {
                formattedCell.col = formattedCell.col.charCodeAt(0) - 'A'.charCodeAt(0)
                formattedCell.row = formattedCell.row.charCodeAt(0) - '0'.charCodeAt(0)
                
                const cell = (3 * formattedCell.row) + formattedCell.col
                if (game.board[cell] !== pieceType.empty) handleError()
                else {
                    updateGame(game => {
                        const board = [...game.board]
                        board[cell] = pieceType.human
                        return {
                            ...game,
                            board,
                            input: '',
                            error: false,
                            currentPlayer: playerType.ai,
                            cellSubmitted: false,
                            isOver: gameIsOver(board)
                        }
                    })
                }
            }

        } , [game.currentPlayer, game.isOver, game.cellSubmitted, game.input, handleError, game.board]
    )

    useEffect(
        () => {
            if (game.isOver || game.currentPlayer !== playerType.ai) return

            const ai = { bestScore : -Infinity , bestMove : 0 }

            const board = [...game.board]

            board.forEach(
                (_, i) => {
                    if (board[i] === pieceType.empty){
                        board[i] = pieceType.ai
                        const score = minimax(board, false)
                        board[i] = pieceType.empty
                        if (score > ai.bestScore) {
                            ai.bestScore = score
                            ai.bestMove = i
                        }
                    }
                }
            )

            board[ai.bestMove] = pieceType.ai

            const timeOut = setTimeout(() => {
                updateGame(game => ({
                    ...game,
                    board,
                    isOver: gameIsOver(board),
                    currentPlayer: playerType.human,
                    isWaitingForAI: false,
                }))
            }, 200 + Math.random() * 300)

            return (() => {
                clearTimeout(timeOut)
            })

        } , [game.isOver, game.board, game.currentPlayer]
    )

    return (
        <div className={styles.ticTacToe}>
            {renderBoard}
            {
                isPlaying && (
                    <TicTacToeGame
                        onChange={onChange}
                        value={game.input}
                        error={game.error}
                        gameOver={game.isOver}
                        isWaitingForAI={game.currentPlayer === playerType.ai}
                        exit={onExit}
                        submit={onSubmit}
                        restart={onRestart}
                    />
                )
            }
        </div>
    )
}

export default memo(TicTacToe)

