import { cookies } from 'next/headers';
import { validateToken } from './validateToken';

/**
 *
 * @param role expected role
 * @returns
 */
export const checkRole = async (role: String) => {
	const session = cookies().get('session')?.value;

	// if token doesnt exist
	if (!session) {
		return {
			token: false,
			status: 401,
			message: 'session does not exist',
			role: '',
			email: '',
		};
	}

	//very token
	try {
		const validToken = await validateToken(session);

		if (validToken.role != role) {
			return {
				token: false,
				status: 401,
				message: 'unauthorized',
				role: validToken.role,
				email: '',
			};
		}

		return {
			token: true,
			status: 200,
			message: '',
			role: validToken.role,
			email: validToken.email,
			tokenData: validToken,
		};
	} catch (err) {
		return {
			token: false,
			status: 401,
			message: 'invalid session',
			role: '',
			email: '',
		};
	}
};
