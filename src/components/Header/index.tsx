import Link from "next/link";
import styles from "./index.module.css";
import { User, signOut } from "firebase/auth";

import { auth } from "@/src/lib/firebase/firebaseConfig";

// import { getLoginUser } from "@/src/lib/auth/getLoginUser";
import { useEffect, useState } from "react";

const Header = () => {
	const Logout = () => {
		signOut(auth)
			.then(() => {
				alert("ログアウトしました。");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, [])

	return (
		<>
			<div className={styles.header}>
				<Link href={"/"}>ホーム</Link>
				{currentUser ? (
					<>
						<div>Logged in with {currentUser.email}</div>
						<button
							onClick={() => {
								Logout();
							}}
						>
							ログアウト
						</button>
					</>
				) : (
					<>
						<Link href={"/auth/signup"}>新規登録</Link>
						<Link href={"/auth/login"}>ログイン</Link>
					</>
				)}
			</div>
		</>
	);
};

export default Header;
