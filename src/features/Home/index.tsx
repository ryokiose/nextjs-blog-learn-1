import Head from "next/head";
import Layout from "@/components/Layout/";
import utilStyles from "@/styles/utils.module.css";
import Link from "next/link";
import Date from "@/components/Elements/Date";
import { HomeProps } from "./type";
import { siteTitle } from "@/components/Layout";
import { useState } from "react";
import { Loading } from "@/components/Loading";

export const Home = ({ allPostsData }: HomeProps) => {
	const [isLoading, setIsLoading] = useState(false);

	const handleClick = () => {
		setIsLoading(true);
	};

	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			{isLoading ? (
				<Loading />
			) : (
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
							<Link href={`/user-posts`} onClick={handleClick}>
								Registered Users
							</Link>
						</li>
					</ul>
				</section>
			)}
		</Layout>
	);
};
