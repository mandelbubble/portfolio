/* eslint-disable @next/next/no-img-element */

import { memo } from "react"

import constants from "@/app/lib/windows/constants"

import styles from '@/app/styles/components/windows/window.module.scss'

const WindowHeader = ({ iconPath , label }) => {

    return (
        <div className={styles.header}>
            <span className={styles.label }> { label } </span>
            <div className={styles.controls}>
                {
                    ["minimize", "maximize", "close"].map(
                        control => (
                            <button 
                                key={control}
                                aria-label={control}
                            >
                                <img 
                                    src={`${constants.path}/${control}.svg`}
                                    alt={control}
                                />
                            </button>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default memo(WindowHeader)