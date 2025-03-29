import { GetStaticProps, NextPage } from 'next';
import { HeaderLinks } from '@/components/share/header/types/header.types';
import AboutPage from '@/modules/about/AboutPage';
import { getHeaderData } from '@/server/header/getHeaderData';

interface Props {
  links: HeaderLinks;
}

const About: NextPage<Props> = ({ links }) => {
  return <AboutPage links={links} />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const messages = (await import(`../../locales/${locale}.json`)).default;
  const links = await getHeaderData();

  return {
    props: {
      links,
      messages,
    },
  };
};
export default About;
