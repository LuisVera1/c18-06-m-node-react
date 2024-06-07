import { checkRole, typeUsers } from '@/app/lib';
import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';
import { act } from 'react-dom/test-utils';

export async function GET(req: Request) {
	try {
		//validate session, token
		const validSession = await checkRole(typeUsers.admin);
		if (!validSession.token) {
			return NextResponse.json(
				{ ok: false, message: validSession.message },
				{ status: validSession.status }
			);
		}

		//students
		const active = await prisma.student.count({
			where: {
				status: 'Activo',
			},
		});

		const tickets = await prisma.student.count({
			where: {
				tickets: true,
			},
		});

		const payment = await prisma.student.count({
			where: {
				payment: true,
			},
		});

		const dropout = await prisma.student.count({
			where: {
				status: 'Baja',
			},
		});

		// courses
		const courses = await prisma.class.count({});

		const response = {
			total: active,
			approved: '12',
			pending: '88',
			tickets: ((tickets / active) * 100).toFixed(1),
			paymentsApproved: ((payment / active) * 100).toFixed(1),
			paymentsPending: (100 - Number(((payment / active) * 100).toFixed(1))).toFixed(1),
			enrolled: 0,
			dropout: ((dropout / (active + dropout)) * 100).toFixed(1),
			totalCourses: courses,
			totalIncome: payment * 150,
		};

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
