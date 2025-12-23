
export const validation=(schema)=>{
    return (req,res,next)=>{  
        const data={...req.body,...req.params,...req.query};  
        const resutl =schema.validate(data,{abortEarly:false});
        if(resutl.error){
            
            return next (new Error (resutl.error))
        }
        return next();

}
}