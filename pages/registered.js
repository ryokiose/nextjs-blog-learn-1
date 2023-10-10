import { PrismaClient } from "@prisma/client";
import { useState } from "react";
import Layout from "../components/layout";
import styles from "../styles/utils.module.css";
import Date from "../components/date";

async function deleteApi(id) {
  const response = await fetch(`api/delete-post/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseData = await response.json();
  if (response.status === 200) {
    alert("削除に成功しました。");
    return true;
  } else {
    alert("削除に失敗しました。\n" + responseData.error);
    return false;
  }
}

export default function Registered({ userData }) {
  const [userList, setUserList] = useState(userData);

  const handleDelete = async (id) => {
    const deleted = await deleteApi(id);
    if (deleted) {
      setUserList((prevList) => prevList.filter((user) => user.id !== id));
    }
  };

  return (
    <Layout>
      <h1>Registered Users</h1>
      <ul>
        {userList.length !== 0 && (
          <>
            {userList.map((user) => (
              <li key={user.id} className={styles.box}>
                <div className={styles.postInfo}>
                  <div>
                    ID：{user.id}
                    <br />
                    名前：{user.name}
                    <br />
                    Eメール：{user.email}
                    <br />
                    作成日：<Date dateString={user.createdAt} />
                  </div>
                  <button
                    className={styles.deleteButton}
                    type="button"
                    onClick={() => handleDelete(user.id)}
                  >
                    削除
                  </button>
                </div>
              </li>
            ))}
          </>
        )}
        {userList.length === 0 && <li className={styles.list}>登録ユーザーはいません。</li>}
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
