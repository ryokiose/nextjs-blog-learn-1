import { PrismaClient } from "@prisma/client";
import Layout from '../components/layout';
import styles from '../styles/utils.module.css';
import Date from "../components/date";

// 削除ボタン
async function deleteApi(id) {
  const response = await fetch(`api/delete-post`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseData = await response.json();
  if (response.status == 200) {
    alert("削除に成功しました。");
  } else if (response.status !== 200) {
    alert("削除に失敗しました。\n" + responseData.error);
  }
}


export default function registered({ userData }) {
  return (
    <Layout>
      <h1>Registered Users</h1>
      <ul>
        {userData.length !== 0 && (
          <>
            {userData.map((user) => (
              <li key={user.id} className={styles.box}>
                ID：{user.id}
                <br />
                名前：{user.name}
                <br />
                Eメール：{user.email}
                <br />
                {/* 作成日：{user.createdAt} */}
                作成日：<Date dateString={user.createdAt} />
              </li>
            ))}
            <button className={styles.delete-button} type="button" onClick={deleteApi(user.id)}>
              削除
            </button>
          </>
        )}
        {userData.length === 0 && <li className={styles.list}>登録ユーザーはいません。</li>}
      </ul>
    </Layout>
  );
}

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  const userData = await prisma.post.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  return {
    props: {
      userData: userData.map((user) => ({
        ...user,
        createdAt: user.createdAt.toISOString(),
      })),
    },
  };
}