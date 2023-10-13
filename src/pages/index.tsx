import Head from "next/head";
import Layout from "@/src/components/layout";
import utilStyles from "@/src/styles/utils.module.css";
import { getSortedPostsData } from "@/src/lib/posts";
import Link from "next/link";
import Date from "@/src/components/date";
import { HomeProps } from "@/types/pages/index";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

const Home = ({ allPostsData }: HomeProps) => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
          <li className={utilStyles.listItem}>
            <Link href={`/apiForms`}>API Forms</Link>
          </li>
          <li className={utilStyles.listItem}>
            <Link href={`/registered`}>Registered Users</Link>
          </li>
        </ul>
      </section>
    </Layout>
  );
}

const siteTitle = "Next.js Sample Website";

export default Home;