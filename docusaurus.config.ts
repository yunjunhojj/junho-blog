import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
const config: Config = {
  headTags: [
    {
      tagName: "meta",
      attributes: {
        name: "google-site-verification",
        content: "sTSv9cLKWzMkYN33iQdob2tQ3Q_Y4m2zSrTrBLJHeg4",
      },
    },
  ],
  plugins: [
    require.resolve("docusaurus-lunr-search"),
    [
      "@docusaurus/plugin-google-gtag",
      {
        trackingID: "G-FKFVJKFE2W",
        anonymizeIP: true,
      },
    ],
  ],

  title: "antennasm",
  tagline: "think, write, share",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://antennasm.netlify.app",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  organizationName: "yun junho",
  projectName: "antennasm",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "ko",
    locales: ["ko"],
  },

  presets: [
    [
      "classic",
      {
        sitemap: {
          lastmod: "date",
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
          filename: "sitemap.xml",
          createSitemapItems: async (params) => {
            const { defaultCreateSitemapItems, ...rest } = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.filter((item) => !item.url.includes("/page/"));
          },
        },
        docs: {
          sidebarPath: "./sidebars.ts",
        },
        blog: {
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    metadata: [
      {
        name: "twitter:card",
        content: "summary",
      },
      {
        name: "twitter:site",
        content: "@antennasm",
      },
      {
        name: "twitter:creator",
        content: "@antennasm",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:url",
        content: "https://antennasm.netlify.app",
      },
      {
        property: "og:title",
        content: "antennasm",
      },
      {
        property: "og:description",
        content: "think, write, share",
      },
      {
        property: "og:image",
        content:
          "https://avatars.githubusercontent.com/u/50473516?s=400&u=33f3fa8075facc0dc8cda88be2b6df4ba450f824&v=4",
      },
    ],

    image: "img/favicon.ico",
    navbar: {
      title: "antennasm blog",
      logo: {
        alt: "logo",
        src: "img/favicon.ico",
        style: {
          width: "32px",
          height: "32px",
        },
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "computerScienceSidebar",
          position: "left",
          label: "Computer Science",
        },
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Tutorial",
        },
        {
          to: "/blog",
          label: "Blog",
          position: "left",
          readingTime: ({ content, frontMatter, defaultReadingTime }) =>
            defaultReadingTime({ content, options: { wordsPerMinute: 300 } }),
        },

        {
          to: "/docs/toolbox/intro",
          label: "Toolbox",
          position: "left",
        },
        {
          to: "/docs/books/intro",
          label: "Books",
          position: "left",
        },
        // {
        //   href: "https://www.github.com/yunjunhojj",
        //   label: "GitHub",
        //   position: "right",
        // },
      ],
    },
    footer: {
      style: "dark",
      copyright: `Copyright © ${new Date().getFullYear()} antennasm blog`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
