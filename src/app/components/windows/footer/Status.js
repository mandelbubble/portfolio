/* eslint-disable @next/next/no-img-element */
import { useState , useEffect} from 'react'
import { useDispatch } from 'react-redux'

import { setDesktopTextureNeedsUpdate } from '@/app/lib/redux/slices/three'
import constants from '@/app/lib/windows/constants'

import styles from '@/app/styles/components/windows/footer.module.scss'

const Status = () => {

    const [time, setTime] = useState()
    const dispatch = useDispatch()
    useEffect(
        () => {
            const formatTime = () => {
                const hour = new Date().getHours()
                const minute = new Date().getMinutes().toString().padStart(2, '0')
                const formattedHour = hour % 12 == 0 ? 12 : hour % 12
                const formattedMinute = minute.toString().padStart(2, '0')
                const meridiem = hour >= 12 ? 'PM' : 'AM'
                return `${formattedHour}:${formattedMinute} ${meridiem}`
            }

            setTime(formatTime())

            const interval = setInterval(
                () => {
                    setTime(formatTime())
                } , 1000
            )

            return (() => clearInterval(interval))
        } , []
    )

    useEffect(
        () => {
            if (!time) return
            dispatch(setDesktopTextureNeedsUpdate(true))
        } , [time, dispatch]
    )

    return (
        <div className={styles.status}>
            {
                ['audio', 'driver', 'firewall'].map(
                    icon => <img
                        key={icon}
                        alt={icon}
                        src={`${constants.path}/${icon}.png`}
                    />
                )
            }
            <span className={styles.time}> {time} </span>
        </div>
    )
}

export default Status