import { memo } from "react"

import Form from "./Form"

import styles from '@/app/styles/pages/contact.module.scss'

const Contact = () => {
    return (
        <div className={styles.layout}>
            <h1 className={styles.title}>
                        So happy to hear from you, <br/>
                        Get in touch 👋
            </h1>
            <div className={styles.flexContainer}>
                <div className={styles.left}>
                    <Form/>
                </div>
            </div>
        </div>
    )
}

export default memo(Contact)