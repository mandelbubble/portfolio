/** @type {import('next').NextConfig} */

const path = require('path')

const nextConfig = {
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.(glsl|vs|fs|vert|frag)$/,
            use: ['raw-loader', 'glslify-loader'],
        });

        return config;
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')]
    },
    transpilePackages: ['three'],
}

module.exports = nextConfig
