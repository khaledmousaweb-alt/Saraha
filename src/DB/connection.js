

import mongoose from "mongoose";

export  const DBConnection=async()=>{

     await mongoose.connect(process.env.DB_URL)
    .then((res)=>console.log('DB Connected Successfully')
    )
    .catch((err)=>console.log('Faild To Connect')
    )
}
