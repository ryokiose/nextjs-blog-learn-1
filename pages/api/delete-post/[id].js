import { PrismaClient } from "@prisma/client";

let prisma;

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const postId = req.query.id;

  if (!postId) {
    return res.status(400).json({ error: "Id is required" });
  }

  try {
    if (!prisma) {
      prisma = new PrismaClient();
    }

    // データを削除
    const deletedPost = await prisma.post.delete({
      where: {
        id: parseInt(postId),
      },
    });

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error during delete post:", error);
    res.status(500).json({ error: "An error occurred while deleting the post" });
  } finally {
    prisma.$disconnect(); // Prismaクライアントを切断
  }
}
