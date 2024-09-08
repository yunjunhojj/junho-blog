import { useEffect, useState } from "react";
import firebase from "@site/firebase"; // firebase.js 파일에서 가져옴
import StyledButton from "../ui/styledButton";

const FirebaseAuth = ({ user, setUser }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 인증 상태 변화 감지 및 처리
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe(); // 컴포넌트가 언마운트될 때 구독 해제
  }, []);

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.error("Sign Out Error:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>; // 로딩 중일 때 표시
  }

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.displayName}!</p>
          <StyledButton onClick={signOut}>Sign out</StyledButton>
        </>
      ) : (
        <StyledButton onClick={signInWithGoogle}>
          Sign in with Google
        </StyledButton>
      )}
    </div>
  );
};

export default FirebaseAuth;
