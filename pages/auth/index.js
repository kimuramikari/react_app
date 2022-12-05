import Layout from '../../components/layout';
import { app } from '../../src/fire';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Index from '../users/index';

export default function Profile() {
  // 1.Authオブジェクトを取得する
  const auth = getAuth(app);
  // 2.認証プロバイダーを作成する
  const googleProvider = new GoogleAuthProvider();

  // a.Firestoreオブジェクトを取得する
  const db = getFirestore(app);

  const router = useRouter();

  const [message, setMessage] = useState('wait...');
  const [data, setData] = useState([]);

  useEffect(() => {
    // ログインしているか確認する
    if (auth.currentUser === null) {
      // 3.ポップアップでGoogle認証する
      signInWithPopup(auth, googleProvider)
        .then((result) => {
          setMessage(`logined: ${result.user.displayName}`);
        })
        .catch((error) => {
          setMessage('not logined.');
        });
    }
  }, []);

  useEffect(() => {
    if (auth.currentUser != null) {
      // b.コレクションへの参照を作成する
      const dataRef = collection(db, 'mydata');
      // c.コレクションからドキュメントを取得する
      getDocs(dataRef).then((snapshot) => {
        const newData = [];
        snapshot.forEach((document) => {
          // d.ドキュメントの内容を取得する
          const doc = document.data();
          newData.push(
            <tr key={document.id}>
              <td>
                {/* TODO: 削除用のWebAPIへのURLを追加する */}
                <Link href="#">{document.id}</Link>
              </td>
              <td>{doc.name}</td>
              <td>{doc.mail}</td>
              <td>{doc.age}</td>
            </tr>
          );
          setData(newData);
        });
      });
    } else {
      const newData = [
        <tr key="1">
          <th colSpan="4">{"can't get data."}</th>
        </tr>,
      ];
      setData(newData);
    }
  }, [message]);

  const signout = (e) => {
    signOut(auth).then((_) => {
      setMessage('not logined.');
    });
  };

  return (
    <div>
      <Layout header="Next.js" title="プロフィール">
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">{message}</h5>
          <table className="table bg-white text-start">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Mail</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>{data}</tbody>
          </table>
          {/* <p className="h6 text-start">
            uid: {auth.currentUser != null && auth.currentUser.uid}
            <br />
            displayName:{' '}
            {auth.currentUser != null && auth.currentUser.displayName}
            <br />
            email: {auth.currentUser != null && auth.currentUser.email}
            <br />
            phoneNumber:{' '}
            {auth.currentUser != null && auth.currentUser.phoneNumber}
            <br />
          </p> */}
        </div>
        <hr />
        <button className='btn btn-primary' onClick={signout}>サインアウト</button>
      </Layout>
    </div>
  );
}