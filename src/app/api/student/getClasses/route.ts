import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

import { checkRole, typeUsers } from '@/app/lib/';

export async function GET(req: Request) {
	//validate session, token
	const validSession = await checkRole(typeUsers.student);
	if (!validSession.token) {
		return NextResponse.json(
			{ ok: false, message: validSession.message },
			{ status: validSession.status }
		);
	}

	try {
		const response = await prisma.class.findMany({
			where: {
				carerrID: validSession.tokenData.career,
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
