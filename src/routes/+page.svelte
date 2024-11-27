<script lang="ts">
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';

	let { form } = $props();

	let submitting = $state(false);

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
					Check In
				</a>
			</li>
			<li class="flex-1">
				<a
					href="/update"
					class="block rounded-t-lg border-b-2 border-transparent px-4 py-2 text-center hover:border-blue-500 hover:text-blue-500"
				>
					Update
				</a>
			</li>
		</ul>
	</nav>

	<!-- If form.message exist, display in red alert box -->
	{#if (form?.messages ?? []).length > 0}
		<div
			class="relative mt-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
			role="alert"
		>
			<strong class="font-bold">Errors: </strong>
			<ul class="list-inside list-disc">
				{#each form?.messages ?? [] as message}
					<li>{message}</li>
				{/each}
			</ul>
		</div>
	{/if}
	<form
		action="?/register"
		method="POST"
		use:enhance={() => {
			submitting = true;
			return async ({ update, result }) => {
				submitting = false;
				update();
				if (result.type === 'success' && result.data?.status === 200) {
					toast.success('Registration successful', { duration: 2000 });
				}
			};
		}}
	>
		<div class="my-4">
			<label for="name" class="block text-sm font-medium text-gray-700">Name</label>
			<input
				type="text"
				id="name"
				name="name"
				class="mt-1 block
            w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
			/>
		</div>
		<div class="mb-4">
			<label for="chakra" class="block text-sm font-medium text-gray-700">Chakra</label>
			<select
				id="chakra"
				name="chakra"
				class="mt-1 block
            w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
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
                w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
			/>
		</div>
		<div class="mb-4">
			<label for="people" class="block text-sm font-medium text-gray-700">No. of People</label>
			<input
				type="number"
				min="1"
				pattern="[0-9]*"
				id="people"
				name="people"
				class="mt-1 block
                w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
			/>
		</div>
		<div class="mb-4">
			<label for="date" class="block text-sm font-medium text-gray-700">Number Plate</label>
			<input
				type="text"
				id="plate"
				name="plate"
				class="mt-1 block
				w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
			/>
		</div>
		<div class="mb-4">
			<button
				type="submit"
				disabled={submitting}
				class="flex w-full justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
			>
				{#if submitting}
					<svg
						class="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
						></circle>
						<path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 014.708 4.708L7.291 7.29zm10.584-2.584A8.001 8.001 0 0120 12h4c0-6.627-5.373-12-12-12v4z"
						></path>
					</svg>
					Checking In
				{:else}
					Check In
				{/if}
			</button>
		</div>
	</form>
</div>
