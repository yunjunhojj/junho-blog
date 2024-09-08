import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import FirebaseAuth from "@site/src/components/auth/fireabase-auth";
import { useState } from "react";
import StyledButton from "@site/src/components/ui/styledButton";

const Admin = () => {
  const { siteConfig } = useDocusaurusContext();
  const [user, setUser] = useState<firebase.default.User | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="antennasm은 안테나 처럼 널리 퍼져나가는 정보를 전달하는 개발자 블로그입니다."
    >
      <div className="container margin-vert--lg">
        <h1>Admin</h1>
        <FirebaseAuth user={user} setUser={setUser} />
        {user && (
          <StyledButton onClick={() => setIsOpen(true)} backgroundColor="blue">
            Open dialog
          </StyledButton>
        )}
      </div>
    </Layout>
  );
};

export default Admin;
