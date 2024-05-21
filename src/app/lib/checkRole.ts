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
		};
	}

	//very token
	try {
		const validToken = await validateToken(session);
		console.log('🚀 - validToken:', validToken);

		if (validToken.role != role) {
			return {
				token: false,
				status: 401,
				message: 'unauthorized',
				role: validToken.role,
			};
		}

		return {
			token: true,
			status: 200,
			message: '',
			role: validToken.role,
		};
	} catch (err) {
		return {
			token: false,
			status: 401,
			message: 'invalid session',
			role: '',
		};
	}
};
