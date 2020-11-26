const nodeMailer=require('nodemailer')


const sendMail=async(info)=>{
    const transporter=nodeMailer.createTransport({
        service:'gmail',
        auth:{
            user:'gobusta1@gmail.com',
            pass:'Grandbusta1'
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
