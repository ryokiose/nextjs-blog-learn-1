import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

let prisma: PrismaClient | undefined;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const postId = req.query.id;

  if (!postId) {
    return res.status(400).json({ error: "Id is required" });
  }

  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }
  try {
    if (!prisma) {
      prisma = new PrismaClient();
    }
    const updatedPost = await prisma.post.update({
      where: {
        id: parseInt(postId as string),
      },
      data: {
        name: name,
        email: email,
      },
    });
    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error during delete post:", error);
    res.status(500).json({ error: "An error occurred while deleting the post" });
  } finally {
    await prisma?.$disconnect();
  }
}

export default handler;