"use client"

import { memo, useCallback, useMemo, useState, useRef } from "react"

import { vt323 } from "@/app/lib/fonts"

import styles from '@/app/styles/components/ui/menu.module.scss'
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useRouter } from "next/navigation"

const Menu = () => {
    
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const router = useRouter()
    const ref = useRef()

    const navBarClassName = useMemo(
        () => {
            return `${styles.navBar} ${pathname === '/' 
                ? `${styles.hidden} ${styles.home}` 
                : styles.withBackground} ${vt323.className}`
        } , [pathname]
    )


    const onMenuLinkClick = useCallback(
        url => event => {
            event.preventDefault()
            setIsOpen(false)
            router.push(url)
        } , [router]
    )

    const renderMenuLink = useCallback(
        ({ url = '#', label, soon = false }) => {
            const onClick = onMenuLinkClick(url)
            return (
                <li className={`
                    ${styles.link}
                    ${ soon || pathname === url ? styles.disabled : '' }
                `} key={label}>
                    <Link 
                        href={url} 
                        onClick={onClick}> 
                        <span className={styles.label}>{label}</span>
                        {soon && <span className={styles.soon}>coming soon</span>}
                    </Link>
                </li>
            )
        } , [pathname, onMenuLinkClick]
    )

    const links = useMemo(
        () => [
            { url : '/', label : 'home' },
            { url : '/about', label: 'About me'},
            { url : '#', label: 'Demo', soon: true},
            { url : '#', label: 'Blog', soon: true},
            { url : '/contact', label: 'Contact'},
        ] , [ ]
    )

    const onToggle = useCallback(
        () => {
            setIsOpen(open => !open)
        } , []
    )


    const onClickWrapper = useCallback(
        event => {
            event.preventDefault()
            if (ref.current.contains(event.target)) return
            onToggle()
        } , [onToggle]
    )


    return (
        <>
            <div className={navBarClassName} id='nav-bar'>
                <button onClick={onToggle}>
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.940552" y="1.44861" width="7" height="7" rx="1.5" stroke="#FF0000"/>
                        <rect x="12.9406" y="1.44861" width="7" height="7" rx="1.5" stroke="#D9ECFF"/>
                        <rect x="0.940552" y="13.4448" width="7" height="7" rx="1.5" stroke="#0000FF"/>
                        <rect x="12.9406" y="13.4448" width="7" height="7" rx="1.5" stroke="#00FF00"/>
                    </svg>
                    <span className={vt323.className}>menu</span>
                </button>
                <div className={styles.crafted}>
                    crafted with <span>♡</span>
                </div>
            </div>
            <div onClick={onClickWrapper} className={`
                ${styles.sideMenuWrapper}
                ${isOpen ? '' : styles.collapsed}
            `}>
                <div className={styles.sideMenu} ref={ref}>
                    <div className={styles.grunge}/>
                    <menu className={styles.links}>
                       { links.map(renderMenuLink) }
                    </menu>
                    <button className={styles.chevrons} onClick={onToggle}>
                        <div className={styles.chevron}/>
                        <div className={styles.chevron}/>
                        <div className={styles.chevron}/>
                    </button>
                </div>
            </div>
        </>
    )
}

export default memo(Menu)