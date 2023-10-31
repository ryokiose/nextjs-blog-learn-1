import Head from "next/head";
import Layout from "@/components/Layout/";
import utilStyles from "@/styles/utils.module.css";
import Link from "next/link";
import Date from "@/components/Elements/Date/date";
import { HomeProps } from "@/types/src/pages/index";
import { siteTitle } from "@/components/Layout";

export const Home = ({ allPostsData }: HomeProps) => {
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
						<Link href={`/api-forms`}>API Forms</Link>
					</li>
					<li className={utilStyles.listItem}>
						<Link href={`/user-posts`}>Registered Users</Link>
					</li>
				</ul>
			</section>
		</Layout>
	);
};
