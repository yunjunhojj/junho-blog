import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyBxasGjcHqMZxaUMGfQbGhOv418sGK1kMI",
  authDomain: "antennasm-blog.firebaseapp.com",
  projectId: "antennasm-blog",
  storageBucket: "antennasm-blog.appspot.com",
  messagingSenderId: "858629550555",
  appId: "1:858629550555:web:354b29f2d2da04053777fe",
  measurementId: "G-30TVZNGTQ8",
};

// Firebase 초기화
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // 이미 초기화된 앱 사용
}

export default firebase;
