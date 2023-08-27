import CommandPromptSketch from "./components/p5/CommandPromptSketch"
import Canvas from "./components/three/Canvas"
import WindowsXP from "./components/windows/WindowsXP"

import styles from './styles/pages/home.module.scss'

const Home = () => {
  return (
    <div className={styles.home}>
      <Canvas/>
      <WindowsXP/>
      <CommandPromptSketch/>
    </div>
  )
}

export default Home