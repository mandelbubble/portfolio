import { sendEmail } from "@/app/lib/emails/utils"
import { NextResponse } from "next/server"

export const POST = async req => {

    const body = await req.json()

    const { email , name , subject, message } = body

    const html = `
        <p><u><b> name </b></u> : ${name} </p>
        <p><u><b> email </b></u> : ${email} </p>
        <p><u><b> subject </b></u> : ${subject} </p>
        <br/>
        <p> ${message} </p>
    `

    sendEmail({
        to : process.env.EMAIL_ADDRESS,
        subject : 'CONTACT',
        html,
    })

    return NextResponse.json({}, { status : 200 })
}