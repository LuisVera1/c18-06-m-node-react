import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
	const body = await req.json();

	try {
		return NextResponse.json({ ...body }, { status: 201 });
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ ok: false, message: 'server error' },
			{ status: 500 }
		);
	}
}
