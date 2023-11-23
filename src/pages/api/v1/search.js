import Cors from 'cors';
import {Deta} from "deta";


export async function searchPhotographers(query) {
    query = query || "";

    const deta = Deta(process.env.DETA_PROJECT_KEY);
    const photographers_database = deta.Base("photographers");
    let result = await photographers_database.fetch();
    let items = result.items;

    while (result.last !== undefined) {
        result = await photographers_database.fetch({last: result.last});
        items = items.concat(result.items);
    }

    let filtered = items;

    query.trim().split(" ").forEach(q => {
            filtered = filtered.filter(item => item.name?.toLowerCase().startsWith(q.toLowerCase()) ||
                item.address?.toLowerCase().includes(q.toLowerCase()) ||
                item.phone?.toLowerCase().startsWith(q.toLowerCase())
            );
        }
    );

    return {
        count: filtered.length,
        items: filtered,
        last: null
    };
}

const cors = Cors({
    methods: ['GET', 'PATCH', 'POST'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export function runMiddleware(
    req,
    res
) {
    return new Promise((resolve, reject) => {
        cors(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}

export default async function handler(
    req,
    res
) {
    // Run the middleware
    await runMiddleware(req, res)

    // Rest of the API logic
    res.status(200).json(await searchPhotographers(req.query.query))
}
