import express from "express";

import {MembersController} from "../controllers/MembersController";
import {body} from "express-validator";

const router = express.Router();

router.get('/', MembersController.getAllMembers)
router.get('/user/:id', MembersController.getMemberById)
router.post('/',
    body('first_name').isLength({min: 4, max: 255}),
    body('last_name').isLength({min: 4, max: 255}),
    body('email').isEmail().optional(),
    MembersController.createMember)
router.put('/',
    body('first_name').isLength({min: 4, max: 255}),
    body('last_name').isLength({min: 4, max: 255}),
    body('email').isEmail().optional(),
    MembersController.update)
router.delete('/:id', MembersController.deleteById)

export default router;
