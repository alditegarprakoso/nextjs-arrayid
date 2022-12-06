import db from "../../../../libs/db";

export default async function handler(req, res) {
  if (req.method !== "PATCH") return res.status(405).end();

  const { id } = req.query;
  const data = req.body;

  const update = await db("posts").where({ id: id }).update({
    title: data.title,
    content: data.content,
  });

  const updatedData = await db("posts").where("id", id).first();

  res.status(200);
  res.json({ message: "Successfully update data", data: updatedData });
}
