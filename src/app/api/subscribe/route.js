import fs from 'fs'
import { google } from 'googleapis';
import { NextResponse } from "next/server"

import { sendEmail } from "@/app/lib/emails/utils";
import { getGoogleAuth, updateSheet, getRows } from "@/app/lib/googleapi/utils"

export const POST = async req => {
    const body = await req.json()

    const { email } = body

    const { auth , client } = await getGoogleAuth()
    if (!auth || !client) return NextResponse.json(
        { error : 'Internal server error' },
        { status : 502}
    )

    const range = 'NEWSLETTER'
    const sheets = google.sheets({ version : 'v4' , auth : client })
    const rows = await getRows({ auth , sheets, range })

    const emailRowIndex = rows.findIndex(row => row[0] === email)
    const emailRow = [ email, new Date().toLocaleDateString('fr-FR'), '' , '']
    
    const values = [...rows]

    if (emailRowIndex > -1) {
        if (!rows[emailRowIndex][2]) return NextResponse.json(
            { error : 'Already subscribed to newsletter' },
            { status : 409 }
        )
        values[emailRowIndex] = emailRow
    } else { 
        values.push(emailRow)
    }   

    await updateSheet({ auth , sheets, values, range })

    
    const getHtmlEmail = async () => new Promise(
        (resolve, reject ) => {
            fs.readFile(
                './src/app/lib/emails/html/subscribe.html',
                'utf-8',
                (err, html) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(html)
                }
            )
        }
    )

    // try {
    //     const html = await getHtmlEmail()
    //     const parsedHtml = html
    //         .replace('#unsubscribe', `http://localhost:3000/unsubscribe?email=${email}` )
    //     sendEmail({ 
    //         to : email , 
    //         subject : '♡ Thank you ♡', 
    //         html : parsedHtml
    //     })
    //     sendEmail({ 
    //         to : process.env.NEWSLETTER_EMAIL_ADDRESS , 
    //         subject : 'NEW SUBSCRIBER',
    //         text : `${email} subscribed`,
    //     })
    // } catch {
    //     return NextResponse.json({error: 'Server error'}, { status : 503 })
    // }

    return NextResponse.json({}, { status : 200 })

}