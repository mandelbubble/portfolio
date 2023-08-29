import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user : process.env.EMAIL_ADDRESS,
        pass : process.env.EMAIL_PASSWORD,
    }
})

export const sendEmail = async ({ to , subject , text , html }) => {
    const mailOptions = {
        from : `"Alex Peresson 👩‍💻" <${process.env.EMAIL_ADDRESS}>`,
        to, 
        subject,
        text,
        html,
    }

    try {
        await new Promise(
            (res, rej) => {
                transporter.sendMail(mailOptions),
                (err, info) => {
                    if (err) rej(err)
                    resolve(info)
                }
            }
        )
        return true
    } catch {
        return false
    }
}