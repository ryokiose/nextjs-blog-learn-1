import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import Router from "next/router";
import styles from "./index.module.css";

import { firebaseApp } from "@/utils/firebase/firebaseConfig";

export const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSetEmail = (email: string) => {
		setEmail(email);
	};

	const handleSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const validEmail = (email: string) => {
		if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			handleSetEmail(email);
			return true;
		} else {
			alert("メールアドレスの形式が正しくありません。");
			return false;
		}
	};

	const submit = async (email: string, password: string) => {
		if (!email || !password) {
			alert("未入力の項目があります。");
			return;
		}
		if (validEmail(email) === false) {
			return;
		}
		const auth = getAuth(firebaseApp);
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			);
			const user = userCredential.user;
			console.log(user);
			Router.push("/");
			alert("登録完了");
		} catch (error) {
			console.log(error);
			alert("登録に失敗しました。");
		}
	};

	return (
		<>
			<div className={styles.form}>
				<h1>新規登録</h1>
				<input
					type="text"
					placeholder="メールアドレス"
					value={email}
					onChange={(e) => handleSetEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="パスワード"
					value={password}
					onChange={(e) => handleSetPassword(e)}
				/>
				<button onClick={() => submit(email, password)}>登録</button>
			</div>
		</>
	);
};