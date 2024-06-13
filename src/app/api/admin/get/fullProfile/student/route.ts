import { NextResponse } from 'next/server';
import { checkRole, typeUsers, validateData } from '@/app/lib';
import prisma from '@/app/lib/prisma';

import * as yup from 'yup';

const postSchema = yup.object({
	id: yup.number().required(),
});

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);

	//data validation
	const filterData = {
		id: Number(searchParams.get('id')) || 0,
	};

	const validation = await validateData(postSchema.validate(filterData));

	if (!validation.ok) {
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
	const { id } = validation;

	try {
		const response = await prisma.student.findUnique({
			where: {
				id: id,
			},
			select: {
				id: true,
				email: true,
				code: true,
				name: true,
				role: true,
				status: true,
				careerID: true,
				class: true,
				profile: true,
			},
		});

		return NextResponse.json(
			{ ok: true, message: '', data: response },
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
