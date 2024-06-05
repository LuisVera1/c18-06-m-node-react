import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';
import * as yup from 'yup';
import { validateData, checkRole, typeUsers } from '@/app/lib';

const postSchema = yup.object({
	academicEmail: yup.string().lowercase().trim().email().optional().default(''),
	status: yup.string().trim().required(),
	id: yup.number().required(),
});

export async function PATCH(req: Request, res: Response) {
	const body = await req.json();

	// data validation
	const dataValidation = await validateData(postSchema.validate(body));

	const { academicEmail, status, id } = dataValidation;

	const enumStatus = [
		'Activo',
		'Inactivo',
		'Graduado',
		'Titulado',
		'Baja',
		'BajaTemporal',
		'Empty',
	];

	if (!dataValidation.ok || !enumStatus.includes(status)) {
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
		//check if user exist
		const user = await prisma.student.findUnique({
			where: {
				id: id,
			},
		});

		if (!user) {
			return NextResponse.json(
				{ ok: false, message: 'user does not exist' },
				{ status: 400 }
			);
		}

		// update
		const response = await prisma.student.update({
			where: {
				id: id,
			},
			data: {
				status: status,
			},
		});

		return NextResponse.json(
			{ ok: true, message: 'update user', data: response },
			{ status: 202 }
		);
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ ok: false, message: 'server error' },
			{ status: 500 }
		);
	}
}
