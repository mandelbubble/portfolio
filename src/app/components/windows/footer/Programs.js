/* eslint-disable @next/next/no-img-element */

import constants from '@/app/lib/windows/constants'

import styles from '@/app/styles/components/windows/footer.module.scss'

const Programs = () => (
    <div className={styles.programs}>
        <button className={`${styles.program} ${styles.focusedProgram}`}>
            <img 
                src={constants.programs.cmd.icon}
                alt='cmd'
            />
            <span>{constants.programs.cmd.label}</span>
        </button>
        <button className={styles.program}>
            <img
                src={constants.programs.notepad.icon}
                alt='notepad'
            />
            <span>{constants.programs.notepad.label}</span>
        </button>
    </div>
)

export default Programs