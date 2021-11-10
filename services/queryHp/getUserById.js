import {getData} from "./getData";

export function getUserById(id) {
    return getData(`SELECT * FROM members WHERE id = '${id}'`);
}