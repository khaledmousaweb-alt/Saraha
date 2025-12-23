import { Router } from "express";
import * as UCC from './user.controller.js'
import * as UV from "./user.validation.js"
import { authorization_allowers, authuntication } from "../../middleWares/auth.middleware.js";
import { validation } from "../../middleWares/validation.middel.js";
const router=Router();

router.get('/',authuntication,authorization_allowers(["User"]),UCC.getUser)
router.patch('/updateuser/:id',validation(UV.userupdateschema) ,UCC.updateuser)
router.patch('/changepassword',validation(UV.changePasswordschema),UCC.changePassword)

export default router;