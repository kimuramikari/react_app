import { initializeApp } from "firebase/app";

// firebaseの認証情報
const firebaseConfig = {
  apiKey: "AIzaSyBdy3iPh_-ngkvlgduC09aJV5s53LKDT7I",
  authDomain: "react-kimura-jugyo.firebaseapp.com",
  projectId: "react-kimura-jugyo",
  storageBucket: "react-kimura-jugyo.appspot.com",
  messagingSenderId: "131396242336",
  appId: "1:131396242336:web:ca1ed4bbaad70dbc0872c5"
};

// firebaseを初期化する
export const app = initializeApp(firebaseConfig);