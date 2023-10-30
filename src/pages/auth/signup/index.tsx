import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import Router from "next/router";
import styles from "./index.module.css";

import { firebaseApp } from "@/utils/firebase/firebaseConfig";

const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSetEmail = (email: string) => {
		setEmail(email);
	};

	const handleSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const validEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		const email = e.target.value;
		if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			handleSetEmail(email);
		} else {
			alert("メールアドレスの形式が正しくありません。");
			return;
		}
	};

	const submit = () => {
		if (!email || !password) {
			alert("未入力の項目があります。");
			return;
		}
		validEmail;
		const auth = getAuth(firebaseApp);
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				alert("登録完了");
				console.log(user);
				Router.push("/");
			})
			.catch((error) => {
				console.log(error);
			});
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
				<button onClick={submit}>登録</button>
			</div>
		</>
	);
};

export default Register;
