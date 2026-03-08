import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { url, method = 'GET', headers = {}, body: reqBody } = body
    const start = performance.now()
    const res = await fetch(url, { method, headers, body: reqBody })
    const text = await res.text()
    const duration = performance.now() - start
    return NextResponse.json({ status: res.status, ok: res.ok, duration, body: text }, { headers: { 'Access-Control-Allow-Origin': '*' } })
  } catch (err: any) {
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } })
  }
}
