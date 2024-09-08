// blog 글을 작성하기 위한 admin 페이지

import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import FirebaseAuth from "@site/src/components/auth/fireabase-auth";

const Admin = () => {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="antennasm은 안테나 처럼 널리 퍼져나가는 정보를 전달하는 개발자 블로그입니다."
    >
      <div className="container margin-vert--lg">
        <h1>Admin</h1>
        <FirebaseAuth />
      </div>
    </Layout>
  );
};

export default Admin;
