import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading
          className={clsx("hero__title", "text--center", "margin-bottom--lg")}
          as={"h1"}
        >
          {siteConfig.title}
        </Heading>
        <p
          className={clsx(
            "hero__subtitle",
            "text--center",
            "margin-bottom--lg",
            "padding-horiz--md"
          )}
        >
          {siteConfig.tagline}
        </p>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="antennasm은 안테나 처럼 널리 퍼져나가는 정보를 전달하는 개발자 블로그입니다."
    >
      <HomepageHeader />
      <main>
        <h2
          className={clsx(
            "text--center",
            "margin-bottom--lg",
            "padding-horiz--md",
            "padding-vert--lg",
            "border--bottom"
          )}
        >
          주요 기술 스택
        </h2>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
