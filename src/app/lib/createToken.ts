import { SignJWT } from 'jose';

const key = new TextEncoder().encode(process.env.SECRET);

/**
 *
 * @param payload
 * @param duration
 * @returns token
 */
export async function createToken(payload: any, duration: string = '2h') {
	return await new SignJWT(payload)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime(duration)
		.sign(key);
}