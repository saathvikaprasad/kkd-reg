import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
	return {};
};

export const actions: Actions = {
	register: async (event) => {
		console.log(event.request.formData);
		return { message: 'Hello from the server!' };
	}
};
