/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { app } from '../../src/fire';
import { getFirestore, deleteDoc, getDoc, doc } from 'firebase/firestore/lite';
import Layout from '../../components/layout';

export default function Delete(props) {
  const [message, setMessage] = useState('下記のユーザーを削除します');
  const [data, setData] = useState(null);
  const router = useRouter();

  // 1.firestoreオブジェクトを取得する
  const db = getFirestore(app);

  useEffect(() => {
    // クエリパラメーターにidがあるか確認する
    if (router.query.id != undefined) {
      // データベースの参照先を作成する
      const dataRef = doc(db, 'mydata', router.query.id);
      // データベースからドキュメントを取得する
      getDoc(dataRef).then((document) => {
        // ドキュメントのデータを取得する
        setData(document.data());
      });
    } else {
      setMessage(`${message}.`);
    }
  }, [message]);

  const doAction = (e) => {
    // 2.データベースの参照先を作成する
    const dataRef = doc(db, 'mydata', router.query.id);
    // 3.データベースからドキュメントを削除する
    deleteDoc(dataRef).then((_) => {
      router.push('/users');
    });
  };

  return (
    <div>
      <Layout header="Next.js" title="ユーザ情報の削除ページ">
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">{message}</h5>
          <pre className="card p-3 m-3 h5 text-start">
            名前: {data != null ? data.name : '...'}
            <br />
            メール: {data != null ? data.mail : '...'}
            <br />
            年齢: {data != null ? data.age : '...'}
          </pre>
          <a href='/users'>
          <button className="btn btn-primary">
            一覧へ戻る
          </button>
          </a>
          &ensp;
          <button className="btn btn-primary" onClick={doAction}>
            削除する
          </button>
          
        </div>
      </Layout>
    </div>
  );
}