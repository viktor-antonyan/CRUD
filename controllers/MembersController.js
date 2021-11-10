import connection from "../services/db";
import {getUserByEmail} from "../services/queryHp/getUserByEmail";
import {getUserById} from "../services/queryHp/getUserById";
import {validationResult} from "express-validator";
import HttpError from "http-errors";
import moment from "moment";


export class MembersController {
    static async getAllMembers(req, res, next) {
        try {
            await connection.query('SELECT * FROM members', function (error, results, fields) {
                if (error) throw error;
                res.json({
                    status: 'ok',
                    members: results
                })
            });
        } catch (e) {
            next(e)
        }
    }

    static async getMemberById(req, res, next) {
        try {
            const {id} = req.params
            await connection.query(`SELECT * FROM members WHERE id = ${id}`, function (error, results, fields) {
                if (error) throw error;
                res.json({
                    status: 'ok',
                    member: results
                })
            });
        } catch (e) {
            next(e)
        }
    }

    static async createMember(req, res, next) {
        try {
            let now = new Date();
            const momentDate = moment(now).format('YYYY-MM-DD')

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(HttpError('validation error', errors.array()))
            }
            const {first_name, last_name, email, date_of_birth} = req.body
            const created_at = momentDate
            const updated_at = momentDate
            const candidate = await getUserByEmail(email)
            if (candidate[0]) {
                res.json({
                    status: 'error',
                    message: "email already exists"
                })
            }
            await connection.query(`INSERT INTO members(first_name, last_name, email, date_of_birth, created_at, updated_at) 
                                    VALUES('${first_name}','${last_name}','${email}','${date_of_birth}','${created_at}','${updated_at}')`,
                function (error, results, fields) {
                    if (error) throw error;
                    res.json({
                        status: 'ok',
                        message: 'user successfully inserted'
                    })
                });
        } catch (e) {
            next(e)
        }
    }

    static async update(req, res, next) {
        try {
            let now = new Date();
            const momentDate = moment(now).format('YYYY-MM-DD')
            const errors = validationResult(req)
            const updated_at = momentDate

            if (!errors.isEmpty()) {
                return next(HttpError('validation error', errors.array()))
            }
            const {first_name, last_name, email, date_of_birth} = req.body
            const candidate = await getUserByEmail(email);
            if (!candidate[0]) {
                res.json({
                    status: 'error',
                    message: "not a user in email" + email
                })
            }

            await connection.query(`UPDATE members SET first_name = '${first_name}', last_name = '${last_name}', date_of_birth = '${date_of_birth}', updated_at = '${updated_at}'  
                WHERE email = '${email}'`, function (error, results, fields) {
                if (error) throw error;
                res.json({
                    status: 'ok',
                    message: 'user successfully updated'
                })
            });
        } catch (e) {
            next(e)
        }
    }

    static async deleteById(req, res, next) {
        try {
            let {id} = req.params
            const candidate = await getUserById(id);
            if (!candidate[0]) {
                throw new Error('not user in id' + id)
            }

            await connection.query(`DELETE FROM members WHERE id = '${id}'`, function (error, results, fields) {
                if (error) throw error;
                res.json({
                    status: 'ok',
                    message: 'user successfully deleted'
                })
            });
        } catch (e) {
            next(e)
        }
    }
}