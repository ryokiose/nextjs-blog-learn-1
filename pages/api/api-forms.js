// api/api-forms.js
import { PrismaClient } from "@prisma/client";

let prisma; // グローバルなPrismaClientインスタンスを作成

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  try {
    // グローバルなPrismaClientインスタンスを作成（一度だけ）
    if (!prisma) {
      prisma = new PrismaClient();
    }

    const newPost = await prisma.Post.create({
      data: {
        name: name,
        email: email,
      },
    });

    res.status(200).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "An error occurred while creating the post" });
  }
}
