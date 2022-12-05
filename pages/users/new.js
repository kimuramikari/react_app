import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../../components/layout';
import { app } from '../../src/fire';
import { getFirestore, collection, getDocs, AggregateField, addDoc } from 'firebase/firestore/lite';


export default function Add(){
    const[message,setMessage] = useState('ユーザー追加');
    const[name,setName] = useState('');
    const[mail,setMail] = useState('');
    const[age,setAge] = useState(0);
    const router = useRouter();
    
    const db = getFirestore(app);
    const onChangeName = (e)=>{
        setName(e.target.value);
    };
    const onChangeMail = (e)=>{
        setMail(e.target.value);
    };
    const onChangeAge = (e)=>{
        setAge(e.target.value);
    };
    const doAction = (e)=>{
        const newData = {
            name: name,
            mail: mail,
            age: age,
        };
        const dataRef = collection(db,'mydata');
        //使わない引数の指定の仕方((＿))
        addDoc(dataRef,newData).then((_)=>{
            router.push('/users');
        });
    };
    return (
        <div>
          <Layout header="Next.js" title="ユーザ情報の追加ページ">
            <div className="alert alert-primary text-center">
              <h5 className="mb-4">{message}</h5>
              <div className="text-start">
                <div className="form-group">
                  <label htmlFor="name">名前</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    onChange={onChangeName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="mail">メール</label>
                  <input
                    type="text"
                    name="mail"
                    id="mail"
                    className="form-control"
                    onChange={onChangeMail}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="age">年齢</label>
                  <input
                    type="number"
                    name="age"
                    id="age"
                    className="form-control"
                    onChange={onChangeAge}
                  />
                </div>
              </div>
              <a href="/users">
                <button className="btn btn-primary">
                  一覧へ戻る
                </button>
              </a>
              &ensp;
              <button className="btn btn-primary" onClick={doAction}>
                追加
              </button>
            </div>
          </Layout>
        </div>
      );
    
}