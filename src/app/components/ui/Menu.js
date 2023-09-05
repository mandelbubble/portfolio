"use client"

import { memo, useCallback, useMemo, useState } from "react"


import styles from '@/app/styles/components/ui/menu.module.scss'
import { usePathname } from "next/navigation"
import Link from "next/link"

const Menu = () => {
    
    const [isOpen, setIsOpen] = useState(false)

    const pathname = usePathname()

    const navBarClassName = useMemo(
        () => {
           return `${styles.navBar} ${pathname === '/' ? styles.hidden : ''}`
        } , [pathname]
    )

    const renderMenuLink = useCallback(
        ({ url = '#', label, soon = false }) => {
            return (
                <li className={`
                    ${styles.link}
                    ${ soon || pathname === url ? styles.disabled : '' }
                `} key={label}>
                    <Link 
                        href={url} 
                        onClick={() => { console.log(click)}}> 
                        <span className={styles.label}>{label}</span>
                        {soon && <span className={styles.soon}>coming soon</span>}
                    </Link>
                </li>
            )
        } , [pathname]
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
                    <span>menu</span>
                </button>
                <div className={styles.crafted}>
                    crafted with <span>♡</span>
                </div>
            </div>
            <div className={`
                ${styles.sideMenuWrapper}
                ${isOpen ? '' : styles.collapsed}
            `}>
                <div className={styles.sideMenu}>
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

    return null
}

export default memo(Menu)