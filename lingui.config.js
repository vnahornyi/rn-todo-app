/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  locales: ["en", "uk"],
  catalogs: [
    {
      path: "<rootDir>/shared/locales/{locale}/messages",
      include: [
        "<rootDir>/web/**",
        "<rootDir>/native/**",
        "<rootDir>/shared/**",
      ],
    },
  ],
  format: "po",
};
