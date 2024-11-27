import type { PageServerLoad } from './$types';
import { supabase } from '$lib/supabaseClient';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	//get the data from suoabase
	const { data, error } = await supabase
		.from('reg_28_11')
		.select('id, name, chakra, mobile, people, plate')
		.order('created_at', { ascending: false });
	if (error) {
		console.error('error', error);
		return fail(500, { message: 'Internal server error' });
	}
	//return the data

	return { rows: data };
};
