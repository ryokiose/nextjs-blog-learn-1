import { PrismaClient } from "@prisma/client";

let prisma;

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const postId = req.body.id;

  if (!postId) {
    return res.status(400).json({ error: "Id is required" });
  }

  try {
    if (!prisma) {
      prisma = new PrismaClient();
    }

    const newPost = await prisma.Post.delete({
      where: {
        id: postId,
      },
    });

    res.status(200).json(newPost);
  } catch (error) {
    console.error("Error during delete post:", error);
    res.status(500).json({ error: "An error occurred while deleting the post" });
  }
}
