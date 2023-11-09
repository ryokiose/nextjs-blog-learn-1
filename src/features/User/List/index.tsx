//user list
import { /*useEffect,*/ useState } from "react";
import Layout from "@/components/Layout";
import styles from "@/styles/utils.module.css";
import Date from "@/components/Elements/Date";
import { User, /*newUser, payload*/ } from "./type";
//import { ResponseData } from "@/types/response";
//import { supabase } from "@/utils/supabase";
//import { convert } from "@/utils/convertDate";

export const UserList = ({ userData }: { userData: User[] }) => {
const [userList/*, setUserList*/] = useState<User[]>(userData);
//	const [isEdit, setIsEdit] = useState<[boolean, number]>([false, 0]);

//	const [nameInput, setNameInput] = useState<string>("");
//	const [emailInput, setEmailInput] = useState<string>("");
    if (!userData) {
        return <>No data</>
    }

	return (
		<Layout>
			<h1>Registered Users</h1>
			<ul>
				{userList.length !== 0 && (
					<>
						{userList.map((user) => (
							<li key={user.id} className={styles.box}>
								<div className={styles.postInfo}>
										<>
											<div>
												ID：{user.id}
												<br />
												名前：{user.name}
												<br />
												Eメール：{user.email}
												<br />
                                                パスワード：{user.password}
                                                <br />
												作成日：
												<Date dateString={user.createdAt} />
                                                <br />
												更新日：
												<Date dateString={user.updatedAt} />
											</div>
										</>
								</div>
							</li>
						))}
					</>
				)}
				{userList.length === 0 && (
					<li className={styles.list}>登録ユーザーはいません。</li>
				)}
			</ul>
		</Layout>
	);
};
