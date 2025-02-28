import React from "react";
import Layout from "@theme/Layout";
import styles from "./index.module.css";

export default function Home(): JSX.Element {
  return (
    <Layout title="antennasm" description="think, write, share">
      <header className={styles.heroBanner}>
        <div className={styles.heroContainer}>
          <h1 className={styles.title}>antennasm</h1>
          <p className={styles.subtitle}>think, write, share</p>
          <p className={styles.description}>
            아래 아이콘을 클릭하거나 터치하여 페이지로 이동할 수 있습니다.
          </p>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.linkContainer}>
          {/* Docs 링크 */}
          <div className={styles.linkItem}>
            <a href="/docs/intro" className={styles.linkBox}>
              <img
                src="/svg/docs.svg"
                alt="Docs"
                className={styles.iconImage}
              />
              <p>개념 복습</p>
            </a>
          </div>
          {/* Blog 링크 */}
          <div className={styles.linkItem}>
            <a href="/blog" className={styles.linkBox}>
              <img
                src="/svg/blog.svg"
                alt="Blog"
                className={styles.iconImage}
              />
              <p>평소 생각 정리</p>
            </a>
          </div>
          {/* About 링크 */}
          <div className={styles.linkItem}>
            <a
              href="https://www.yunjunho.info"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkBox}
            >
              <img
                src="/svg/about.svg"
                alt="About"
                className={styles.iconImage}
              />
              <p>누구세요?</p>
            </a>
          </div>
        </div>
      </main>
    </Layout>
  );
}
