import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer({
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'uk'],
  },
  experimental: {
    swcPlugins: [['@lingui/swc-plugin', {}]],
  },
});
