import { memo, useMemo } from "react"

import SuccessIcon from "./icons/SuccessIcon"

import styles from '@/app/styles/components/ui/input.module.scss'

const Input = ({
    label,
    value,
    onChange,
    error,
    displayStatus,
    isTextArea,
    placeholder,
    disabled
}) => {

    const renderInputField = useMemo(
        () => {
            const props = {
                value,
                placeholder,
                onChange
            }

            return (
                <div className={`
                    ${styles.field}
                    ${isTextArea ? styles.textArea : styles.input}
                    ${displayStatus && error ? styles.error : ''}
                    ${disabled ? styles.disabled : ''}
                `}>
                    {isTextArea
                        ? <textarea {...props}/>
                        : <input {...props}/>}
                </div>
            )
        } , [value, placeholder, onChange, isTextArea, displayStatus, error, disabled]
    )

    const renderError = useMemo(
        () => {
            if (!displayStatus) return
            if (error) return <span className={styles.errorLabel}>{error}</span>
            return <SuccessIcon className={styles.success}/>
        } , [displayStatus, error]
    )

    return (
        <div className={styles.layout}>
            <div className={styles.flexRow}>
                {
                    label && 
                    <label className={styles.label  }>
                        {label}
                    </label>
                }
                { renderError }
            </div>
            { renderInputField }
        </div>
    )
}

export default memo(Input)