import { SignJWT } from 'jose';

const key = new TextEncoder().encode(process.env.SECRET);

export async function createToken(payload: any) {
	return await new SignJWT(payload)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('2h')
		.sign(key);
}