import { NextResponse } from 'next/server';
import { checkRole, typeUsers, validateData } from '@/app/lib';
import prisma from '@/app/lib/prisma';

import * as yup from 'yup';

const enumStatus = [
	'Activo',
	'Inactivo',
	'Graduado',
	// 'Titulado',
	// 'Baja',
	// 'BajaTemporal',
	'Empty',
];

const postSchema = yup.object({
	career: yup.number().optional(),
	status: yup.string().oneOf(enumStatus),
	page: yup.number().min(1).default(1),
	number: yup.number().default(10),
});

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);

	//data validation
	const filterData = {
		career: Number(searchParams.get('career')),
		status: searchParams.get('status') ?? 'Empty',
		page: Number(searchParams.get('page')) || 1,
		number: Number(searchParams.get('number')) || 10,
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
	const { career, status, page, number } = validation;

	const skip = (page - 1) * number;

	try {
		let response;
		if (status === 'Empty') {
			response = await prisma.student.findMany({
				skip: skip,
				take: number,
				where: {
					careerID: career == 0 ? undefined : career,
				},
				select: {
					email: true,
					code: true,
					name: true,
					status: true,
					creation: true,
					career: {
						select: {
							title: true,
							code: true,
						},
					},
				},
			});
		} else {
			response = await prisma.student.findMany({
				skip: skip,
				take: number,
				where: {
					careerID: career == 0 ? undefined : career,
					status: status,
				},
				select: {
					email: true,
					code: true,
					name: true,
					status: true,
					creation: true,
					career: {
						select: {
							title: true,
							code: true,
						},
					},
				},
			});
		}

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
