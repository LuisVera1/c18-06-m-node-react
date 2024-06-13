import { createToken, typeUsers, validateData } from '@/app/lib';
import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';
import * as yup from 'yup';
const nodemailer = require('nodemailer');

const postSchema = yup.object({
	email: yup.string().trim().email().required(),
	role: yup.string().required().trim(),
});

const bodyEmail = (token: string): string => {
	return `<div style="background-color: #E6F9FF; padding: 30px 0; display: flex; align-items: center"><img src="https://i.ibb.co/6Xrymf0/logo.png" alt="edunova" /><div style="width: 100%"><h1 style="text-align: center; font-size: 2.4rem; color: #2190aa; font-family: helvetica">Restablecer contraseña</h1></div></div><p style="font-size: 1.4rem; color: #5ebdd7; text-align: center">Hemos recibido una solicitud para restablecer tu contraseña, sigue el link para continuar con el proceso, el link es vigente solo 24 horas.<p></br></br><a style="text-decoration: none; background-color: #5ebdd7; padding: 8px 16px; border-radius: 8px; color: #fff; font-weight:margin: 150px " href="${process.env.NEXT_PUBLIC_URL_BASE}/restablecercontrasena/${token}">Restablecer mi contraseña</a></br></br><p style="color: #777">Si no lo has solicitado tú, no necesitas hacer nada.</p>
`;
};

export async function POST(req: Request) {
	const body = await req.json();


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
		if (validation.role === typeUsers.admin) {
			response = await prisma.admin.findUnique({
				where: {
					email: validation.email,
				},
			});
		}

		//teacher
		if (validation.role === typeUsers.teacher) {
			response = await prisma.teacher.findUnique({
				where: {
					email: validation.email,
				},
			});
		}

		//student
		if (validation.role === typeUsers.student) {
			response = await prisma.student.findUnique({
				where: {
					email: validation.email,
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

		//send email
		if (process.env.ENVIRONMENT != 'Dev') {
			const transporter = nodemailer.createTransport({
				host: 'smtp-mail.outlook.com',
				port: 587,
				secure: false, // Use `true` for port 465, `false` for all other ports
				auth: {
					user: process.env.EMAIL_USER,
					pass: process.env.EMAIL_USER_PASSWORD,
				},
			});

			const info = await transporter.sendMail({
				from: '"Edunova 🏫" <no_reply_edunova@outlook.com>',
				to: response.email,
				subject: 'Solicitud para restablecer contraseña',
				html: bodyEmail(token),
			});
		}

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
