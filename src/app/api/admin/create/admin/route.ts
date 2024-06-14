import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';
import { hash } from 'bcrypt-ts';
import * as yup from 'yup';
import { validateData, checkRole, generatePass, typeUsers } from '@/app/lib';
const nodemailer = require('nodemailer');

interface inputBodyEmail {
	email: String;
	password: String;
}

const bodyEmail = ({ email, password }: inputBodyEmail): string => {
	return `<div style="background-color: #E6F9FF; padding: 30px 0; display: flex; align-items: center;"><img src="https://i.ibb.co/6Xrymf0/logo.png" alt="edunova" /><div style="width: 100%"><h1 style="text-align: center; font-size: 2.4rem; color: #2190aa; font-family: helvetica">!Bienvenido a nuestro equipo!</h1></div></div><p style="font-size: 1.4rem; color: #5ebdd7; text-align: center">Lorem ipsum dolor sit amet consectetur adipisicing elit. A cum nam architecto dolor veritatis laboriosam nihil nostrum incidunt ipsum, sint consequatur maxime ipsam, voluptatem doloremque cumque laborum iusto, velit unde.<p><h3>Estos son tus datos de acceso:</h3><p><strong>Email: </strong>${email}</p><p><strong>Password: </strong>${password}</p></br><a style="text-decoration: none; background-color: #5ebdd7; padding: 8px 16px; border-radius: 8px; color: #fff; font-weight:margin: 150px " href="http://localhost:3000/login">Inicia sesión</a></br></br><p style="color: #777">Se recomienda cambiar tu contraseña una vez que entres al sistema</p>`;
};

const postSchema = yup.object({
	email: yup.string().lowercase().trim().email().required(),
	name: yup.string().trim().required(),
	phone: yup.string().trim().optional(),
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

	//validate session, token
	const validSession = await checkRole(typeUsers.admin);
	if (!validSession.token) {
		return NextResponse.json(
			{ ok: false, message: validSession.message },
			{ status: validSession.status }
		);
	}

	//validate superAdmin
	if (!validSession.tokenData.superAdmin) {
		return NextResponse.json(
			{ ok: false, message: 'Forbidden' },
			{ status: 403 }
		);
	}

	// creating user
	const { email, name, phone } = dataValidation;

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
				phone: phone || '',
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
				to: email,
				subject: '¡Bienvenido a nuestro equipo!',
				html: bodyEmail({ email: email, password: generatedPassword }),
			});
		}

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
