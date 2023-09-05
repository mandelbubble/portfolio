const controls = { value : 1 , min : 0, max : 1}

const constants =  {
    background : '#0c0c0c',
    fog : {
        color : { value : '#0c0c0C' },
        near : { ...controls, value : 0 },
        far : {...controls, value : 2.2, max: 10 },
    },
    directionalLight : {
        position : { value : [-45, 30, 50] , step : 1 },
        intensity : {...controls, value : 1 },
        color: '#1400ff',
    },
    pointLight : {
        position : { value : [0, 0, 0], step : 1 },
        intensity : {...controls, value : 0.9 },
        color: '#5fcfd6',
    },
    ambientLight : {
        color : { value : '#fafafa' },
        intensity : { ...controls, value : 0.5 }
    },
    camera : { 
        position : [0, 0.26, 0],
    },
    hdrPath : 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/dikhololo_night_4k.hdr',
    screen : {
        meshPath: '/3D/computer/meshes/screen.fbx',
        commandPromptShader : {
            resolution : { width : 700 , height : 380 },
            gridSize : 16,
        }
    },
    monitor : {
        meshPath : '/3D/computer/meshes/monitor.fbx',
        plasticMaps : {
            map: '/3D/computer/textures/plastic/BaseColor.png',
            roughnessMap: '/3D/computer/textures/plastic/Roughness.png',
            aoMap: '/3D/computer/textures/plastic/AmbientOcclusion.png',
            metalnessMap: '/3D/computer/textures/plastic/Metallic.png',
            normalMap : '/3D/computer/textures/plastic/Normal.png'
        },
        glassMaps : {
            map: '/3D/computer/textures/glass/BaseColor.png',
            roughnessMap: '/3D/computer/textures/glass/Roughness.png',
            aoMap: '/3D/computer/textures/glass/AmbientOcclusion.png',
        },
        mapsSettings : {
            plastic : {
                precision: 'highp',
                name: 'monitor_glass',
            }
        },
        materialSettings : {
            plastic : {
                normalScale : { ...controls, value : [0.2, 0.2] }
            },
            glass : {
                transmission : controls,
                clearcoat : {...controls, value : 0},
                clearcoatRoughness : {...controls, value : 0},
                ior : {
                    value : 1,
                    min: 1,
                    max: 2.33,
                },
                thickness : {...controls, value : 0},
                envMapIntensity : {...controls, value : 0},
                normalScale : {...controls, value : [0.25, 0.25]},
                visible : { value : true},
            }
        }
    },
    planeReflector : {
        controls : {
            blur: {
                value: [400,400]
            },
            mixBlur: controls,
            mixStrength: {...controls, value: 80, max: 100},
            mixContrast: {...controls, value : 0.98},
            minDepthThreshold: {...controls, value: 0.4},
            maxDepthThreshold: {...controls, value: 1.4, max: 3},
            depthToBlurRatioBias: {...controls, value : 0.7},
            reflectorOffset: {...controls, value: 0},
            normalScale : {...controls, value :0.2},
            displacementScale : {...controls, value :1},
            envMapIntensity: {...controls, value: 0.001},
            color: "#ffffff",
        },
        scale : [8,8],
        maps: {
            map: '/3D/ground/textures/Color.png',
            roughnessMap: '/3D/ground/textures/Roughness.png',
            // displacementMap: '/3D/ground/textures/Displacement.png',
            // normalMap: '/3D/ground/textures/NormalGL.png',
        }
    },
    fullscreenThreshold : 1024,
}

export default constants