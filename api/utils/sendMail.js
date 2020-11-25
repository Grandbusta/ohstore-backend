const nodeMailer=require('nodemailer')


const sendMail=async(sendAddress,subject,content)=>{
    const transporter=nodeMailer.createTransport({
        service:'gmail',
        auth:{
            user:'gobusta1@gmail.com',
            pass:'Grandbusta1'
        }
    })

    let mailOptions={
        from:'Ohstore',
        to:sendAddress.toString(),
        subject:subject.toString(),
        text:content.toString()
    }
try {
    const sendy=await transporter.sendMail(mailOptions)
    return sendy
} catch (error) {
    return error
}
    
}


module.exports=sendMail
