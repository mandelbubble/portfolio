import { shaderMaterial } from "@react-three/drei"
import { Vector2 } from "three"

import vert from './perlin-dithering.vert'
import frag from './perlin-dithering.frag'

const PerlinDithering = shaderMaterial(
    {
        resolution : new Vector2(),
        time : 0,
        pixelSize: 16,
        uTexture : null,
    },
    vert,
    frag,
)

export default PerlinDithering