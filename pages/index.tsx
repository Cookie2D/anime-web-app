import { GetStaticProps, NextPage } from 'next';
import HomePage from '@/modules/home/HomePage';

const Index: NextPage = () => {
  return <HomePage />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const messages = (await import(`../locales/${locale}.json`)).default;

  return {
    props: {
      messages,
    },
  };
};

export default Index;
