import type { PageServerLoad } from './$types';
import { supabase } from '$lib/supabaseClient';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	//get the data from suoabase
	const { data, error } = await supabase
		.from('reg_28_11')
		.select('id, name, chakra, mobile, adults, kids, plate')
		.eq('slot', params.slot)
		.order('created_at', { ascending: false });
	if (error) {
		console.error('error', error);
		return fail(500, { message: 'Internal server error' });
	}

	// return the data with a new key where people will be the sum of adults and kids
	return { rows: data.map((row) => ({ ...row, people: row.adults + row.kids })) };
};

export const actions: Actions = {
	modify: async ({ request }) => {
		const formData = await request.formData();
		let { id, name, chakra, mobile, adults, kids, plate, mode } = Object.fromEntries(
			formData.entries()
		);
		if (
			name === '' ||
			chakra === '' ||
			mobile === '' ||
			adults === '' ||
			plate === '' ||
			mode === ''
		) {
			return fail(400, { messages: ['Please fill all the fields'] });
		}

		if (mode === 'delete') {
			const { data, error } = await supabase.from('reg_28_11').delete().eq('id', id);
			if (error) {
				console.error('error', error);
				return fail(500, { message: 'Internal server error' });
			}
			return { data };
		}

		name = (name as string).trim();
		mobile = (mobile as string).trim();
		plate = (plate as string).trim();
		let adultsCount = parseInt(adults as string);
		let kidsCount = parseInt(kids as string);

		let errors = [];

		if (isNaN(adultsCount)) {
			errors.push('Invalid number of adults');
		} else if (adultsCount < 1) {
			errors.push('Number of adults should be at least 1');
		}

		let mobileRegex = /^[0-9]{8,}$/;
		if (!mobileRegex.test(mobile)) {
			errors.push('Invalid mobile number');
		}

		let plateRegex = /^[0-9]{1,}$/;
		if (!plateRegex.test(plate)) {
			errors.push('Invalid plate number');
		}

		if (errors.length > 0) {
			return fail(400, { messages: errors });
		}

		const { data, error } = await supabase
			.from('reg_28_11')
			.update({ name, chakra, mobile, adults: adultsCount, kids: kidsCount, plate })
			.eq('id', id);
		if (error) {
			console.error('error', error);
			return fail(500, { message: 'Internal server error' });
		}
		console.log(data);
		return { data };
	}
};
