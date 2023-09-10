import { validate } from "email-validator"
import { memo, useCallback, useEffect, useMemo, useState } from "react"

import Input from "./Input"
import Log from "./Log"

import WindowsCommandPrompt from "@/app/components/windows/CommandPrompt"

import constants from "@/app/lib/windows/constants"

import styles from '@/app/styles/components/three/scene.module.scss'

const settings = constants.programs.cmd

const CommandPrompt = () => {

    const [state, setState] = useState({
        needsUpdate: false,
        command: '',
        log : [
            { cmd : 'commandLine', label : 'help'},
            { cmd : 'help', disabled : false }
        ],
        highlightIndex: 0,
        placeholder : settings.commands[0].cmd,
        isPlayingTicTacToe: false,
        email: '',
        emailLoading: false,
    })

    const helpMenuDisabled = useMemo(
        () => {
            return !state.log.find(log => log.cmd === 'help' && log.disabled === false)
        } , [state.log]
    )

    const updatePlaceholder = useCallback(
        cmd => {
            
            if (!cmd) return ''

            const command = cmd.toLowerCase()

            const handleCase = ({ cmd , placeholder }) => {
                if (!placeholder) return placeholder
                return cmd[0] === cmd[0].toLowerCase()
                    ? placeholder
                    : placeholder[0].toUpperCase() + placeholder.substring(1)
            }

            if ('subscribe'.startsWith(command.trim())) {
                const placeholder = settings.subscribePlaceholder
                return handleCase({ cmd , placeholder })
            }

            const placeholder = settings.commands.find(
                ({ cmd }) => command && cmd.startsWith(command)
            )?.cmd || ''
            return handleCase({ cmd , placeholder })
        } , []
    )

    const onChange = useCallback(
        command => {
            const placeholder = updatePlaceholder(command)
            setState(state => {
                const highlightIndex = command 
                    ? settings.commands.findIndex(c => c.cmd.startsWith(command)) 
                    : state.highlightIndex
                return {
                    ...state,
                    command,
                    placeholder,
                    highlightIndex: highlightIndex > -1 ? highlightIndex : state.highlightIndex
                }
            })
        } , [updatePlaceholder]
    )

    const onArrowDown = useCallback(
        key => {
            setState(state => {
                const highlightIndex = key === 'ArrowDown' 
                    ? state.highlightIndex < settings.commands.length - 1 ? state.highlightIndex + 1 : 0
                    : state.highlightIndex === 0 ? settings.commands.length - 1 : state.highlightIndex - 1
                const active = state.log[state.log.length - 1]?.cmd === 'help'
                return {
                    ...state,
                    highlightIndex,
                    placeholder : active ? updatePlaceholder(settings.commands[highlightIndex].cmd) : state.placeholder,
                    command: ''
                }
            })
        } , [updatePlaceholder]
    )


    const updateLog = useCallback(
        ({ previous , command, isEmail, isValidEmail }) => {
           
            const parsedCommand = command.toLowerCase().trim()
            
            if (parsedCommand === 'clear') return []

            const log = [
                ...previous.map(log => Object.assign(
                    log, 
                    log.cmd === 'help' ? { disabled : true } : {}
                )), 
                { cmd : 'commandLine', label : command}
            ]

            const newLog = { cmd : 'commandLine', label: ''}

            if (isEmail) {
                newLog.label = isValidEmail 
                    ? '...loading...'
                    : 'Invalid email address'
            } else {
                newLog.cmd = settings.commands.find(
                    ({ cmd }) => cmd === parsedCommand
                )?.cmd || 'unknown'
            }

            return [
                ...log,
                newLog
            ]
        } , []
    )


    const onSubmit = useCallback(
        () => {
            setState(({
                log,
                command,
                placeholder,
                ...state
            }) => {

                const lowerCaseCommand = command ? command[0].toLowerCase() + command.substring(1) : ''
                const trimmedCommand = lowerCaseCommand.trim()
                const isEmail = trimmedCommand.startsWith('subscribe')
                const email = isEmail ? trimmedCommand.replace('subscribe', '').trim() : ''
                const isValidEmail = email ? validate(email) : false

                if (placeholder) {
                    const subscribeEdgeCase = trimmedCommand ? 'subscribe'.startsWith(trimmedCommand) && !email
                        : placeholder.startsWith('subscribe')
                    const isCapitalized = command !== '' && command[0] === command[0].toUpperCase()
                 
                    return {
                        ...state,
                        log,
                        command: placeholder,
                        placeholder: subscribeEdgeCase
                            ? isCapitalized ? 'Subscribe your@email.com' : 'subscribe your@email.com'
                            : '',
                        command : subscribeEdgeCase 
                            ? isCapitalized ? 'Subscribe ' : 'subscribe '
                            : placeholder
                    }
                }

                const updatedLog = updateLog({ 
                    previous : log , 
                    command : command.trim(),
                    isEmail,
                    isValidEmail,
                })

                const isPlayingTicTacToe = updatedLog.length > 0 
                    &&  updatedLog[updatedLog.length - 1].cmd === 'tic-tac-toe'

                const isHelp = updatedLog.length > 0 && updatedLog[updatedLog.length - 1].cmd === 'help'
                return {
                    ...state,
                    log : updatedLog,
                    isPlayingTicTacToe,
                    command : '',
                    email : isValidEmail ? email : '',
                    emailLoading : isValidEmail,
                    highlightIndex : 0,
                    placeholder: isHelp ? settings.commands[0].cmd : state.placeholder
                }
            })
        } , [updateLog]
    )

    useEffect(
        () => {
            const elem = document.querySelector(`.${styles.cmdHolder}`)
            if (elem) elem.scrollTo(0, elem.scrollHeight)
        } , [state.log]
    )

    useEffect(
        () => {
            if (!state.emailLoading) return

            const subscribe = async () => {

                const res = await fetch('/api/subscribe', {
                    method: 'POST',
                    body: JSON.stringify({
                        email: state.email
                    })
                })

                const { error } = await res.json()

                setState(
                    (({ log, ...state }) => {

                        const oldLog = log.slice(0, -1)

                        const newLog = { 
                            cmd : 'commandLine', 
                            label: 'Successfully subscribed to newsletter' 
                        }

                        if (!res || res.status !== 200) {
                            newLog.label = error || 'Something went wrong'
                        }

                        return {
                            ...state,
                            emailLoading : false,
                            email: '',
                            log : [...oldLog, newLog]
                        }
                    })
                )



            }

            subscribe()
        } , [state.emailLoading, state.email]
    )

    const onExitTicTacToe = useCallback(
        () => {
            setState(state => ({
                ...state,
                isPlayingTicTacToe: false,
            }))
        } , []
    )

    return (
        <WindowsCommandPrompt 
            className={styles.cmd}
            cmdHolderClassName={styles.cmdHolder}
            customResolution
        >
            <Log 
                data={state.log}
                highlightIndex={state.highlightIndex}
                isPlayingTicTacToe={state.isPlayingTicTacToe}
                onExitTicTacToe={onExitTicTacToe}
            />
            { 
                !state.isPlayingTicTacToe
                && !state.emailLoading
                // true
                && <Input
                    value={state.command}
                    placeholder={state.placeholder}
                    onChange={onChange}
                    onArrowDown={onArrowDown}
                    onSubmit={onSubmit}
                />
            }
        </WindowsCommandPrompt>
    )
}

export default memo(CommandPrompt)