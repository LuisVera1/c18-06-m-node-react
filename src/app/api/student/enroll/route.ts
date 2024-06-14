import { checkRole, typeUsers, validateData } from '@/app/lib';
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import * as yup from 'yup';

const postSchema = yup.object({
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

	const { classID } = dataValidation;

	//validate session, token
	const validSession = await checkRole(typeUsers.student);
	if (!validSession.token) {
		return NextResponse.json(
			{ ok: false, message: validSession.message },
			{ status: validSession.status }
		);
	}

	try {
		//get class
		const classInfo = await prisma.class.findUnique({
			where: {
				id: classID,
			},
		});

		if (!classInfo) {
			return NextResponse.json(
				{ ok: false, message: 'invalid id' },
				{ status: 400 }
			);
		}

		const { spaces, carerrID } = classInfo;

		if (spaces < 1) {
			return NextResponse.json(
				{ ok: false, message: 'this class is full' },
				{ status: 400 }
			);
		}

		if (carerrID != validSession.tokenData.career) {
			return NextResponse.json(
				{ ok: false, message: 'you could not register for the class' },
				{ status: 400 }
			);
		}

		//enroll
		const response = await prisma.studentsInClass.create({
			data: {
				studentID: validSession.tokenData.userID,
				classID: classID,
			},
		});

		//reduce spaces
		await prisma.class.update({
			where: {
				id: classID,
			},
			data: {
				spaces: classInfo.spaces - 1,
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
