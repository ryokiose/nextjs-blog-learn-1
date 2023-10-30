import Head from "next/head";
import Layout from "@/components/Layout";
import styles from "@/styles/utils.module.css";
import { useState } from "react";

const postForm = () => {
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");

	async function postData() {
		const response = await fetch(`api/api-forms`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, email }),
		});
		const responseData = await response.json();
		if (response.status === 200) {
			alert("登録に成功しました。");
		} else if (response.status !== 200) {
			alert("登録に失敗しました。\n" + responseData.error);
		}
	}

	return (
		<Layout>
			<Head>
				<title>API Forms</title>
			</Head>
			<section className={styles.section}>
				<form className={styles.form}>
					<label className={styles.label} htmlFor="name">
						名前
					</label>
					<input
						className={styles.input}
						id="name"
						name="name"
						type="text"
						autoComplete="name"
						required
						onChange={(e) => setName(e.target.value)}
					/>
					<label className={styles.label} htmlFor="email">
						Eメール
					</label>
					<input
						className={styles.input}
						id="email"
						name="email"
						type="email"
						autoComplete="email"
						required
						onChange={(e) => setEmail(e.target.value)}
					/>
					<button
						className={styles.button}
						type="button"
						onClick={() => {
							if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
								postData();
							} else {
								alert("メールアドレスの形式が正しくありません。");
							}
						}}
					>
						Submit
					</button>
				</form>
			</section>
		</Layout>
	);
};

export default postForm;
