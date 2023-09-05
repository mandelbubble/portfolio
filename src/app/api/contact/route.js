import { NextResponse } from "next/server"

export const POST = async req => {

    const body = await req.json()

    await new Promise(res => setTimeout(res, 3000))
    return NextResponse.json({}, { status : 200 })
}