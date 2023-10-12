import Head from "next/head";
import Layout from "src/components/layout";
import styles from "../styles/utils.module.css";
import { useState } from "react";

const postForm = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
  });

  async function postData() {
    const response = await fetch(`api/api-forms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (response.status === 200) {
      alert("登録に成功しました。");
    } else if (response.status !== 200) {
      alert("登録に失敗しました。\n" + responseData.error);
    }
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, name: e.target.value });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, email: e.target.value });
  };

  return (
    <Layout>
      <Head>
        <title>API Forms</title>
      </Head>
      <section className={styles.section}>
        <form className={styles.form}>
          <label className={styles.label} htmlFor="name">
            Name
          </label>
          <input
            className={styles.input}
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            onChange={handleNameChange}
            value={data.name}
          />
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            className={styles.input}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            onChange={handleEmailChange}
            value={data.email}
          />
          <button className={styles.button} type="button" onClick={postData}>
            Submit
          </button>
        </form>
      </section>
    </Layout>
  );
}

export default postForm;