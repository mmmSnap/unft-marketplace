import {Deta} from "deta";

export default async function handler(req, res) {

    if (!req.headers.api_key || req.headers.api_key !== process.env.API_KEY) {
        return res.status(401).json("Unauthorized");
    }

    const deta = Deta(process.env.DETA_PROJECT_KEY);
    const leads_database = deta.Base("leads");
    await leads_database.insert({
        ...req.body
    });
    res.status(200).json("Lead saved successfully!")
}
