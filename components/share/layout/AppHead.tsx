import { FC } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

type Props = {
  title?: string | null;
  description?: string | null;
  image?: string | null;
};

const AppHead: FC<Props> = ({ title, description, image }) => {
  const router = useRouter();

  const pageTitle = title ? `${title} | TaoMarketCap` : 'TaoMarketCap';
  const pageDescription =
    description || 'Bittensor $TAO on-chain analytics and blockchain explorer.';
  const pageImage = image || `${process.env.NEXT_PUBLIC_SITE_URL}/TaoMarketCap.png`;

  return (
    <Head>
      <title>{pageTitle}</title>

      <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <meta name="apple-mobile-web-app-title" content="TaoMarketCap" />
      <link rel="manifest" href="/site.webmanifest" />

      <meta name="description" content={pageDescription} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:site_name" content="TaoMarketCap" />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default AppHead;
