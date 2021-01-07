const nodeMailer=require('nodemailer')
const {MAIL_USER,MAIL_PASS}=require('../config/env')

const sendMail=async(info)=>{
    const transporter=nodeMailer.createTransport({
        service:'gmail',
        auth:{
            user:MAIL_USER,
            pass:MAIL_PASS
        }
    })

    let mailOptions={
        from:'Ohstore',
        to:info.address,
        subject:info.title,
        html:info.content
    }
try {
    const sendy=await transporter.sendMail(mailOptions)
    return sendy
} catch (error) {
    return error
}
    
}


module.exports=sendMail
