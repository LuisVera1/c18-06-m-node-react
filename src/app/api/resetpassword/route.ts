import { createToken, typeUsers, validateData } from '@/app/lib';
import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';
// import { Resend } from 'resend';
import * as yup from 'yup';

const postSchema = yup.object({
	email: yup.string().trim().email().required(),
	role: yup.string().required().trim(),
});

export async function POST(req: Request) {
	const body = await req.json();
	const { role, email } = body;

	//data validaction
	const validation = await validateData(postSchema.validate(body));

	if (!validation.ok) {
		return NextResponse.json(
			{ ok: false, message: 'verify email and role' },
			{ status: 400 }
		);
	}

	try {
		let response: any;

		//admin
		if (role === typeUsers.admin) {
			response = await prisma.admin.findUnique({
				where: {
					email: email,
				},
			});
		}

		//teacher
		if (role === typeUsers.teacher) {
			response = await prisma.teacher.findUnique({
				where: {
					email: email,
				},
			});
		}

		//student
		if (role === typeUsers.student) {
			response = await prisma.student.findUnique({
				where: {
					email: email,
				},
			});
		}

		if (!response) {
			return NextResponse.json(
				{ ok: false, message: 'wrong email or role' },
				{ status: 400 }
			);
		}

		// generate token

		const payload = {
			role: response.role,
			email: response.email,
		};

		const token = await createToken(payload, '24h');

		//send mail
		// const resend = new Resend(process.env.RESEND_API_KEY);
		// const { data, error } = await resend.emails.send({
		// 	from: 'Acme <onboarding@resend.dev>',
		// 	to: ['luisvera2318@gmail.com'],
		// 	subject: '¡Felicidades, has sido admitido!',
		// 	html: `<div><h1>Restablecer contraseña</h1></br><p>Hemos recibido una solicitud para restablecer tu contrasela, sigue este link para restablecerla, el link solo es valido 24 horas</p></br></br></br><a href="http://localhost:3000/restablecercontrasena/${token}">Restablecer contraseña</a></div>`,
		// });

		return NextResponse.json({
			ok: true,
			message: 'email sended',
			data: token,
		});
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ ok: false, message: 'server error' },
			{ status: 500 }
		);
	}
}
