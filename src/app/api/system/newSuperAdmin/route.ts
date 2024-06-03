import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';
import { hash } from 'bcrypt-ts';
import * as yup from 'yup';
import { validateData, generatePass } from '@/app/lib';
// import { Resend } from 'resend';

const postSchema = yup.object({
	email: yup.string().lowercase().trim().email().required(),
	name: yup.string().trim().required(),
});

const startCode = 100000;

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

	// creating user
	const { email, name } = dataValidation;

	try {
		//check if user already exist
		const user = await prisma.admin.findUnique({
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

		const admin = await prisma.admin.create({
			data: {
				email: email.toLowerCase(),
				name: name,
				password: hashedPassword,
			},
		});

		//add code
		const response = await prisma.admin.update({
			where: {
				id: admin.id,
			},
			data: {
				code: admin.id + startCode,
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
