//user list
import { UserList } from "@/features/User/List";
import { User } from "@/features/User/List/type";
import { PrismaClient } from "@prisma/client";

export default function UserListPage({ userData }: { userData: User[] }) {
	return <UserList userData={userData} />;
}

export async function getServerSideProps() {
	const prisma = new PrismaClient();
	const userData = await prisma.user.findMany({
		select: {
			id: true,
			name: true,
			email: true,
            password: true,
			createdAt: true,
			updatedAt: true
		},
	});

	userData.sort((a: { id: number }, b: { id: number }) => a.id - b.id);

	return {
		props: {
			userData: userData.map(
				(user) => ({
					...user,
					createdAt: user.createdAt.toISOString(),
					updatedAt: user.updatedAt.toISOString()
				}),
			),
		},
	};
}
