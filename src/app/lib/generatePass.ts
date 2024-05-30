const otpGenerator = require('otp-generator');

export const generatePass = (): string => {
	if (process.env.ENVIROMENT === 'dev') return '123456Aa';

	const pass = otpGenerator.generate(5, { specialChars: false });

	return pass + '1Aa'
};
