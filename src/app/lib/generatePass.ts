const otpGenerator = require('otp-generator');

export const generatePass = (): string => {
	if (process.env.ENVIROMENT === 'dev') return '123456Aa';

	const pass = otpGenerator.generate(8, { specialChars: false });

	return pass;
};
