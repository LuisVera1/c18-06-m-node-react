import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';
import { hash } from 'bcrypt-ts';
import * as yup from 'yup';
import { validateData, checkRole, generatePass, typeUsers } from '@/app/lib';

const postSchema = yup.object({
	title: yup.string().trim().required(),
	credits: yup.number().required(),
	code: yup.string().trim().required(),
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
	const validSession = await checkRole(typeUsers.admin);
	if (!validSession.token) {
		return NextResponse.json(
			{ ok: false, message: validSession.message },
			{ status: validSession.status }
		);
	}

	// creating career
	const { title, credits, code } = dataValidation;

	try {
		//check if career already exist
		// const user = await prisma.career.findUnique({
		// 	where: {
		// 		code: code,
		// 	},
		// });

		// if (user) {
		// 	return NextResponse.json(
		// 		{ ok: false, message: 'the code already exist' },
		// 		{ status: 400 }
		// 	);
		// }

		const response = await prisma.career.create({
			data: {
				title: title,
				credits: credits,
				code: code,
			},
		});

		return NextResponse.json(
			{ ok: true, message: 'new career created', data: response },
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
