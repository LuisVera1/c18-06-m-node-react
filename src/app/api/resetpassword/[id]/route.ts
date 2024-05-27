import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/app/lib/prisma';
import { createToken, typeUsers, validateData, validateToken } from '@/app/lib';
import { hash } from 'bcrypt-ts';
import * as yup from 'yup';

const postSchema = yup.object({
	newPassword: yup.string().trim().required().min(8),
});

export async function POST(req: Request, { params }: any) {
	const body = await req.json();
	const token = params.id || '';

	//validate data
	const validation = await validateData(postSchema.validate(body));

	if (!validation.ok) {
		return NextResponse.json(
			{ ok: false, message: 'verify new password' },
			{ status: 400 }
		);
	}

	try {
		//validate token
		const validToken = await validateToken(token);

		if (!validToken.ok) {
			return NextResponse.json(
				{ ok: false, message: 'invalid token' },
				{ status: 400 }
			);
		}

		// -- change password
		const hashedPassword = await hash(
			body.newPassword,
			Number(process.env.SALT) || 10
		);

		const { role, email } = validToken;
		let response: any;

		//Admin
		if (role === typeUsers.admin) {
			response = await prisma.admin.update({
				where: {
					email: email,
				},
				data: {
					password: hashedPassword,
				},
			});
		}

		//Teacher
		if (role === typeUsers.teacher) {
			response = await prisma.teacher.update({
				where: {
					email: email,
				},
				data: {
					password: hashedPassword,
				},
			});
		}

		//Student
		if (role === typeUsers.student) {
			response = await prisma.student.update({
				where: {
					email: email,
				},
				data: {
					password: hashedPassword,
				},
			});
		}

		// generate token
		const sessionToken = await createToken({
			email: response.email,
			role: response.role,
			code: response.code,
		});

		//set cookie
		cookies().set({
			name: 'session',
			value: sessionToken,
			httpOnly: false,
			path: '/',
		});

		return NextResponse.json(
			{ ok: true, message: 'The new password is set.' },
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
