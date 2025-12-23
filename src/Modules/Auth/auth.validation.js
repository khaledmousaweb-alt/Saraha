
import joi from 'joi';
const registerschema=joi .object({
    userName:joi.string().min(3).max(30).required(),
    email:joi.string().email().required(),
    password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    confirmPassword:joi.ref('password'),
    Phone:joi.string().required()
})

const loginschema=joi .object({
    email:joi.string().email().required(),
    password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    // password:joi.types.objectId()
})

export {registerschema,loginschema}