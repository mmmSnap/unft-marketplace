import {useSession} from "next-auth/react";
import {
    ADDRESS_TYPE,
    AREA_STREET,
    CITY,
    COUNTRY,
    DATE_OF_BIRTH,
    EMAIL_ID,
    EXPERTISE,
    FIRST_NAME,
    FLAT_HOUSE_NO,
    GENDER,
    LAND_MARK,
    LAST_NAME,
    PHONE_NUMBER,
    PINCODE,
    PRICE,
    PRICE_VALUE,
    SKILLS,
    STATE
} from "../component/const/constFile";

export function fetchUserDetailsFromGoogle(given_session) {
    let accessToken;
    if (given_session !== undefined && given_session.accessToken !== undefined) {
        accessToken = given_session.accessToken;
    } else {
        accessToken = useSession().data?.accessToken;
    }

    function parseResponse(data) {
        return {
            [FIRST_NAME]: data?.names[0]?.givenName,
            [LAST_NAME]: data?.names[0]?.familyName,
            [EMAIL_ID]: data?.emailAddresses[0]?.value,
            [PHONE_NUMBER]: "",
            [DATE_OF_BIRTH]: data?.birthdays[1]?.date,
            [GENDER]: data?.genders[0].value,
            [SKILLS]: "",
            [EXPERTISE]: "",
            [PRICE]: "",
            [PRICE_VALUE]: "",
            [ADDRESS_TYPE]: "",
            [FLAT_HOUSE_NO]: "",
            [AREA_STREET]: "",
            [LAND_MARK]: "",
            [PINCODE]: "",
            [CITY]: "",
            [STATE]: "",
            [COUNTRY]: "",
        }
    }

    if (accessToken !== undefined) {
        return fetch(`https://people.googleapis.com/v1/people/me?` + "personFields=" + ["addresses", "birthdays", "coverPhotos", "emailAddresses", "genders", "metadata", "names", "organizations", "phoneNumbers", "photos"].join(","), {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }).then(response => response.json()).then(data => parseResponse(data)).catch(exception => {
            console.log(exception);
            return {}
        });
    } else {
        console.log("AccessToken missing")
    }

    return {}
}