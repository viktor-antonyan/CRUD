import {getData} from "./getData";

export function getUserByEmail(email) {
    return getData(`SELECT * FROM members WHERE email = '${email}'`);
}