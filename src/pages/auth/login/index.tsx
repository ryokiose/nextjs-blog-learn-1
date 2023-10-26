import styles from "./index.module.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import Router from "next/router";
import Link from "next/link";

import { firebaseApp } from "@/src/lib/firebase/firebaseConfig";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSetEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handleSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const submit = () => {
		const auth = getAuth(firebaseApp);

		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				alert("ログイン完了");
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
				<h1>ログイン</h1>
				<input
					type="text"
					placeholder="メールアドレス"
					value={email}
					onChange={(e) => handleSetEmail(e)}
				/>
				<input
					type="password"
					placeholder="パスワード"
					value={password}
					onChange={(e) => handleSetPassword(e)}
				/>
				<button onClick={submit}>ログイン</button>
			</div>
		</>
	);
};

export default Login;
