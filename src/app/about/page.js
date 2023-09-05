import Link from "next/link"
import { memo } from "react"

import Button from "../components/ui/Button"

import styles from '@/app/styles/pages/about.module.scss'

const About = () => {
    return (
        <div className={styles.layout}>
            <div className={styles.left}>
                <h1 className={styles.title}> 🌈 About </h1>
                <div className={styles.text}>
                    <p>My name is Alex and I am a software developer. I fell in love with programming at twelve and never stopped since then. After five years as a Front-End then Fullstack engineer, I decided to take two years for myself to try my hands at everything I have ever dreamed of learning (from Blender to Unreal Engine to embedded electronics to watercolor paintings). On top of it, I’m a lucky mom since March 2023.</p>
                    <p>I am now eager to come back to work and very (very) excited to do so ! There are so many things I miss in my work such as always learning new things, team spirit, shipping meaningful features for end users and large scale architectures.</p>
                    <p>I have a strong interest for webGL and would love to make the leap from web applications to ambitious creative development projects.</p>
                </div>
                <div className={styles.ctaWrapper}>
                    <Button className={styles.cta}>
                        <Link href='/contact'>
                            contact me
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default memo(About)