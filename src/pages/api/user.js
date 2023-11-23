import {Deta} from "deta";
import {authOptions} from "./auth/[...nextauth]";
import {getServerSession} from "next-auth/next";
import {fetchUserDetailsFromGoogle} from "../../services/googleUserService";
import {DATE_OF_BIRTH, FIRST_NAME, GENDER, LAST_NAME,} from "../../component/const/constFile";
import {faker} from "@faker-js/faker/locale/en_IND";
import sendEmail from "./sendgrid";

export default function handler(request, response) {
    return new Promise(async (resolve) => {
        const session = await getServerSession(request, response, authOptions);

        if (!session?.user?.email) {
            response.status(401).json({user: "Not found!"});
            resolve();
            return;
        }

        const deta = Deta(process.env.DETA_PROJECT_KEY);
        const users_database = deta.Base("users");
        let users = await users_database.fetch({email: session?.user?.email});
        let user = await getOrCreateUser(users, session, users_database);

        switch (request.method) {
            case "GET":
                response.status(200).json(user);
                break;
            case "POST":
                for (let i = 0; i < 1; i++) {
                    let dateOfBirth = faker.date.birthdate();
                    await users_database.insert({
                        first_name: faker.name.firstName(),
                        last_name: faker.name.lastName(),
                        email: faker.internet.email(),
                        image: faker.image.avatar(),
                        phonenumber: faker.phone.number("+91##########"),
                        date_of_birth: `${dateOfBirth.getDate()}-${dateOfBirth.getMonth()}-${dateOfBirth.getFullYear()}`,
                        gender: Math.random() > 0.5 ? "Male" : "Female",
                        address_type: "Business/Studio Address",
                        address: {
                            "area-street": faker.address.street(),
                            "flat-house-no": faker.address.buildingNumber(),
                            "land-mark": faker.address.direction()
                        },
                        pincode: faker.address.zipCode("######"),
                        city: faker.address.city(),
                        state: faker.address.state(),
                        country: faker.address.country(),
                        skills: ["Photography"],
                        expertise: ["Travel", "Wedding"],
                        price: {
                            "label": "Full day (8 hours)"
                        },
                        price_value: Math.round(Math.random() * 200).toFixed(0),
                        insta_id: faker.internet.email(),
                        studio_name: "Faker Studio"
                    });
                }
                response.status(200).json(true);
                resolve();
                break;
            case "PATCH":
                if (!user) {
                    response.status(401).json({user: "Not found!"});
                    break;
                }
                await users_database.update({
                    first_name: request.body.first_name,
                    last_name: request.body.last_name,
                    email: request.body.email,
                    image: request.body.image,
                    phonenumber: request.body.phonenumber,
                    date_of_birth: request.body.date_of_birth,
                    gender: request.body.gender,
                    address_type: request.body.address_type,
                    address: request.body.address,
                    pincode: request.body.pincode,
                    city: request.body.city,
                    state: request.body.state,
                    country: request.body.country,
                    skills: request.body.skills,
                    expertise: request.body.expertise,
                    price: request.body.price,
                    price_value: request.body.price_value,
                    insta_id: request.body.insta_id,
                    studio_name: request.body.studio_name,
                }, user.key);
                response.status(200).json("Done");
                if(request.body.insta_id){
                await sendEmail(
                    "makemymemories2508@gmail.com",
                    "makemymemories2508@gmail.com", //snapforme@gmail.com
                    `[Lead from website]: User has updated the Instagram id - ${request.body.insta_id}`,
                    "MMM Team",
                    "[Action]: get his best clicks from his Instagram profile and create a new album with those photos.",
                );}
                break;
            default:
                response.status(405).json("Method not supported");
                break;
        }
        resolve();
    });
}

// ['studio address',]
export async function getOrCreateUser(users, session, users_database) {
    if (users.count === 0) {
        let google_data = await fetchUserDetailsFromGoogle(session);

        let users = await users_database.fetch({email: session.user.email});

        if (users.count === 0) {
            let newUser = await users_database.insert({
                first_name: google_data[FIRST_NAME] || session.user.name,
                last_name: google_data[LAST_NAME] || "",
                email: session.user.email,
                image: session.user.image,
                date_of_birth: [google_data[DATE_OF_BIRTH]?.day, google_data[DATE_OF_BIRTH]?.month, google_data[DATE_OF_BIRTH]?.year,].join("-"),
                gender: google_data[GENDER],
            });
            await sendEmail(
                newUser.email,
                "makemymemories2508@gmail.com",
                "[MakeMyMemories] Welcome onboard!",
                `${newUser.first_name} ${newUser.last_name}`,
                "Congratulations! Thanks for signing up with MakeMyMemories."
            );
            return newUser;
        } else {
            let user = users.items[0];
            return await users_database.update({
                first_name: google_data[FIRST_NAME] || user.first_name,
                last_name: google_data[LAST_NAME] || user.last_name,
                email: user.email,
                image: user.image,
                date_of_birth: [google_data[DATE_OF_BIRTH]?.day, google_data[DATE_OF_BIRTH]?.month, google_data[DATE_OF_BIRTH]?.year,].join("-"),
                gender: google_data[GENDER],
            }, user.key);
        }
    } else {
        return users.items[0];
    }
}
