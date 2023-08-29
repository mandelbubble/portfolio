const pieceType = {
    empty : " ",
    human : "x",
    ai: "o",
}

const playerType = {
    ai : "AI",
    human : "human",
}

const gameIsOver = board => {
    if (board[4] !== pieceType.empty) {
        if (board[0] === board[4] && board[4] === board[8]
            || board[2] === board[4] && board[4] === board[6]
        ) return board[4]
    }

    for (let i = 0; i < 3; i++) {
        const rowIndex = i * 3
        const row = [rowIndex, rowIndex + 1, rowIndex + 2]
            .map(cell => board[cell])

        const [a, b, c] = row
        if (a == b && b == c && a !== pieceType.empty) return a

        const col = [i, i+3, i+6].map(cell => board[cell])
        const [x, y, z] = col
        if ( x === y && y === z && x !== pieceType.empty) return x
    }

    return board.find(cell => cell === pieceType.empty) 
        ? null 
        : pieceType.empty
}

const minimax = (board, maximizingPlayer) => {
    const gameOver = gameIsOver(board)

    if (gameOver) {
        if (gameOver === pieceType.empty) return 0
        if (gameOver === pieceType.ai) return 10
        return -10
    }

    if (maximizingPlayer) {
        let bestScore = -Infinity
        for (let i = 0; i < board.length ; i++) {
            if (board[i] === pieceType.empty) {
                board[i] = pieceType.ai
                const score = minimax(board, false)
                board[i] = pieceType.empty
                bestScore = Math.max(bestScore, score)
            }
        }
        return bestScore
    } else {
        let worstScore = Infinity
        for (let i = 0; i < board.length ; i++) {
            if (board[i] === pieceType.empty) {
                board[i] = pieceType.human
                const score = minimax(board, true)
                board[i] = pieceType.empty
                worstScore = Math.min(worstScore, score)
            }
        }
        return worstScore
    }
}

const constants = {
    resolution : {
        width : 1024,
        height : 768,
    },
    path: '/windows-xp/',
    programs : {
        cmd : {
            resolution : { width : 800 , height : 550 },
            position : {x : (1024 - 800) / 2 , y : ( 768 - 550 ) / 2},
            label: 'Command Prompt',
            icon: '/windows-xp/cmd_icon.png',
            prefix: `C:\\Windows>`,
            commands : [
                {cmd: 'whoami', info: 'more about me'},
                {cmd: 'clear', info: 'clear prompt'},
                {cmd: 'subscribe', info: 'receive blog newsletter'},
                {cmd: 'tic-tac-toe', info: 'a not so funny game'},
                {cmd: 'about', info: 'this website stack' },
                {cmd: 'help', info: 'all commands'},
            ],
            subscribePlaceholder : 'subscribe your@email.com',
            ticTacToe: {
                pieceType,
                playerType,
                gameIsOver,
                minimax,
            }
        },
        notepad:  {
            label: 'Notepad',
            icon: '/windows-xp/notepad_icon.png',
        }
    }
}

export default constants