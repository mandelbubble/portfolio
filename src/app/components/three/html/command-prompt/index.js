import { memo, useCallback, useEffect, useMemo, useState } from "react"

import Input from "./Input"
import Log from "./Log"

import WindowsCommandPrompt from "@/app/components/windows/CommandPrompt"

import constants from "@/app/lib/windows/constants"

import styles from '@/app/styles/components/three/scene.module.scss'
import { validate } from "email-validator"

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
        placeholder : '',
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
        command => {
            
            if (!command) return ''

            if ('subscribe'.startsWith(command.trim())) {
                return settings.subscribePlaceholder
            }

            return settings.commands.find(
                ({ cmd }) => command && cmd.startsWith(command)
            )?.cmd || ''
        } , []
    )

    const onChange = useCallback(
        command => {
            const placeholder = updatePlaceholder(command)
            setState(state => {
                return {
                    ...state,
                    command,
                    placeholder,
                }
            })
        } , [updatePlaceholder]
    )

    const onArrowDown = useCallback(
        key => {

        } , []
    )

    const updateLog = useCallback(
        ({ previous , command, isEmail, isValidEmail }) => {
           
            const parsedCommand = command.trim()
            
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

                const isEmail = command.trim().startsWith('subscribe')
                const email = isEmail ? command.trim().replace('subscribe', '').trim() : ''
                const isValidEmail = email ? validate(email) : false

                const updatedLog = updateLog({ 
                    previous : log , 
                    command,
                    isEmail,
                    isValidEmail,
                })

                const isPlayingTicTacToe = updatedLog.length > 0 
                    &&  updatedLog[updatedLog.length - 1].cmd === 'tic-tac-toe'

                return {
                    ...state,
                    log : updatedLog,
                    isPlayingTicTacToe,
                    command : '',
                    email : isValidEmail ? email : '',
                    emailLoading : isValidEmail,
                }
            })
        } , [updateLog]
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