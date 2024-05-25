import { checkRole } from '@/app/lib';
import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
	try {
		const response = await prisma.career.findMany({
			select: {
				id: true,
				title: true,
			},
		});

		//validate session, token
		const validSession = await checkRole('Admin');
		if (!validSession.token) {
			return NextResponse.json(
				{ ok: false, message: validSession.message },
				{ status: validSession.status }
			);
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
