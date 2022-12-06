import db from "../../../../libs/db";

export default async function handler(req, res) {
  if (req.method !== "DELETE") return res.status(405).end();

  const { id } = req.query;
  const dataPost = await db("posts").where("id", id).first();

  const deleteData = await db("posts").where({ id: id }).del();

  res.status(200);
  res.json({ message: "Successfully delete data", data: dataPost });
}
