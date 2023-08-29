import { google } from 'googleapis'

export const getGoogleAuth = async () => {

    const { GOOGLE_CREDENTIALS } = process.env

    const credentialsBuffer = Buffer.from(GOOGLE_CREDENTIALS, "base64").toString()
    const credentials = JSON.parse(credentialsBuffer)

    const auth = new google.auth.GoogleAuth({
        projectId: credentials['project_id'],
        credentials: {
            client_email: credentials['client_email'],
            private_key: credentials['private_key']
        },
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    })

    try {
        const client = await auth.getClient()
        return { auth , client }
    } catch (error) {
        return {}
    }
}

export const getRows = async ({ auth, sheets, range }) => {
    const { SHEETS_ID } = process.env

    try {
        const rows = await sheets.spreadsheets.values.get({
             auth,
             spreadsheetId: SHEETS_ID,
             range,
         })
        return rows?.data?.values || []
    } catch (error) {
        return []
    }
}

export const updateSheet = async ({auth, sheets, values, range}) => {
    const { SHEETS_ID } = process.env

    try {
        await sheets.spreadsheets.values.update({
            auth,
            spreadsheetId: SHEETS_ID,
            range,
            valueInputOption: 'USER_ENTERED',
            resource: {
                values
            }
        })
        return true
    } catch (error) {
        return false    
    }
}