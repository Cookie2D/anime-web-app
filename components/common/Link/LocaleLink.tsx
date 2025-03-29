import { PropsWithChildren } from 'react';
import { Url } from 'next/dist/shared/lib/router/router';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

interface LocaleLinkProps extends LinkProps {}

const LocaleLink = ({ href, children, ...props }: PropsWithChildren<LocaleLinkProps>) => {
  const { locale, defaultLocale } = useRouter();

  const getLinkHref = (path: Url) => {
    return locale === defaultLocale ? path : `/${locale}${path}`;
  };

  return (
    <Link href={getLinkHref(href)} {...props}>
      {children}
    </Link>
  );
};

export default LocaleLink;
