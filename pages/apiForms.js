import Head from 'next/head';
import Layout from '../components/layout';
import styles from '../styles/utils.module.css';

export default function apiForms() {
  const data = {
    name: '',
    email: '',
  };

  async function sendApi() {
    const response = await fetch(`api/api-forms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    alert(JSON.stringify(responseData));
  }

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
            onChange={(e) => (data.name = e.target.value)}
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
            onChange={(e) => (data.email = e.target.value)}
          />
          <button className={styles.button} type="button" onClick={sendApi}>
            Submit
          </button>
        </form>
      </section>
    </Layout>
  );
}