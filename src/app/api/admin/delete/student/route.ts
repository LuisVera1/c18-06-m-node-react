import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';
import * as yup from 'yup';
import { validateData, checkRole, typeUsers } from '@/app/lib';

const postSchema = yup.object({
	id: yup.number().required(),
});

export async function DELETE(req: Request, res: Response) {
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
		const { id } = dataValidation;

		// delete class
		const response = await prisma.student.delete({
			where: {
				id: id,
			},
		});

		return NextResponse.json(
			{ ok: true, message: 'class deleted', data: response },
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
