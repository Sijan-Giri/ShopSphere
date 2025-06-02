import nodemailer from "nodemailer"
import { envConfig } from "../config/config"

interface OptionData{
    to : string,
    subject : string,
    text : string
}

const sendEmail = async(option:OptionData) => {
    try {
        const transporter = nodemailer.createTransport({
        service : "gmail",
        auth : {
            user : envConfig.emailUser,
            pass : envConfig.emailPass 
        }
    })
    const mailOptions = {
        from : "ShopSphere<girisijan346@gmail.com>",
        to : option.to,
        subject : option.subject,
        text : option.text
    }
    await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log(error)
    }
}

export default sendEmail