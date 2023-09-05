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

    const onKeyUp = useCallback(
        event => {
            const { key } = event

            if (['ArrowUp', 'ArrowDown'].find(k => k === key)) {
                event.preventDefault()
                onArrowDown(key)
                event.stopPropagation()
            }
            return false

        } , [onArrowDown]
    )

    const onFormSubmit = useCallback(
        e => {
            e.preventDefault()
            onSubmit()
            e.stopPropagation()
        } , [onSubmit]
    )

    return (
        <div className={styles.inputWrapper}>
            { settings.prefix }
            <span>
                <form onSubmit={onFormSubmit} className={styles.form}>
                    <input ref={ref}
                        className={styles.input}
                        value={value}
                        onChange={onInputChange}
                        onKeyUp={onKeyUp}
                    />
                </form>
                <div className={styles.placeholder}>
                    {placeholder}
                </div>
            </span>
        </div>
    )
}

export default memo(Input)