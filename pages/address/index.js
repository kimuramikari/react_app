import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { app } from '../../src/fire';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import Layout from '../../components/layout';

export default function Index() {
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  const db = getFirestore(app);

  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('please login...');
  const router = useRouter();

  // ログイン処理
  const login = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const userDisplayName = result.user.displayName;
        setUser(userDisplayName);
        setMessage(`logined: ${userDisplayName}`);
      })
      .catch((error) => {
        setUser('NONE');
        setMessage('not logined.');
      });
  };

  // ログアウト処理
  const logout = () => {
    signOut(auth).then((_) => {
      setUser(null);
      setData([]);
      setMessage('please login...');
    });
  };

  // アドレス追加ページに遷移するclickイベント
  const doAction = (event) => {
    router.push('/address/new');
  };

  // アドレス詳細ページに遷移するclickイベント
  const doLink = (event) => {
    // メールアドレスをid属性から取得する
    const id = event.target.id;
    // /address/detailにリダイレクトする
    router.push(`/address/detail?id=${id}`);
  };

  // アドレスを取得する
  useEffect(() => {
    if (auth.currentUser != null) {
      const userDisplayName = auth.currentUser.displayName;
      setUser(userDisplayName);
      setMessage(`${userDisplayName}さんの登録アドレス`);

      const newAddress = [];
      const dataRef = collection(
        db,
        'address',
        auth.currentUser.email,
        'address'
      );

      // ユーザが登録した全アドレスを取得する
      getDocs(dataRef).then((snapshot) => {
        // アドレスのリストからJSXのリストを作成する
        snapshot.forEach((document) => {
          // アドレスの内容を取得する
          const doc = document.data();
          newAddress.push(
            <li
              className="list-group-item list-group-item-action p-1"
              onClick={doLink}
              id={document.id}
            >
              {doc.flag ? '✔︎' : ''}
              {doc.name} ({doc.mail})
            </li>
          );
        });
        setData(newAddress);
      });
    } else {
      const newAddress = [];
      newAddress.push(<li key="1">{"can't get data."}</li>);
      setData(newAddress);
    }
  }, [message]);

  return (
    <div>
      <Layout header="Next.js" title="アドレス帳">
        <div className="alert alert-primary text-center">
          {auth.currentUser == null ? (
            <h6 className="text-end" onClick={login}>
              ログイン
            </h6>
          ) : (
            <h6 className="text-end" onClick={logout}>
              ログアウト
            </h6>
          )}
          <h5 className="mb-4">{message}</h5>
          <ul className="list-group">{data}</ul>
          <hr />
          <button className="btn btn-primary" onClick={doAction}>
            Add address
          </button>
        </div>
      </Layout>
    </div>
  );
}