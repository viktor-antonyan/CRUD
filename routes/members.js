import express from "express";

import {MembersController} from "../controllers/MembersController";
import {body} from "express-validator";
import {getUserByEmail} from "../services/queryHp/getUserByEmail";

const router = express.Router();

router.get('/', MembersController.getAllMembers)
router.get('/user/:id', MembersController.getMemberById)
router.post('/',
    body('first_name').isLength({min: 4, max: 255}),
    body('last_name').isLength({min: 4, max: 255}),
    body('email').isEmail().optional().custom(async email=>{
        const candidate = await getUserByEmail(email);
        if (candidate.length) {
            return Promise.reject('Eil already exists')
        }
    }),
    MembersController.createMember)
router.put('/',
    body('first_name').isLength({min: 4, max: 255}),
    body('last_name').isLength({min: 4, max: 255}),
    body('email').isEmail().optional(),
    MembersController.update)
router.delete('/:id', MembersController.deleteById)

export default router;
