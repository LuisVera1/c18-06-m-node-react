import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import prisma from '@/app/lib/prisma';
import { hash } from 'bcrypt-ts';
import * as yup from 'yup';
import { validateToken, validateData } from '@/app/lib';

const postSchema = yup.object({
	name: yup.string().trim().required(),
	code: yup.number().required(),
	password: yup.string().required().trim().min(6),
	email: yup.string().trim().email().required(),
});

export async function POST(req: Request, res: Response) {
	const body = await req.json();

	// data validation
	const dataValidation = await validateData(postSchema.validate(body));

	if (!dataValidation.ok) {
		return NextResponse.json(
			{ ok: false, message: 'verify data' },
			{ status: 400 }
		);
	}

	// check cookie
	const session = cookies().get('session')?.value;

	if (!session) {
		return NextResponse.json(
			{ ok: false, message: 'session does not exist' },
			{ status: 401 }
		);
	}

	// validate token & admin user
	const validToken = await validateToken(session);

	if (!validToken.ok || validToken.role != 'Admin') {
		return NextResponse.json(
			{ ok: false, message: 'invalid session' },
			{ status: 401 }
		);
	}

	// creating user
	const { name, code, password, email } = dataValidation;

	try {
		//check if user already exist
		const user = await prisma.student.findUnique({
			where: {
				code: code,
			},
		});

		if (user) {
			return NextResponse.json(
				{ ok: false, message: 'user already exist' },
				{ status: 400 }
			);
		}

		const hashedPassword = await hash(password, 10);

		const response = await prisma.student.create({
			data: {
				name: name,
				code: code,
				password: hashedPassword,
				email: email,
			},
		});

		return NextResponse.json(
			{ ok: true, message: 'new user created', data: response },
			{ status: 201 }
		);
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ ok: false, message: 'Server error' },
			{ status: 500 }
		);
	}
}
