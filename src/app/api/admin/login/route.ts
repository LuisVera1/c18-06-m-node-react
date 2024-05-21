import { NextResponse } from 'next/server';
import { compare } from 'bcrypt-ts';
import prisma from '@/app/lib/prisma';
import * as yup from 'yup';

import { createToken } from '@/app/lib/createToken';
import { validateData } from '@/app/lib/validateData';

const postSchema = yup.object({
	code: yup.number().required(),
	password: yup.string().required().trim().min(6),
});

export async function POST(req: Request, res: Response) {
	const body = await req.json();

	//data validaction
	const validation = await validateData(postSchema.validate(body));

	if (!validation.ok) {
		return NextResponse.json(
			{ ok: false, message: 'verify code and password' },
			{ status: 400 }
		);
	}

	//check if admin exist
	const { password, code } = validation;

	try {
		const response = await prisma.admin.findUnique({
			where: {
				code: Number(code),
			},
		});

		if (!response) {
			return NextResponse.json(
				{ ok: false, message: 'wrong code or password' },
				{ status: 400 }
			);
		}

		// matching password
		const matching = await compare(password, response.password);

		if (!matching) {
			return NextResponse.json(
				{ ok: false, message: 'wrong code or password' },
				{ status: 400 }
			);
		}

		// generate token
		const token = await createToken({
			code: response.code,
			role: response.Role,
		});

		const loginUserData = {
			ok: true,
			message: 'successful login',
			data: response,
		};

		return NextResponse.json(loginUserData, {
			status: 200,
			headers: { 'Set-Cookie': `session=${token}` },
		});
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ ok: false, message: 'server error' },
			{ status: 500 }
		);
	}
}
