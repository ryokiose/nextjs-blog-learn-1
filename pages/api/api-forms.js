export default function handler(req, res) {
  res.status(200).json({ name: req.body.name, email: req.body.email })
}