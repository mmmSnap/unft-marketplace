import {Deta} from "deta";
import {runMiddleware} from "./v1/search";


export async function searchPhotographers(query) {
    if (query === undefined || query === null || query.trim().length === 0) return {count: 0, items: [], next: null};

    const deta = Deta(process.env.DETA_PROJECT_KEY);
    const users_database = deta.Base(process.env.USERS_TABLE_NAME);
    let result = await users_database.fetch();
    let items = result.items;

    while (result.last !== undefined) {
        result = await users_database.fetch({last: result.last});
        items = items.concat(result.items);
    }

    let filtered = items;

    query.trim().split(" ").forEach(q => {
            filtered = filtered.filter(item => item.first_name?.toLowerCase().startsWith(q.toLowerCase()) ||
                item.last_name?.toLowerCase().startsWith(q.toLowerCase()) ||
                item.address?.area_street?.toLowerCase().startsWith(q.toLowerCase()) ||
                item.address?.flat_house_no?.toLowerCase().startsWith(q.toLowerCase()) ||
                item.address?.land_mark?.toLowerCase().startsWith(q.toLowerCase()) ||
                item.city?.toLowerCase().startsWith(q.toLowerCase()) ||
                item.country?.label?.toLowerCase().startsWith(q.toLowerCase()) ||
                item.state?.toLowerCase().startsWith(q.toLowerCase()) ||
                item.pincode?.toLowerCase().startsWith(q.toLowerCase()) ||
                item.country?.label?.toLowerCase().startsWith(q.toLowerCase())
            );
        }
    );

    return {
        count: filtered.length,
        items: filtered,
        last: null
    };
}


export async function newSearchPhotographers(query) {
    if (query === undefined || query === null || query.trim().length === 0) return {count: 0, items: [], next: null};

    const deta = Deta(process.env.DETA_PROJECT_KEY);
    const photographers_database = deta.Base(process.env.PHOTOGRAPHERS_TABLE_NAME);
    let result = await photographers_database.fetch();
    let items = result.items;

    while (result.last !== undefined) {
        result = await photographers_database.fetch({last: result.last});
        items = items.concat(result.items);
    }

    let filtered = items;

    query.trim().split(" ").forEach(q => {
            filtered = filtered.filter(item => item.name?.toLowerCase().includes(q.toLowerCase()) ||
                item.address?.toLowerCase().includes(q.toLowerCase()) ||
                item.phone?.toLowerCase().includes(q.toLowerCase())
            )
        }
    );

    return {
        count: filtered.length,
        items: filtered,
        last: null
    };
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