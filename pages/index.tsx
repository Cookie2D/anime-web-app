import { GetStaticProps, NextPage } from 'next';
import { HeaderLinks } from '@/components/share/header/types/header.types';
import HomePage from '@/modules/home/HomePage';
import { getHeaderData } from '@/server/header/getHeaderData';

interface Props {
  links: HeaderLinks;
  messages: Record<string, string>;
}

const Index: NextPage<Props> = ({ links }) => {
  return <HomePage links={links} />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const messages = (await import(`../locales/${locale}.json`)).default;
  const links = await getHeaderData();
  console.log(links);
  return {
    props: {
      links,
      messages,
    },
  };
};
export default Index;
