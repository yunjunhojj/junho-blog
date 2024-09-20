import BrowserOnly from "@docusaurus/BrowserOnly";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";

import styles from "./index.module.css";

const Home = (): JSX.Element => {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <p className="hero__subtitle">
            키보드 방향키로 캐릭터를 움직여보세요!
          </p>
        </div>
      </header>
      <main>
        <BrowserOnly>{() => <HomepageFeatures />}</BrowserOnly>
      </main>
    </Layout>
  );
};

export default Home;
