import { memo, useCallback, useEffect, useRef } from "react"

import constants from "@/app/lib/windows/constants"

import styles from '@/app/styles/components/three/command-prompt.module.scss'

const settings = constants.programs.cmd

const Input = ({
    value,
    placeholder,
    onChange,
    onSubmit,
    onArrowDown, 
}) => {

    const ref = useRef()

    useEffect(
        () => { ref.current?.focus() }, []
    )

    const onInputChange = useCallback(
        event => {
            event.preventDefault()
            onChange(event.target.value)
            event.stopPropagation()
            return false
        } , [onChange]
    )

    const onKeyDown = useCallback(
        event => {
            const { key } = event

            if (['Tab', 'Enter', 'ArrowUp', 'ArrowDown'].find(k => k === key)) {
                event.preventDefault()

                if (key === 'Enter') onSubmit()
                else if (key === 'Tab') {
                    
                    onChange(placeholder === settings.subscribePlaceholder 
                        ? "subscribe"
                        : placeholder 
                    )
                }
                else onArrowDown(key)

                event.stopPropagation()
            }
            return false
        } , [onSubmit, placeholder, onArrowDown, onChange]
    )

    const preventDefault = useCallback(
        e => e.preventDefault() , []
    )

    return (
        <div className={styles.inputWrapper}>
            { settings.prefix }
            <span>
                <input ref={ref}
                    value={value}
                    onChange={onInputChange}
                    onKeyDown={onKeyDown}
                    onSubmit={preventDefault}
                />
                <div className={styles.placeholder}>
                    {placeholder}
                </div>
            </span>
        </div>
    )
}

export default memo(Input)