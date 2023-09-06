import dynamic from "next/dynamic";
import { memo , useCallback, useRef } from "react"

import styles from '@/app/styles/components/p5/loader.module.scss'

import vert from '@/app/lib/shaders/p5-loader/loader.vert'
import frag from '@/app/lib/shaders/p5-loader/loader.frag'

const P5 = dynamic(() => import('react-p5')
    .then(mod => mod.default), { ssr: false })

const speed = 3;
const radius = 3;
const nb = 50;
const trailLength = 100;

class Particle {
    constructor(x, y, angle, col) {
        this.x = x
        this.y = y
        this.angle = angle
        this.col = col
        this.alive = true
        this.points = []
    }

    update = p5 => {

        if (p5.random() > 0.95) {
            if (p5.random() > 0.5) {
                this.angle += Math.PI / 4
            } else this.angle -= Math.PI / 4
        }

        this.x += Math.cos(this.angle) * speed
        this.y += Math.sin(this.angle) * speed

        this.points.push(p5.createVector(this.x, this.y))

        if (this.points.length > trailLength) this.points.shift()

        const { x , y } = this.points[0]

        if (
            x < 0 
            || x > p5.width
            || y < 0
            || y > p5.height
        ) this.alive = false
    }

    show = (p5, graph) => {

        graph.stroke(this.col)
        graph.strokeWeight(radius)

        const black = p5.color('#0e0e0e')

        this.points.forEach(
            (point, i) => {
                if (i === this.points.length - 1) return

                const next = this.points[i + 1]

                const r = p5.map(i, 0, trailLength, p5.red(black), p5.red(this.col))
                const g = p5.map(i, 0, trailLength, p5.green(black), p5.green(this.col))
                const b = p5.map(i, 0, trailLength, p5.blue(black), p5.blue(this.col))

                graph.stroke(p5.color(r, g, b))
                graph.line(point.x, point.y, next.x, next.y)
            }
        )
    }


}

const Loader = ({ visible }) => {
    
    const settings = useRef({
        time: 0,
        font: null,
        particles : [],
        graphics: null,
        shader: null
    })

    const burst = useCallback(
        p5 => {

            const randomColor = [
                p5.color(
                    155 + p5.random(50),
                    155 + p5.random(50),
                    155 + p5.random(50),
                )
            ]

            const col = randomColor[Math.floor(p5.random(randomColor.length))]
            new Array(nb)
                .fill(null)
                .forEach(() => {
                    const x = p5.width / 2
                    const y = p5.height / 2
                    // console.log({x, y})
                    const angle = Math.floor(p5.random(8)) * Math.PI / 4
                    settings.current.particles.push(new Particle(x, y, angle, col))
                })
        } , []
    )


    const setup = useCallback((p5, canvasParentRef) => {
        const canvas = p5.createCanvas(window.innerWidth, window.innerHeight, p5.WEBGL).parent(canvasParentRef)
        canvas.id('scene-loader')

        
        settings.current.graphics = p5.createGraphics(window.innerWidth, window.innerHeight)
        // settings.current.graphics.colorMode(p5.RGB)        
        settings.current.graphics.strokeCap(p5.ROUND);

        settings.current.shader = p5.createShader(vert, frag)
        p5.shader(settings.current.shader)
        settings.current.shader.setUniform('uPixelSize', radius)
        
        burst(p5)

    }, [burst]);

    
    
    const draw = useCallback(p5 => {


        settings.current.graphics.background('#0e0e0e')
            
        settings.current.particles.forEach(
            (particle, i) => {
                particle.update(p5)
                if (!particle.alive) { 
                    settings.current.particles.splice(i, 1)
                } else {
                    particle.show(p5, settings.current.graphics)
                }}
            )
                        
        if (settings.current.particles.length <= nb / 4) { burst(p5, 100) }
    

        settings.current.shader.setUniform('uTexture', settings.current.graphics)
        settings.current.shader.setUniform('uResolution', [p5.width, p5.height])

        p5.rect(-p5.width/2, -p5.height/2, p5.width, p5.height)
        
       
    }, [burst])

    const windowResized = useCallback(p5 => {
        const { resizeCanvas , random , width , height } = p5
       
        p5.resizeCanvas(window.innerWidth, window.innerHeight)

        settings.current.graphics.reset()
        settings.current.graphics.remove()
        settings.current.graphics = p5.createGraphics(window.innerWidth, window.innerHeight)

        // settings.current.graphics.resize(p5.width, p5.height)
        settings.current.particles = []
        burst(p5)
    }, [burst])


    if (!visible) return null

    return (
        <div
            // className={`${styles.wrapper} ${visible ? '' : styles.hidden}`}
            className={styles.wrapper}
        >
            <P5 
                className={styles.sketch} 
                setup={setup}
                draw={draw}
                windowResized={windowResized}
            />
            <h1>
                <span>LOADING</span>
                <span>LOADING</span>
                <span>LOADING</span>
                <span>LOADING</span>
            </h1>
        </div>
    )
}

export default memo(Loader)