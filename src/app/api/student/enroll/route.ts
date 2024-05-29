import { checkRole, typeUsers, validateData } from '@/app/lib';
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import * as yup from 'yup';

const postSchema = yup.object({
	studentID: yup.number().required(),
	classID: yup.number().required(),
});

export async function POST(req: Request) {
	const body = await req.json();

	//validate data
	const dataValidation = await validateData(postSchema.validate(body));

	if (!dataValidation.ok) {
		return NextResponse.json(
			{ ok: false, message: 'verify data' },
			{ status: 400 }
		);
	}

	const { studentID, classID } = dataValidation;

	//validate session, token
	const validSession = await checkRole(typeUsers.student);
	if (!validSession.token) {
		return NextResponse.json(
			{ ok: false, message: validSession.message },
			{ status: validSession.status }
		);
	}

	//enroll
	try {
		const response = await prisma.studentsInClass.create({
			data: {
				studentID: studentID,
				classID: classID,
			},
		});

		return NextResponse.json(
			{ ok: true, message: 'enrolled' },
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
