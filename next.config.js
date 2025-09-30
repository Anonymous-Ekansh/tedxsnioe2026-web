/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
    reactStrictMode: true,
    webpack(config) {
        config.module.rules.forEach((rule) => {
            const { oneOf } = rule;
            if (oneOf) {
                oneOf.forEach((one) => {
                    if (!`${one.issuer?.and}`.includes("_app")) return;
                    one.issuer.and = [path.resolve(__dirname)];
                });
            }
        });
        return config;
    },
    sassOptions: {
        additionalData: `@import "styles/root/_mixins.scss";@import "styles/root/_variables.scss";`,
    },
    images: {
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        domains: ['localhost'],
        path: '/_next/image',
        loader: 'default',
        quality: 90,
        formats: ['image/webp', 'image/avif'],
        minimumCacheTTL: 60,
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
    },
    // Add this to prevent hydration issues
    compiler: {
        styledComponents: true,
    }
};

module.exports = nextConfig;