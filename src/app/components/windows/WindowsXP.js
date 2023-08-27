"use client"

import { toBlob } from 'html-to-image'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CommandPrompt from './CommandPrompt'
import Footer from './footer/Footer'

import { selectDesktopTextureNeedsUpdate, setDesktopTextureNeedsUpdate, updateDesktopBlob } from '@/app/lib/redux/slices/three'
import constants from '@/app/lib/windows/constants'

import styles from '@/app/styles/components/windows/windows-xp.module.scss'


const WindowsXP = () => {
    const searchParams = useSearchParams()

    const needsUpdate = useSelector(selectDesktopTextureNeedsUpdate)
    const dispatch = useDispatch()
    const ref = useRef()

    useEffect(
        () => {
            if (!needsUpdate || !ref?.current) return
            const htmlToBlob = async () => {
                const blob = await toBlob(ref.current)
                const blobTexture = URL.createObjectURL(blob)
                dispatch(updateDesktopBlob(blobTexture))
                dispatch(setDesktopTextureNeedsUpdate(false))
            }
            htmlToBlob()
        } , [needsUpdate, dispatch]
    )

    return (
        <div className={styles.main}>
            <div 
                style={constants.resolution}
                className={styles.desktop}
                ref={ref}
            >
                <CommandPrompt className={styles.desktopCmd}>
                    <div>{`C:\\WINDOWS\\SYSTEM32> hello_${searchParams.get('visitor')?.replace(" ", "_") || "world"}.exe`}</div>
                </CommandPrompt>
                <Footer/>
            </div>
        </div>
    )
}

export default WindowsXP