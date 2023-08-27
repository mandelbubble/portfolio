import Programs from './Programs'
import Start from './Start'
import Status from './Status'

import styles from '@/app/styles/components/windows/footer.module.scss'

const Footer = () => (
    <footer className={styles.footer}>
        <Start/>
        <Programs/>
        <Status/>
    </footer>
)

export default Footer