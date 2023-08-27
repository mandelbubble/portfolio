/* eslint-disable @next/next/no-img-element */

import constants from '@/app/lib/windows/constants'

import styles from '@/app/styles/components/windows/footer.module.scss'

const Start = () => (
    <button className={styles.start}>
        <img
            alt='start'
            src={`${constants.path}/start.png`}
            width={94}
            height={30}
        />
    </button>
)

export default Start