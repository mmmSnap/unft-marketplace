import sendEmail from "./sendgrid";
export default function handler(request, response) {

    return new Promise(async (resolve) => {
        console.log("inside handler: " + JSON.stringify(request.body));
        console.log(request.method);
        switch (request.method) {
            case "POST"  :
                let sendQuery = await sendEmail(
                    "makemymemories2508@gmail.com",
                    "makemymemories2508@gmail.com",
                    `[User Query]: user email - ${request.body.email}`,
                    `${request.body.full_name}`,
                    `User Message: ${request.body.userQuery}`,
                );
                console.log(sendQuery);
                response.status(200).json(sendQuery);
        }

        resolve();
    });
}

// export default async function submitUserQuery(request, response) {

//         console.log("inside handler: " + JSON.stringify(request.body));
//         console.log(request.method);

//                 let sendQuery = await sendEmail(
//                     "makemymemories2508@gmail.com",
//                     "makemymemories2508@gmail.com",
//                     `[User Query]: user email id - ${request.body.email}`,
//                     `${request.body.first_name} ${request.body.last_name}`,
//                     `User Message: ${request.body.message}`,
//                 );
//                 return sendQuery;
// }