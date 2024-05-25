import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';
import { hash } from 'bcrypt-ts';
import * as yup from 'yup';
import { validateData, checkRole, generatePass } from '@/app/lib';

const postSchema = yup.object({
	career: yup.number(),
	email: yup.string().trim().email().required(),
	name: yup.string().trim().required(),
	plan: yup.string().trim().required(),
});

const startCode = 1000000;

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
	const validSession = await checkRole('Admin');
	if (!validSession.token) {
		return NextResponse.json(
			{ ok: false, message: validSession.message },
			{ status: validSession.status }
		);
	}

	// creating user
	const { career, email, name, plan } = dataValidation;

	try {
		//check if user already exist
		const user = await prisma.student.findUnique({
			where: {
				email: email,
			},
		});

		if (user) {
			return NextResponse.json(
				{ ok: false, message: 'user already exist' },
				{ status: 400 }
			);
		}

		const hashedPassword = await hash(
			generatePass(),
			Number(process.env.SALT) || 10
		);

		const student = await prisma.student.create({
			data: {
				careerID: career,
				email: email,
				name: name,
				password: hashedPassword,
				plan: plan,
			},
		});

		//add code
		const response = await prisma.student.update({
			where: {
				id: student.id,
			},
			data: {
				code: student.id + startCode,
			},
		});

		return NextResponse.json(
			{ ok: true, message: 'new user created', data: response },
			{ status: 201 }
		);
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ ok: false, message: 'server error' },
			{ status: 500 }
		);
	}
}
