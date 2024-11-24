<!-- make a form that takes following inputs : 
 - name
 - chakra - dropdown
 - Mobile No.
 - No. of People (min : 1) -->

<script lang="ts">
	import { enhance } from '$app/forms';

	const chakras =
		'Jagannath Puri, Ram keli, Simantha, Kola, Sri Kashi Dham, Ekachakra, Godruma, Sri Adi Kesava Dham, Ritu, Mamgachi, Modadruma, Pundarik Dham, Ayodhya, Guruvayoor Dham, Keturi Dham, Srivas Angan, Rudra, Antar dwip, Radhakund, Nawadwip, Badrika Ashram, Sri Ranga Dham Chakra, Nilachal, Prayag, Ahobilam, Madhya, Govardhan Giri, Gupta Gokul dham, Janu Dwip, Ananta Padmanaba, Sri Punarthirtha Dham';
	const chakraList = chakras.split(', ');

	// sort chakraList alphabetically
	chakraList.sort();
</script>

<div>
	<nav class="flex justify-center space-x-4">
		<ul class="flex w-full">
			<li class="flex-1">
				<a
					href="/"
					class="block rounded-t-lg border-b-2 border-blue-500 px-4 py-2 text-center text-blue-500"
				>
					Register
				</a>
			</li>
			<li class="flex-1">
				<a
					href="/checkout"
					class="block rounded-t-lg border-b-2 border-transparent px-4 py-2 text-center hover:border-blue-500 hover:text-blue-500"
				>
					Checkout
				</a>
			</li>
		</ul>
	</nav>
	<form action="?/register" method="POST" use:enhance>
		<div class="my-4">
			<label for="name" class="block text-sm font-medium text-gray-700">Name</label>
			<input
				type="text"
				id="name"
				name="name"
				class="mt-1 block
            w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
			/>
		</div>
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
			<label for="mobile" class="block text-sm font-medium text-gray-700">Mobile No.</label>
			<input
				type="tel"
				id="mobile"
				name="mobile"
				class="mt-1 block
                w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
			/>
		</div>
		<div class="mb-4">
			<label for="people" class="block text-sm font-medium text-gray-700">No. of People</label>
			<input
				type="number"
				min="1"
				id="people"
				name="people"
				class="mt-1 block
                w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
			/>
		</div>
		<div class="mb-4">
			<button
				type="submit"
				class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
			>
				Submit
			</button>
		</div>
	</form>
</div>
