export const validateData = async (schema: any) => {
	try {
		const data = await schema;
		return { ok: true, ...data };
	} catch (err) {
		return { ok: false };
	}
};
