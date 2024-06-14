import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
	cookies().delete('session');

	return NextResponse.json({ ok: true, message: 'log out' });
}
