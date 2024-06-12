import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

import { checkRole, typeUsers } from '@/app/lib/';

export async function GET(req: Request) {
	//validate session, token
	const validSession = await checkRole(typeUsers.admin);
	if (!validSession.token) {
		return NextResponse.json(
			{ ok: false, message: validSession.message },
			{ status: validSession.status }
		);
	}

	try {
		const response = await prisma.class.findMany({
			select: {
				title: true,
				description: true,
				spaces: true,
				code: true,
				id: true,
				career: {
					select: {
						title: true
					}
				}
			}
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
