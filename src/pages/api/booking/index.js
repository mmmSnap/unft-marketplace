import {Deta} from "deta";
import {getServerSession} from "next-auth/next";
import {authOptions} from "../auth/[...nextauth]";
import {runMiddleware} from "../v1/search";

export async function GetBookingDetails(key){
    const deta = Deta(process.env.DETA_PROJECT_KEY);
    const bookings_database = deta.Base(process.env.BOOKINGS_TABLE_NAME);
    let booking = await bookings_database.get(key);
    return booking
}   
export default async function handler(req, res) {
    await runMiddleware(req, res);

    const deta = Deta(process.env.DETA_PROJECT_KEY);
    const bookings_database = deta.Base(process.env.BOOKINGS_TABLE_NAME);

    let session = await getServerSession(req, res, authOptions);
    const users_database = deta.Base(process.env.USERS_TABLE_NAME);
    let user = (await users_database.fetch({email: session.user.email})).items[0];

    let from = new Date(req.body.from)
    let to = new Date(req.body.to)

    if (req.method === "POST") {
        let booking = await bookings_database.insert({
            "by": user.key,
            "for": req.body.for,
            "from": req.body.from,
            "to": req.body.to,
            "address": req.body.address,
            "address_type": req.body.address_type,
            "amount": (to - from).days,
            "bookingDate": req.body.bookingDate,
            "created_at": new Date(),
            "bookingStatus": 'success',        //based on the payment status need to update this field
        })
        res.status(200).json(booking)
    } else if (req.method === "GET") {
        let user = req.query.user || "explorer";
        let booking;

        if (user === "explorer") {
            booking = await bookings_database.fetch({by: user.key});
        } else {
            booking = await bookings_database.fetch({for: user.key});
        }
        res.status(200).json(booking)
    }
}
