import { memo, useMemo } from "react"

import LoadingIcon from "./icons/LoadingIcon"
import SuccessIcon from "./icons/SuccessIcon"

import { pt_Light } from "@/app/lib/fonts"

import styles from '@/app/styles/components/ui/button.module.scss'

const Button = ({ children, className, disabled, isLoading, displaySuccessIcon  }) => {

    const btnClassName = useMemo(
        () => {
            return `${styles.button} ${className} ${disabled ? styles.disabled : ''} ${pt_Light.className}`
        } , [className, disabled]
    )
 
    return (
        <button className={btnClassName}>
            <div className={styles.content}>
                { 
                    isLoading 
                    ?  <LoadingIcon className={styles.loading}/>
                    : <span className={styles.span}>{ children }</span> 
                }
                { displaySuccessIcon && <SuccessIcon className={styles.success}/> }
            </div>
        </button>
    )
}

export default memo(Button)