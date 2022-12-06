import db from "../../../libs/db";
import bycrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const data = req.body;
  const salt = bycrypt.genSaltSync(10);
  const passwordHash = bycrypt.hashSync(data.password, salt);

  const register = await db("users").insert({
    email: data.email,
    password: passwordHash,
  });

  const dataUser = await db("users").where("id", register).first();

  res.status(200);
  res.json({ message: "User created successfully", data: dataUser });
}
