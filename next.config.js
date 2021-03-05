const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer({
    images: {
        domains: ['image.tmdb.org', 'img.youtube.com', 'youtube.com', 't']
    }
});
