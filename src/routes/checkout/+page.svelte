<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	type Record = {
		name: string;
		chakra: string;
		mobile: string;
		people: number;
	};

	const chakras =
		'Jagannath Puri, Ram keli, Simantha, Kola, Sri Kashi Dham, Ekachakra, Godruma, Sri Adi Kesava Dham, Ritu, Mamgachi, Modadruma, Pundarik Dham, Ayodhya, Guruvayoor Dham, Keturi Dham, Srivas Angan, Rudra, Antar dwip, Radhakund, Nawadwip, Badrika Ashram, Sri Ranga Dham Chakra, Nilachal, Prayag, Ahobilam, Madhya, Govardhan Giri, Gupta Gokul dham, Janu Dwip, Ananta Padmanaba, Sri Punarthirtha Dham';
	const chakraList = chakras.split(', ');

	// sort chakraList alphabetically
	chakraList.sort();

	let data: Record | null = $state(null);
</script>

<nav class="flex justify-center space-x-4">
	<ul class="flex w-full">
		<li class="flex-1">
			<a
				href="/"
				class="block rounded-t-lg border-b-2 border-transparent px-4 py-2 text-center hover:border-blue-500 hover:text-blue-500"
			>
				Register
			</a>
		</li>
		<li class="flex-1">
			<a
				href="/checkout"
				class="block rounded-t-lg border-b-2 border-blue-500 px-4 py-2 text-center text-blue-500"
			>
				Checkout
			</a>
		</li>
	</ul>
</nav>
<div class="pb-4 pt-8 text-center text-lg font-semibold">Checkout using Mobile No.</div>
<form action="?/checkout" method="POST" use:enhance>
	<div class="mb-4">
		<label for="mobile" class="block text-sm font-medium text-gray-700">Mobile No.</label>
		<input
			type="tel"
			id="mobile"
			name="mobile"
			class="mt-1 block
				w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
		/>
	</div>
	<!-- horizontal divider with text OR -->
	<div class="flex items-center">
		<div class="h-0.5 flex-grow bg-gray-300"></div>
		<div class="px-4 text-sm text-gray-500">OR</div>
		<div class="h-0.5 flex-grow bg-gray-300"></div>
	</div>
	<div class="pb-4 pt-8 text-center text-lg font-semibold">Checkout using Chakra & Name</div>
	<div class="mb-4">
		<label for="chakra" class="block text-sm font-medium text-gray-700">Chakra</label>
		<select
			id="chakra"
			name="chakra"
			class="mt-1 block
			w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
		>
			{#each chakraList as chakra}
				<option value={chakra}>{chakra}</option>
			{/each}
		</select>
	</div>
	<div class="mb-4">
		<label for="name" class="block text-sm font-medium text-gray-700">Name</label>
		<!-- dropdown with few dummy indian names -->
		<select
			id="name"
			name="name"
			class="mt-1 block
			w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
		>
			<option value="Amit">Amit</option>
			<option value="Bhavesh">Bhavesh</option>
			<option value="Chetan">Chetan</option>
			<option value="Dhaval">Dhaval</option>
			<option value="Esha">Esha</option>
			<option value="Firoz">Firoz</option>
			<option value="Gaurav">Gaurav</option>
			<option value="Hemant">Hemant</option>
			<option value="Isha">Isha</option>
			<option value="Jatin">Jatin</option>
			<option value="Kiran">Kiran</option>
			<option value="Lalit">Lalit</option>
			<option value="Manish">Manish</option>
			<option value="Neha">Neha</option>
			<option value="Omkar">Omkar</option>
			<option value="Pooja">Pooja</option>
			<option value="Qureshi">Qureshi</option>
			<option value="Raj">Raj</option>
			<option value="Sachin">Sachin</option>
			<option value="Tina">Tina</option>
			<option value="Umesh">Umesh</option>
			<option value="Vikas">Vikas</option>
			<option value="Waseem">Waseem</option>
			<option value="Xavier">Xavier</option>
			<option value="Yogesh">Yogesh</option>
			<option value="Zubin">Zubin</option>
		</select>
	</div>

	<div class="mb-4">
		<button
			type="submit"
			class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
		>
			Checkout
		</button>
	</div>
</form>
