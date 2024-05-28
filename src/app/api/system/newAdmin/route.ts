import { NextResponse } from 'next/server';
import { hash } from 'bcrypt-ts';

export async function POST(req: Request, res: Response) {
	const { password } = await req.json();

	try {
		//hash password
		const hashedPassword = await hash(password, Number(process.env.SALT) || 10);
		console.info({ hasedPassword: hashedPassword });

		return NextResponse.json(
			{ ok: true, message: 'generated password' },
			{ status: 200 }
		);
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ ok: false, message: 'Server error' },
			{ status: 500 }
		);
	}
}
