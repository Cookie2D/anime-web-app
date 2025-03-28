module.exports = {
  locales: ['en', 'uk'],
  sourceLocale: 'en',
  catalogs: [
    {
      path: 'locales/{locale}/messages',
      include: ['src'],
    },
  ],
  format: 'po',
};
