import { UserPosts } from "@/features/UserPosts";
import { Post } from "@/features/UserPosts/index.type";
import { PrismaClient } from "@prisma/client";

export default function UserPostsPage({userData}:{userData: Post[]}) {
  return <UserPosts userData={userData}/>;
}

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

	userData.sort((a: { id: number }, b: { id: number }) => a.id - b.id);

	return {
		props: {
			userData: userData.map(
				(user: { createdAt: { toISOString: () => string } }) => ({
					...user,
					createdAt: user.createdAt.toISOString(),
				}),
			),
		},
	};
}