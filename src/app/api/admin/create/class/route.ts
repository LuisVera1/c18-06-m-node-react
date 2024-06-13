import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';
import * as yup from 'yup';
import { validateData, checkRole, typeUsers } from '@/app/lib';

const postSchema = yup.object({
	title: yup.string().trim().required(),
	spaces: yup.number().required(),
	code: yup.string().trim().required(),
	careerID: yup.number().required(),
	teacherID: yup.number().optional().default(null),
	description: yup.string().optional().default(null),
	schedule: yup.array().of(
		yup.object().shape({
			day: yup.string().trim().required(),
			startH: yup.number().required(),
			endH: yup.number().required(),
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

	try {
		const { title, spaces, code, description, careerID, teacherID, schedule } =
			dataValidation;

		//verify active teacher
		const teacher = await prisma.teacher.findUnique({
			where: {
				id: teacherID,
			},
		});

		if (teacher && teacher.status != 'Activo') {
			return NextResponse.json(
				{ ok: false, message: 'only active teachers can be selected' },
				{ status: 400 }
			);
		}

		// creating class
		const response = await prisma.class.create({
			data: {
				title: title,
				spaces: spaces,
				code: code,
				carerrID: careerID,
				teacherID: teacherID,
				description: description,
				schedule: {
					createMany: {
						data: schedule,
					},
				},
			},
			select: {
				career: true
			}
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
