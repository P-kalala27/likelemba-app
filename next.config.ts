import type { NextConfig } from 'next';

const nextConfig : NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.supabase.co',
                pathname: '/storage/v1/object/public/**'
            },
        ],
    },

    async headers () {
        return [
            {
                source: '(/.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()'
                    },
                ],
            },
            {
                source: '/icons/(.*)',
                headers:[
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable'
                    },
                ],
            },
        ]
    },

    async redirects () {
        return [
            {
                source: '/home',
                destination: '/dashboard',
                permanent: false
            }
        ]
    }
}


export default nextConfig;