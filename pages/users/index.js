/* eslint-disable react-hooks/exhaustive-deps */
import Layout from '../../components/layout';
import { app } from '../../src/fire';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Index() {
  const [message, setMessage] = useState('wait...');
  const [data, setData] = useState([]);

  // 1.firestoreオブジェクトを取得する
  const db = getFirestore(app);

  useEffect(() => {
    // 2.データベースの参照先を作成する
    const dataRef = collection(db, 'mydata');
    // 3.データベースからすべてのドキュメントを取得する
    getDocs(dataRef).then((snapshot) => {
      const newData = [];
      snapshot.forEach((document) => {
        // 4.ドキュメントからデータを取得する
        const doc = document.data();
        // console.log(doc);
        newData.push(
          <tr key={document.id}>
            <td>
              <Link href={`/users/delete?id=${document.id}`}>
                {document.id}
              </Link>
            </td>
            <td>{doc.name}</td>
            <td>{doc.mail}</td>
            <td>{doc.age}</td>
          </tr>
        );
        setData(newData);
        setMessage('ユーザ一覧');
      });
    });
  }, []);

  return (
    <div>
      <Layout header="Next.js" title="ユーザ一覧ページ">
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">{message}</h5>
          <table className="table bg-white text-start">
            <thead>
              <tr>
                <th>ID</th>
                <th>名前</th>
                <th>メール</th>
                <th>年齢</th>
              </tr>
            </thead>
            <tbody>{data}</tbody>
          </table>
          <a href='/users/new'>
          <button className="btn btn-primary">
            ユーザを追加する
          </button>
          </a>
          &ensp;
          <a href='/users/find'>
          <button className="btn btn-primary">
            ユーザを検索する
          </button>
          </a>
        </div>
      </Layout>
    </div>
  );
}