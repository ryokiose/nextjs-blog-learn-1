export default function handler(req, res) {
  const userName = req.body.name;
  const userEmail = req.body.email;
  console.log(userName, userEmail);
  res.status(200).json({ name: userName, email: userEmail })
}