import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { supabase } from '$lib/supabaseClient';

export const load: PageServerLoad = async () => {
	return {};
};

export const actions: Actions = {
	register: async (event) => {
		//get the data from the form

		const formData = await event.request.formData();
		const data = Object.fromEntries(formData.entries());

		//check if the form is empty
		if (
			data.name === '' ||
			data.chakra === '' ||
			data.mobile === '' ||
			data.people === '' ||
			data.plate === ''
		) {
			return fail(400, { messages: ['Please fill all the fields'] });
		}

		data.name = (data.name as string).trim();
		data.chakra = (data.chakra as string).trim();
		data.mobile = (data.mobile as string).trim();
		const peopleCount = parseInt((data.people as string).trim());
		data.plate = (data.plate as string).trim();

		const errors = [];

		//mobile number validation, min 8 digits, all numbers with regex
		const mobileRegex = /^[0-9]{8,}$/;
		if (!mobileRegex.test(data.mobile)) {
			errors.push('Invalid mobile number');
		}

		//check if the number of people is a number
		if (isNaN(peopleCount)) {
			errors.push('Invalid number of people');
		} else if (peopleCount < 1) {
			errors.push('Number of people should be at least 1');
		}

		//check if the plate number is a number, minimum 3 digits
		const plateRegex = /^[0-9]{3,}$/;
		if (!plateRegex.test(data.plate)) {
			errors.push('Invalid plate number');
		}

		if (errors.length > 0) {
			return fail(400, { messages: errors });
		}

		// convert the data to object
		const obj_send = {
			name: data.name,
			chakra: data.chakra,
			mobile: data.mobile,
			people: peopleCount,
			plate: data.plate
		};

		// insert the data to the database
		const { data: insertedData, error } = await supabase.from('reg_28_11').insert([obj_send]);

		if (error) {
			console.error(error.message);
			console.log(error.stack);
			console.log(error);
			return fail(500, { messages: ['Error inserting data'] });
		}

		return {
			status: 200,
			body: {
				message: 'Registration successful',
				data: insertedData
			}
		};
	}
};
