import { Deta } from "deta";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export async function getPhotographer(email) {
  const deta = Deta(process.env.DETA_PROJECT_KEY);
  const photographers_database = deta.Base(process.env.USERS_TABLE_NAME);

  return await photographers_database.fetch({ email: email });
}

export async function getPhotographerByKey(pgKey){
     const deta = Deta(process.env.DETA_PROJECT_KEY);
  const photographer_database = deta.Base(process.env.PHOTOGRAPHERS_TABLE_NAME);
  let photographers = await photographer_database.fetch({
    key: pgKey,
  });
  return await photographers
}

export async function updateAlbum(key, album) {
  const deta = Deta(process.env.DETA_PROJECT_KEY);
  const photographers_database = deta.Base(process.env.USERS_TABLE_NAME);
  return await photographers_database.update({ album: album }, key);
}

export default async function handler(req, res) {
  let session = await getServerSession(req, res, authOptions);

  switch (req.method) {
    case "GET":
      res.status(200).json(await getPhotographer(session.user.email));
      break;
    case "PATCH":
      let key = (await getPhotographer(session.user.email)).items[0].key;
      res.status(200).json(await updateAlbum(key, req.body));
      break;
  }
}
