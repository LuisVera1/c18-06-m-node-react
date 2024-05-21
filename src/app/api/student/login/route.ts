import { createToken } from '@/app/lib/createToken';
import prisma from '@/app/lib/prisma';
import { validateToken } from '@/app/lib/validateToken';
import { compare } from 'bcrypt-ts';
import { NextResponse } from 'next/server';

//for cookies
import { cookies } from 'next/headers';
//ref: https://supunawa.medium.com/next-js-app-router-authentication-sessions-cookies-jwts-7b4429a7fd31

export async function POST(req: Request, res: Response) {
	//TODO: validate data

	const body = await req.json();
	const { code, password } = body;

	try {
		const response = await prisma.student.findUnique({
			where: {
				code: Number(code),
			},
		});

		if (!response) {
			return NextResponse.json(
				{ ok: false, message: 'Bad request' },
				{ status: 400 }
			);
		}

		// matching password
		const matching = await compare(password, response.password);

		if (!matching) {
			return NextResponse.json(
				{ ok: false, message: 'Bad request' },
				{ status: 400 }
			);
		}

		// generate token
		const token = await createToken({
			id: 5,
			name: 'Luis',
		});

		//validate
		// const validToken = await validateToken(token)
		// console.log("🚀 - validToken:", validToken)

		//! Create cookie
		const cookieStore = cookies();
		cookieStore.set('token', token);

		const loginUserData = {
			ok: true,
			message: 'successful login user',
			data: response,
		};

		return NextResponse.json(loginUserData, {
			status: 200,
			headers: { 'Set-Cookie': `token=${token}` },
		});
	} catch (err) {
		console.error(err);
		return NextResponse.json({ route: 'login-fail' }, { status: 400 });
	}
}

/*

[x] sign token
[x] verify token
[x] create cookie
[x] retrun cookie
[] read cookie

*/
