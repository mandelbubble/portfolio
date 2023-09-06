precision highp float;

uniform sampler2D uTexture;
uniform vec2 uResolution;
uniform float uPixelSize;

varying vec2 vUv;

float pixelSize = 6.0;

void main() {

    vec2 uv = vUv;


    vec2 vignetteUv = uv;
    vignetteUv *= 1.0 - uv.yx;
    float vig = vignetteUv.x * vignetteUv.y * 10.0;
    vig = pow(vig, 0.7);

    vec2 pixelCoords = uv * uResolution.xy;
    pixelCoords = mod(pixelCoords, uPixelSize) / uPixelSize;
    pixelCoords *= 3.0;
    vec3 pixel = vec3(0.);
    if (pixelCoords.x < 1.0) {
        pixel.r = 1.0;
    } else if (pixelCoords.x < 2.0) {
        pixel.g = 1.0;
    } else {
        pixel.b = 1.0;
    }

    // uv += 0.5;
    // vec2 scale = uResolution.xy / uPixelSize;
    // uv *= scale;
    // uv = floor(uv);
    // uv /= scale;
    // uv -= 0.5;
    
    vec4 tex = texture2D(uTexture, uv); 
    tex.rgb *= vig;
    // tex.rgb *= pixel;
    // vec4 col = vec4(tex, 1.) ;
    // col.rgb *= vig;

    // vec4 tex = texture2D(uTexture, vUv);
    gl_FragColor = tex;
}