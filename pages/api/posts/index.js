import db from "../../../libs/db";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const { authorization } = req.headers;
  if (!authorization) return res.status(401).end(); // Handle jika authorization tidak ada pada headers

  const authSplit = authorization.split(" "); // Split authorization pada headers
  const [authType, authToken] = authSplit; // Kita desctruct dari array authSplit yang sudah di slice

  if (authType !== "Bearer") return res.status(401).end(); // Cegah bila authType nya bukan "Bearer", karena untuk pembelajaran sekarang kita menggunakan type Bearer

  try {
    const verify = jwt.verify(authToken, "isiApaAjaBebas"); // Sintaks ini berfungsi untuk mem-verifikasi token jwt atau proses decode dan "isiApaAjaBebas" itu adalah token yang kita buat di login yang dimana seharusnya disimpah pada file .env
    const posts = await db("posts");

    res.status(200);
    res.json({ message: "Data Posts", data: posts });
  } catch (error) {
    res.status(401).end();
  }
}
