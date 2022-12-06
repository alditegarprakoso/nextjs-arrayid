import db from "../../../libs/db";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const data = req.body;

  const dataUser = await db("users").where("email", data.email).first();
  if (!dataUser) return res.status(401).end();

  const checkPassword = await bycrypt.compare(data.password, dataUser.password);

  if (!checkPassword) return res.status(401).end();

  const token = jwt.sign(
    {
      id: dataUser.id,
      email: dataUser.email,
    },
    "isiApaAjaBebas", // ini adalah token yang isinya bebas mau apa aja dan alangkah lebih baik di taruh pada file .env
    {
      expiresIn: "7d",
    }
  );

  res.status(200);
  res.json({ message: "Login successfully", token: token });
}
