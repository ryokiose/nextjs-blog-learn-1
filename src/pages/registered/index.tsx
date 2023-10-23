import { PrismaClient } from "@prisma/client";
import { useState } from "react";
import Layout from "@/src/components/Layout/layout";
import styles from "@/src/styles/utils.module.css";
import Date from "@/src/components/Elements/Date/date";

async function deletePost(id: number): Promise<boolean> {
	const response = await fetch(`api/delete-post/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});

	const responseData = await response.json();
	if (response.status === 200) {
		alert("削除に成功しました。");
		return true;
	} else {
		alert("削除に失敗しました。\n" + responseData.error);
		return false;
	}
}

async function updatePost(
	id: number,
	name: string,
	email: string,
): Promise<boolean> {
	const response = await fetch(`api/update-post/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name, email }),
	});

	const responseData = await response.json();
	if (response.status === 200) {
		alert("更新に成功しました。");
		return true;
	} else {
		alert("更新に失敗しました。\n" + responseData.error);
		return false;
	}
}

const Posts = ({ userData }: { userData: Post[] }) => {
	const [userList, setUserList] = useState<Post[]>(userData);
	const [isEdit, setIsEdit] = useState<[boolean, number]>([false, 0]);

	const [nameInput, setNameInput] = useState<string>("");
	const [emailInput, setEmailInput] = useState<string>("");

	const setInputValues = (name: string, email: string) => {
		setNameInput(name);
		setEmailInput(email);
	};

	const handleDelete = async (id: number) => {
		const deleted = await deletePost(id);
		if (deleted) {
			setUserList((prevList) => prevList.filter((user) => user.id !== id));
		}
	};

	const handleUpdate = async (id: number, name: string, email: string) => {
		const updated = await updatePost(id, nameInput, emailInput);
		if (updated) {
			setUserList((prevList) =>
				prevList.map((user) => {
					if (user.id === id) {
						return {
							...user,
							name: nameInput,
							email: emailInput,
						};
					} else {
						return user;
					}
				}),
			);
		}
		setIsEdit([false, 0]);
	};

	return (
		<Layout>
			<h1>Registered Users</h1>
			<ul>
				{userList.length !== 0 && (
					<>
						{userList.map((user) => (
							<li key={user.id} className={styles.box}>
								<div className={styles.postInfo}>
									{isEdit[0] && isEdit[1] === user.id ? (
										<>
											<div>
												ID：{user.id}
												<br />
												名前：
												<input
													type="text"
													value={nameInput}
													onChange={(e) => setNameInput(e.target.value)}
												/>
												<br />
												Eメール：
												<input
													type="text"
													value={emailInput}
													onChange={(e) => setEmailInput(e.target.value)}
												/>
												<br />
												作成日：
												<Date dateString={user.createdAt} />
											</div>
											<button
												className={styles.updateButton}
												type="button"
												onClick={() =>
													handleUpdate(user.id, user.name, user.email)
												}
											>
												保存
											</button>
											<button
												className={styles.updateButton}
												type="button"
												onClick={() => setIsEdit([false, 0])}
											>
												キャンセル
											</button>
										</>
									) : (
										<>
											<div>
												ID：{user.id}
												<br />
												名前：{user.name}
												<br />
												Eメール：{user.email}
												<br />
												作成日：
												<Date dateString={user.createdAt} />
											</div>
											<button
												className={styles.deleteButton}
												type="button"
												onClick={() => handleDelete(user.id)}
											>
												削除
											</button>
											<button
												className={styles.updateButton}
												type="button"
												onClick={() => {
													setInputValues(user.name, user.email);
													setIsEdit([true, user.id]);
												}}
											>
												編集
											</button>
										</>
									)}
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

export async function getServerSideProps() {
	const prisma = new PrismaClient();
	const userData = await prisma.post.findMany({
		select: {
			id: true,
			name: true,
			email: true,
			createdAt: true,
		},
	});
	// userData = await prism.post.findMany({})と等価
	// SQL : SELECT id, name, email, createdAt FROM post;

	userData.sort((a, b) => a.id - b.id);

	return {
		props: {
			userData: userData.map((user) => ({
				...user,
				createdAt: user.createdAt.toISOString(),
			})),
		},
	};
}

export default Posts;
