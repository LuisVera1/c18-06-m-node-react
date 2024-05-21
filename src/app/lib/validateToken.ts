import { jwtVerify } from 'jose';

const key = new TextEncoder().encode(process.env.SECRET);

export async function validateToken(input: string): Promise<any> {
	try {
		const { payload } = await jwtVerify(input, key, {
			algorithms: ['HS256'],
		});
		return { ok: true, ...payload };
	} catch (err) {
		return { ok: false };
	}
}
