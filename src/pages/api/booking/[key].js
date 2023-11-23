import {Deta} from "deta";
import {getServerSession} from "next-auth/next";
import {authOptions} from "../auth/[...nextauth]";

 
 
export default async function handler(req, res) {
    const deta = Deta(process.env.DETA_PROJECT_KEY);
    const bookings_database = deta.Base(process.env.BOOKINGS_TABLE_NAME);

    let session = await getServerSession(req, res, authOptions);
    const users_database = deta.Base(process.env.USERS_TABLE_NAME);
    let user = (await users_database.fetch({email: session.user.email})).items[0];

    let booking = await bookings_database.get(req.query.key);

    // if (booking?.by !== user.key) {
    //     res.status(401).json({message: "Unauthorized"});
    //     return;
    // }

    if (req.method === "PATCH") {
        await bookings_database.update({
            "for": req.body.for,
            "from": req.body.from,
            "to": req.body.to,
            "address": req.body.address,
            "address_type": req.body.address_type,
            "amount": req.body.amount,
        }, req.query.key);
    } else if (req.method === "DELETE") {
        await bookings_database.delete(req.query.key);
    }

    res.status(200).json(booking)
}
