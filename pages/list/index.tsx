import { GetStaticProps, NextPage } from 'next';
import ListPage from '@/modules/list/ListPage';

const About: NextPage = () => {
  return <ListPage />;
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
