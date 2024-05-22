import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';
import { compare, hash } from 'bcrypt-ts';
import * as yup from 'yup';
import { validateData, checkRole } from '@/app/lib';

const postSchema = yup.object({
	password: yup.string().required().trim().min(6),
	newPassword: yup.string().required().trim().min(6),
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

	//validate session, token
	const validSession = await checkRole('Student');
	if (!validSession.token) {
		return NextResponse.json(
			{ ok: false, message: validSession.message },
			{ status: validSession.status }
		);
	}

	// update user password
	const { password, newPassword } = dataValidation;

	try {
		// search user
		const userResponse = await prisma.student.findUnique({
			where: {
				email: validSession.email,
			},
		});

		if (!userResponse) {
			return NextResponse.json(
				{ ok: false, message: 'wrong email or password' },
				{ status: 400 }
			);
		}

		//matching password
		const matching = await compare(password, userResponse.password);

		if (!matching) {
			return NextResponse.json(
				{ ok: false, message: 'wrong email or password' },
				{ status: 400 }
			);
		}

		//hashing new password
		const hashedNewPassword = await hash(
			newPassword,
			Number(process.env.SALT) || 10
		);

		const response = await prisma.student.update({
			where: {
				email: validSession.email,
			},
			data: {
				password: hashedNewPassword,
			},
		});

		return NextResponse.json(
			{ ok: true, message: 'new password successful', data: response },
			{ status: 200 }
		);
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ ok: false, message: 'server error' },
			{ status: 500 }
		);
	}
}
