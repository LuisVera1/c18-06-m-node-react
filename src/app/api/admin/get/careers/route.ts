import { checkRole, typeUsers } from '@/app/lib';
import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
	const session = cookies().get('session')?.value;

	try {
		//validate session, token
		const validSession = await checkRole(typeUsers.admin);
		if (!validSession.token) {
			return NextResponse.json(
				{ ok: false, message: validSession.message },
				{ status: validSession.status }
			);
		}

		const response = await prisma.career.findMany({
			select: {
				id: true,
				title: true,
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
