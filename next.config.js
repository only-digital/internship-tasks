const path =  require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    images: {
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
      },
}

module.exports = nextConfig
