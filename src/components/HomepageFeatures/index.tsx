import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import { useColorMode } from "@docusaurus/theme-common";

type FeatureItem = {
  title: string;
  SvgLight: React.ComponentType<React.ComponentProps<"svg">>;
  SvgDark: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

// react, nextjs, typescript 에 대해 알아보기
const FeatureList: FeatureItem[] = [
  {
    title: "React",
    SvgLight: require("@site/static/img/lib/react.svg").default,
    SvgDark: require("@site/static/img/lib/react.svg").default,
    description: (
      <>
        <p>The library for web and native user interfaces</p>
        <p>
          리액트는 프론트엔드 개발을 쉽고 빠르고 안정적으로 만들어 줍니다.
          컴포넌트 기반으로 UI를 구성할 수 있다는 점이 가장 큰 장점입니다.
        </p>
      </>
    ),
  },
  {
    title: "Next.js",
    SvgLight: require("@site/static/img/lib/nextjs-light.svg").default,
    SvgDark: require("@site/static/img/lib/nextjs-dark.svg").default,
    description: (
      <>
        <p>The React Framework for the Web</p>
        <p>
          Next.js는 리액트를 기반으로 한 프레임워크로, 리액트를 더욱 쉽게 사용할
          수 있도록 다양한 기능을 지원합니다. 생태계 또한 크고 지속적으로
          성장하고 있습니다.
        </p>
      </>
    ),
  },
  {
    title: "TypeScript",
    SvgLight: require("@site/static/img/lib/typescript.svg").default,
    SvgDark: require("@site/static/img/lib/typescript.svg").default,
    description: (
      <>
        <p>TypeScript: A Static Type Checker</p>
        <p>
          TypeScript는 자바스크립트의 상위 집합으로, 정적 타입을 지원하여 코드를
          더 안정적이고 예측 가능하게 만들어 줍니다.
        </p>
      </>
    ),
  },
];

function Feature({ title, SvgLight, SvgDark, description }: FeatureItem) {
  const { isDarkTheme } = useColorMode();

  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        {isDarkTheme ? (
          <SvgDark className={styles.featureSvg} role="img" />
        ) : (
          <SvgLight className={styles.featureSvg} role="img" />
        )}
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
