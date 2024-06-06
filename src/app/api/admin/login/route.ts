import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { compare } from 'bcrypt-ts';
import prisma from '@/app/lib/prisma';
import * as yup from 'yup';

import { createToken, validateData } from '@/app/lib';

const postSchema = yup.object({
	email: yup.string().lowercase().trim().email().required(),
	password: yup.string().required().trim().min(8),
});

export async function POST(req: Request) {
	const body = await req.json();

	//data validaction
	const validation = await validateData(postSchema.validate(body));

	if (!validation.ok) {
		return NextResponse.json(
			{ ok: false, message: 'verify email and password' },
			{ status: 400 }
		);
	}

	const { password, email } = validation;
	try {
		//check if admin exist
		const response = await prisma.admin.findUnique({
			where: {
				email: email,
			},
		});

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
			superAdmin: response.superAdmin,
		});

		const loginUserData = {
			ok: true,
			message: 'successful login',
			data: { ...response, password: '' },
		};

		cookies().set({
			name: 'session',
			value: token,
			httpOnly: false,
			path: '/',
		});

		return NextResponse.json(loginUserData, {
			status: 200,
			// headers: { 'Set-Cookie': `session=${token}` },
		});
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ ok: false, message: 'server error' },
			{ status: 500 }
		);
	}
}
