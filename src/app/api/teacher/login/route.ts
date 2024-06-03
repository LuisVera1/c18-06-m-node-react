import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { compare } from 'bcrypt-ts';
import prisma from '@/app/lib/prisma';
import * as yup from 'yup';

import { createToken, validateData } from '@/app/lib/';

const postSchema = yup.object({
	email: yup.string().trim().email().required(),
	password: yup.string().required().trim().min(8),
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
		// check if user exist
		const response = await prisma.teacher.findUnique({
			where: {
				email: email.toLowerCase(),
			},
		});
		console.log('🚀 - response:', response);

		if (!response) {
			return NextResponse.json(
				{ ok: false, message: 'wrong email or password' },
				{ status: 400 }
			);
		}

		//check status
		if (response.status !== 'Activo') {
			return NextResponse.json(
				{ ok: false, message: 'the user is not active' },
				{ status: 403 }
			);
		}

		// matching password
		const matching = await compare(password, response.password);

		if (!matching) {
			return NextResponse.json(
				{ ok: false, message: 'wrong email or password' },
				{ status: 400 }
			);
		}

		// generate token
		const token = await createToken({
			email: response.email,
			role: response.role,
			code: response.code,
		});

		const loginUserData = {
			ok: true,
			message: 'successful login',
			data: response,
		};

		cookies().set({
			name: 'session',
			value: token,
			httpOnly: false,
			path: '/',
		});

		return NextResponse.json(loginUserData, {
			status: 200,
		});
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ ok: false, message: 'server error' },
			{ status: 500 }
		);
	}
}
