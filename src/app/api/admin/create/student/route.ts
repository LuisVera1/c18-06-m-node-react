import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';
import { hash } from 'bcrypt-ts';
import * as yup from 'yup';
import { validateData, checkRole, generatePass, typeUsers } from '@/app/lib';
// import { Resend } from 'resend';

const postSchema = yup.object({
	career: yup.number(),
	email: yup.string().lowercase().trim().email().required(),
	name: yup.string().trim().required(),
	plan: yup.string().trim().required(),
});

const startCode = 1000000;

export async function POST(req: Request, res: Response) {
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

	// creating user
	const { career, email, name, plan } = dataValidation;

	try {
		//check if user already exist
		const user = await prisma.student.findUnique({
			where: {
				email: email.toLowerCase(),
			},
		});

		if (user) {
			return NextResponse.json(
				{ ok: false, message: 'user already exist' },
				{ status: 400 }
			);
		}

		const generatedPassword = generatePass();
		const hashedPassword = await hash(
			generatedPassword,
			Number(process.env.SALT) || 10
		);

		const student = await prisma.student.create({
			data: {
				careerID: career,
				email: email.toLowerCase(),
				name: name,
				password: hashedPassword,
				plan: plan,
			},
		});

		//add code
		const response = await prisma.student.update({
			where: {
				id: student.id,
			},
			data: {
				code: student.id + startCode,
			},
		});

		//send mail
		// const resend = new Resend(process.env.RESEND_API_KEY);
		// const { data, error } = await resend.emails.send({
		// 	from: 'Acme <onboarding@resend.dev>',
		// 	to: ['luisvera2318@gmail.com'],
		// 	subject: '¡Felicidades, has sido admitido!',
		// 	html: `<div><h1>Bienvenido</h1></br><p>Aqui estan tus datos de acceso</p><p><strong>email: </strong>${email}</p><p><strong>password: </strong>${generatedPassword}</p><a href="http://localhost:3000/login">Inicia sesión</a></div>`,
		// });
		// console.log('🚀 - data:', data);
		// console.log('🚀 - error:', error);

		return NextResponse.json(
			{ ok: true, message: 'new user created', data: response },
			{ status: 201 }
		);
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ ok: false, message: 'server error' },
			{ status: 500 }
		);
	}
}
