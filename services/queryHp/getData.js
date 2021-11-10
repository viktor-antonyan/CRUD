import connection from "../db";

export async function getData(queryString){
    const promise = new Promise(((resolve, reject) => {
        connection.query(queryString, function (error, results, fields) {
            if (error) throw error;
            resolve(results)
        });
    }))
    const data = await promise;
    return data;
}