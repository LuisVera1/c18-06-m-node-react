import { NextResponse } from 'next/server';
import { compare } from 'bcrypt-ts';
import prisma from '@/app/lib/prisma';
import * as yup from 'yup';

import { createToken, validateData } from '@/app/lib/';

const postSchema = yup.object({
	email: yup.string().trim().email().required(),
	password: yup.string().required().trim().min(6),
});

export async function POST(req: Request) {
	const body = await req.json();

	// validate data
	const validation = await validateData(postSchema.validate(body));

	if (!validation.ok) {
		return NextResponse.json(
			{ ok: false, message: 'verify email and password' },
			{ status: 400 }
		);
	}

	const { email, password } = body;
	try {
		// check if student exist
		const response = await prisma.student.findUnique({
			where: {
				email: email,
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
			email: response.email,
			role: response.role,
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
