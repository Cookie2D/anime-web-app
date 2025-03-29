import { GetStaticProps, NextPage } from 'next';
import AboutPage from '@/modules/about/AboutPage';

const About: NextPage = () => {
  return <AboutPage />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const messages = (await import(`../../locales/${locale}.json`)).default;

  return {
    props: {
      messages,
    },
  };
};

export default About;
