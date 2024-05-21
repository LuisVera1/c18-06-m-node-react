import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import prisma from '@/app/lib/prisma';
import { hash } from 'bcrypt-ts';
import * as yup from 'yup';
import { validateToken, validateData } from '@/app/lib';

const postSchema = yup.object({
	code: yup.number().required(),
	status: yup.string().trim().required(),
});

export async function PATCH(req: Request, res: Response) {
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
	console.log('🚀 - session:', session);

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
	const { code, status } = dataValidation;

	try {
		const response = await prisma.student.update({
			where: {
				code: code,
			},
			data: {
				status: status,
			},
		});

		return NextResponse.json(
			{ ok: true, message: 'student updated', data: response },
			{ status: 201 }
		);
	} catch (err: any) {
		//studen not found
		if (err.code === 'P2025') {
			return NextResponse.json(
				{ ok: false, message: 'student not found' },
				{ status: 404 }
			);
		}

		console.error(err);
		return NextResponse.json(
			{ ok: false, message: 'Server error' },
			{ status: 500 }
		);
	}
}
