import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./index.module.css";

const Home = (): JSX.Element => {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title="main" description="생각하고, 쓰고, 공유하다.">
      <header className={styles.heroBanner}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <p className="hero__description">
            아래 아이콘을 클릭하거나 터치하여 페이지로 이동할 수 있습니다.
          </p>
        </div>
      </header>
      <main className={styles.mainContainer}>
        <div className={styles.linkContainer}>
          {/* Docs */}
          <div className={styles.linkItem}>
            <a href="/docs/intro">
              <img src="/svg/docs.svg" alt="Docs" className={styles.linkIcon} />
            </a>
            <p>Docs</p>
          </div>
          {/* Blog */}
          <div className={styles.linkItem}>
            <a href="/blog">
              <img src="/svg/blog.svg" alt="Blog" className={styles.linkIcon} />
            </a>
            <p>Blog</p>
          </div>
          {/* About */}
          <div className={styles.linkItem}>
            <a
              href="https://www.yunjunho.info"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/svg/about.svg"
                alt="About"
                className={styles.linkIcon}
              />
            </a>
            <p>About</p>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Home;
