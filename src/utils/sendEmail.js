import nodemailer from 'nodemailer';


export const sendEmail = async ({to , subject , html}) => {
   
    const transport=nodemailer.createTransport({

    host:"smtp.gmail.com",
    port:465,
    secure:true,
    auth:{

       user:"khaledmousa.is.fcai@gmail.com",
        pass:"pdxv lcrr fphn myde"
    }

    })

    const info= await transport.sendMail({
        from:"khaledmousa.is.fcai@gmail.com",
        to,
        subject,
        html

    })
    // console.log(info)
   
return info.rejected.length===0 ? true : false; 

  
}

 export const subject={
    register:"email_confirmation",
    reset:"resett"
   } 
