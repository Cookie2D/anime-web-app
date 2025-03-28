export const getPageTitle = (subtitle: string, title?: string) =>
  `${title ? `${title} | ` : ''}${subtitle}`;
