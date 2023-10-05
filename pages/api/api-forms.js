import { PrismaClient } from "@prisma/client";

async function Post(userName, userEmail) {
  const prisma = new PrismaClient();
  const newPost = await prisma.Post.create({
    data: {
      name: userName,
      email: userEmail,
    },
  });
}

export default function handler(req, res) {
  const userName = req.body.name;
  const userEmail = req.body.email;
  Post(userName, userEmail);
  res.status(200).json({ name: userName, email: userEmail })
}