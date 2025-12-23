

import { Router } from "express";
import * as UC from './Auth.controller.js'
import { activate_email } from "./activate_email.js";
import * as USV from './auth.validation.js'
import { validation } from "../../middleWares/validation.middel.js";
const router=Router();

router.post('/register',validation(USV.registerschema),UC.register)
router.post('/login',validation(USV.loginschema),UC.Login)
router.get("/activate_email/:token",activate_email)
export default router