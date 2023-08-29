import { memo } from "react"

import CommandLine from "./CommandLine"
import Help from "./Help"
import TicTacToe from "./TicTacToe"

import styles from '@/app/styles/components/three/command-prompt.module.scss'

const Log = ({
    data,
    highlightIndex,
    isPlayingTicTacToe,
    onExitTicTacToe,
    // helpMenuDisabled,
    // onExitTicTacToe,
    // onConfirmEmail,
    // emailLoading
}) => {

    return data.map(
        ({ cmd , label , disabled }, i) => {

            if (cmd === 'commandLine') return (
                <CommandLine key={i}>
                    {label}
                </CommandLine>
            )

            if (cmd === 'help') return (
                <Help key={i}
                    disabled={disabled}
                    index={highlightIndex}
                />
            )

            if (cmd === 'whoami') return (
                <div key={i} className={styles.whoami}>
                    <pre>  _  _         _   _       </pre>      
                    <pre> | || |  ___  | | | |  ___ </pre>
                    <pre> | __ | / -_) | | | | / _ \</pre>
                    <pre> |_||_| \___| |_| |_| \___/</pre>
                    <pre> </pre>
                    <pre>I am Alex, a fullstack developer living near Paris in France</pre>
                    <pre> </pre>
                </div>
            )

            if (cmd === 'about') return (
                <div key={i} className={styles.about}>
                    <pre>This website was made with:</pre>
                    <ul>
                        <li><pre>Next.js as a framework </pre></li>
                        <li><pre>Threejs, ReactThreeFiber & P5.js (everything 3D related,
                            with homemade glsl shader)</pre></li> 
                        <li><pre>ReduxToolkit for state management </pre></li>
                        <li><pre>Scss made it pretty </pre></li>
                        <li><pre>Deployed thanks to Vercel </pre></li>
                        <li><pre>Code is hosted on <a>github</a> for you to read it </pre></li>
                    </ul>
                </div>
            )

            if (cmd === 'tic-tac-toe') return (
                <TicTacToe
                    key={i}
                    isPlaying={isPlayingTicTacToe}
                    onExit={onExitTicTacToe}
                />
            )
            
            return (
                <CommandLine key={i}>
                    Unknown command. Type help for more
                </CommandLine>
            )
        }
    )
}

export default memo(Log)