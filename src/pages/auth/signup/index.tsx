import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export const signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const register = () => {
		const auth = getAuth();
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log(user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
			});
	};

	return (
		<div>
			<input
				type="text"
				placeholder="email"
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				placeholder="password"
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={register}>Register</button>
		</div>
	);
};
