import { PrismaClient } from "@prisma/client";
import { NextApiResponse } from "next";
import { UserCreateNextApiRequest } from "@/types/api/user-create";

let prisma: PrismaClient | undefined;

const handler = async (req: UserCreateNextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const { name, email , password} = req.body;

	if (!name || !email) {
		return res.status(400).json({ error: "Name and email are required" });
	}

	try {
		if (!prisma) {
			prisma = new PrismaClient();
		}

		const newPost = await prisma.user.create({
			data: {
				name: name,
				email: email,
                password: password,
			},
		});
		// SQL : INSERT INTO posts (name, email) VALUES (name, email)

		res.status(200).json(newPost);
	} catch (error) {
		console.error("Error creating post:", error);
		res
			.status(500)
			.json({ error: "An error occurred while creating the post" });
	} finally {
		await prisma?.$disconnect();
	}
};

export default handler;
