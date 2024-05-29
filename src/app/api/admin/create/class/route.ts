import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';
import * as yup from 'yup';
import { validateData, checkRole, typeUsers } from '@/app/lib';

const postSchema = yup.object({
	title: yup.string().trim().required(),
	credits: yup.number().required(),
	spaces: yup.number().required(),
	code: yup.string().trim().required(),
	section: yup.string().trim().required(),
	careerID: yup.number().required(),
	schedule: yup.array().of(
		yup.object().shape({
			day: yup.string().trim().required(),
			startH: yup.number().required(),
			endH: yup.number().required(),
			classroom: yup.string().trim().required(),
		})
	),
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
	const { title, credits, spaces, code, section, careerID, schedule } =
		dataValidation;

	try {
		const response = await prisma.class.create({
			data: {
				title: title,
				credits: credits,
				spaces: spaces,
				code: code,
				section: section,
				carerrID: careerID,
				schedule: {
					createMany: {
						data: schedule,
					},
				},
			},
		});

		return NextResponse.json(
			{ ok: true, message: 'new class created', data: response },
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
