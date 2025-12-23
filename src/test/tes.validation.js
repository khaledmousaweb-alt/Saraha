import joi from 'joi';

const user={
    id:"12345678901234",
    userName:"khaled",
    email:"Khaled123@gmail.com",
    password:"12345678",
    confirmPassword:"12345678",
    Agge:22,
    skills:["nodejs","expressjs","mongodb"]
}

const userSchema=joi.object({
    id:joi.string().pattern(new RegExp('^[0-9]{14}$')),
    userName:joi.string().min(3).max(30).required(),
    email:joi.string().email().required(),
    password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    confirmPassword:joi.ref('password'),
    Agge:joi.number().min(10).max(60).required(),
    skills:joi.array().items(joi.string().required()).required()
})

const {error,value}=userSchema.validate(user);
if(error){
    console.log("Validation Failed ",error.details[0].message);
}else{
    console.log("Validation Success ",value);
}