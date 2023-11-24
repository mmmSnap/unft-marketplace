import { Deta } from "deta";

export default async function handler(
    req,
    res
) {
    console.log(req.query.key)
    const deta = Deta(process.env.DETA_PROJECT_KEY);
    const photographer_database = deta.Base(process.env.PHOTOGRAPHERS_TABLE_NAME);
    let photographers = await photographer_database.fetch({ key: req.query.key });
    res.status(200).json(photographers.items[0] || {})
}
