import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";

import styles from "./index.module.css";

const Home = (): JSX.Element => {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title="main" description="생각하고, 쓰고, 공유하다.">
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <p className="hero__description">
            키보드 방향키 또는 화면을 터치하여 캐릭터를 이동시킬 수 있습니다.
          </p>
        </div>
      </header>
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
};

export default Home;
