import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import styles from "@/styles/utils.module.css";
import Date from "@/components/Elements/Date";
import { Post, newPost, payload } from "./type";
import { ResponseData } from "@/types/response";
import { supabase } from "@/utils/supabase";
import { convert } from "@/utils/convertDate";

async function deletePost(id: number): Promise<boolean> {
	const response = await fetch(`api/delete-post/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});

	const responseData = (await response.json()) as ResponseData;
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

	const responseData = (await response.json()) as ResponseData;
	if (response.status === 200) {
		alert("更新に成功しました.");
		return true;
	} else {
		alert("更新に失敗しました。\n" + responseData.error);
		return false;
	}
}

export const UserPosts = ({ userData }: { userData: Post[] }) => {
	const [userList, setUserList] = useState<Post[]>(userData);
	const [isEdit, setIsEdit] = useState<[boolean, number]>([false, 0]);

	const [nameInput, setNameInput] = useState<string>("");
	const [emailInput, setEmailInput] = useState<string>("");

	const setInputValues = (name: string, email: string) => {
		setNameInput(name);
		setEmailInput(email);
	};

	const handleDelete = (id: number) => {
		deletePost(id)
			.then((deleted) => {
				if (deleted) {
					setUserList((prevList) => prevList.filter((user) => user.id !== id));
				}
			})
			.catch((error) => {
				console.error(error);
				alert(
					"削除に失敗しました。\n" +
						(error instanceof Error ? error.message : "エラーが発生しました"),
				);
			});
	};

	const handleUpdate = (id: number) => {
		updatePost(id, nameInput, emailInput)
			.then((updated) => {
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
			})
			.catch((error) => {
				console.error(error);
				alert(
					"更新に失敗しました。\n" +
						(error instanceof Error ? error.message : "エラーが発生しました"),
				);
			});
	};
	const handleInserts = (payload: payload) => {
        const newPost: newPost = payload.new;
        // newPostを整形する
        const formattedNewPost: Post = {
            id: newPost.id,
            name: newPost.name,
            email: newPost.email,
            createdAt: convert(newPost.created_at),
        };
        setUserList((prevList) => [...prevList, formattedNewPost]);
    };

    useEffect(() => {
        const posts_supabase = supabase;

        posts_supabase
            .channel("next-prisma-supabase-learn")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "posts",
                },
                handleInserts,
            )
            .subscribe();
        return () => {};
    }, []);

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
												onClick={() => handleUpdate(user.id)}
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
