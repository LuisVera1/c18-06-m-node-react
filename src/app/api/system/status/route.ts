import { NextResponse } from 'next/server';

export async function GET() {
	return NextResponse.json(
		{ ok: true, message: 'Online' },
		{ status: 200 }
	);
}
