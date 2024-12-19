<script lang="ts">
	import { enhance } from '$app/forms';
	import { TableHandler, Datatable, ThSort, ThFilter, type Row } from '@vincjo/datatables';
	import { Pencil, Trash2 } from 'lucide-svelte';
	import jsonData from './data.json';

	let selectedRow: Row | null = $state(null);
	let mode: 'delete' | 'edit' | null = $state(null);
	let currentPage = $state(1);
	let isModifying = $state(false);

	const showDelete = (row: Row) => {
		selectedRow = row;
		mode = 'delete';
	};

	const showEdit = (row: Row) => {
		selectedRow = row;
		mode = 'edit';
	};

	const hideModal = () => {
		selectedRow = null;
		mode = null;
	};

	let { data, form } = $props();

	// rows is in data.rows. i need to find sum of people for each chakra
	// create a table handler

	let chakrasSum: Record<string, { adults: number; kids: number; total: number }> = {};
	data?.rows?.forEach((row) => {
		if (row.chakra === 'Ram keli' || row.chakra === 'Keturi Dham') {
			row.chakra = 'Kheturi/Ramakeli';
		}
		if (chakrasSum[row.chakra]) {
			chakrasSum[row.chakra].adults += row.adults;
			chakrasSum[row.chakra].kids += row.kids;
			chakrasSum[row.chakra].total += row.people;
		} else {
			chakrasSum[row.chakra] = {
				adults: row.adults,
				kids: row.kids,
				total: row.people
			};
		}
	});

	const reg_data: Record<string, { adults: number; kids: number; total: number }> = {
		'Govardhan Giri': { adults: 11, kids: 6, total: 17 },
		Godruma: { adults: 35, kids: 17, total: 52 },
		'Jagannath Puri': { adults: 37, kids: 16, total: 53 },
		'Sri Kashi Dham': { adults: 7, kids: 4, total: 11 },
		'Kheturi/Ramakeli': { adults: 23, kids: 14, total: 37 },
		Kola: { adults: 75, kids: 38, total: 113 },
		Madhya: { adults: 10, kids: 5, total: 15 },
		Nilachal: { adults: 32, kids: 18, total: 50 },
		Prayag: { adults: 14, kids: 5, total: 19 },
		'Pundarik Dham': { adults: 11, kids: 7, total: 18 },
		Ritu: { adults: 37, kids: 14, total: 51 },
		Rudra: { adults: 44, kids: 25, total: 69 },
		'Sri Adi Kesava Dham': { adults: 27, kids: 12, total: 39 },
		'Sri Ranga Dham Chakra': { adults: 38, kids: 16, total: 54 }
	};

	const table = $derived(new TableHandler(data.rows, { rowsPerPage: 10 }));
	const sum_people = $derived(table.createCalculation('people').sum());
	const sum_adults = $derived(table.createCalculation('adults').sum());
	const sum_kids = $derived(table.createCalculation('kids').sum());
	// get sum of people for each distinct chakra
	const distinct = $derived.by(() => {
		return table.createCalculation('chakra').distinct({ sort: ['count', 'desc'] });
	});
	const chakras =
		'Jagannath Puri, Ram keli, Simantha, Kola, Sri Kashi Dham, Ekachakra, Godruma, Sri Adi Kesava Dham, Ritu, Mamgachi, Modadruma, Pundarik Dham, Ayodhya, Guruvayoor Dham, Keturi Dham, Srivas Angan, Rudra, Antar dwip, Radhakund, Nawadwip, Badrika Ashram, Sri Ranga Dham Chakra, Nilachal, Prayag, Ahobilam, Madhya, Govardhan Giri, Gupta Gokul dham, Janu Dwip, Ananta Padmanaba, Sri Punarthirtha Dham';
	const chakraList = chakras.split(', ');

	chakraList.sort();

	let mod_chakraList = chakraList
		.map((chakra) => {
			if (chakra === 'Ram keli') {
				return 'Kheturi/Ramakeli';
			}
			if (chakra === 'Keturi Dham') {
				return null;
			}
			return chakra;
		})
		.filter((chakra) => chakra !== null);

	$inspect(data, table);
</script>

<!-- modal to show edit or delete -->
{#if selectedRow}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
		<div class="rounded-lg bg-white p-4 shadow-lg">
			<button
				class="absolute right-0 top-0 rounded-full border border-gray-500 p-1 text-sm text-gray-500"
				onclick={hideModal}
			>
				&times;
			</button>

			<!-- if form.messages have length greater than 0, display as list of errors -->
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
				method="POST"
				action="?/modify"
				use:enhance={() => {
					isModifying = true;
					return async ({ update, result }) => {
						await update();
						isModifying = false;
						if (result.status === 200) {
							console.log('first');
							hideModal();
							table.setPage(currentPage);
						}
					};
				}}
			>
				<input type="hidden" name="id" value={selectedRow.id} />
				<input type="hidden" name="mode" value={mode} />
				{#if mode === 'delete'}
					<h2 class="text-lg font-semibold">Are you sure?</h2>
					<p class="text-sm">You are about to delete the record.</p>
				{:else if mode === 'edit'}
					<h2 class="text-lg font-semibold">Edit Record</h2>
					<div class="space-y-2">
						<div>
							<label for="name" class="block text-sm">Name</label>
							<input
								type="text"
								id="name"
								name="name"
								class="w-full rounded border p-2"
								bind:value={selectedRow.name}
							/>
						</div>
						<div>
							<label for="chakra" class="block text-sm">Chakra</label>
							<select
								id="chakra"
								name="chakra"
								class="w-full rounded border p-2"
								bind:value={selectedRow.chakra}
							>
								{#each chakraList as chakra}
									<option value={chakra}>{chakra}</option>
								{/each}
							</select>
						</div>
						<div>
							<label for="mobile" class="block text-sm">Mobile</label>
							<input
								type="tel"
								id="mobile"
								name="mobile"
								class="w-full rounded border p-2"
								bind:value={selectedRow.mobile}
							/>
						</div>
						<div>
							<label for="plate" class="block text-sm">Plate</label>
							<input
								type="text"
								id="plate"
								name="plate"
								class="w-full rounded border p-2"
								bind:value={selectedRow.plate}
							/>
						</div>
						<div>
							<label for="adults" class="block text-sm">Adults</label>
							<input
								type="number"
								min="1"
								pattern="[0-9]*"
								id="adults"
								name="adults"
								class="w-full rounded border p-2"
								bind:value={selectedRow.adults}
							/>
						</div>
						<div>
							<label for="kids" class="block text-sm">Kids</label>
							<input
								type="number"
								min="0"
								pattern="[0-9]*"
								id="kids"
								name="kids"
								class="w-full rounded border p-2"
								bind:value={selectedRow.kids}
							/>
						</div>
					</div>
				{/if}
				<div class="mt-4 flex justify-end space-x-2">
					<button
						type="reset"
						class="rounded-lg border border-red-500 px-4 py-2 text-red-500"
						onclick={hideModal}
					>
						Cancel
					</button>
					<button
						disabled={isModifying}
						class="rounded-lg border border-blue-500 px-4 py-2 text-blue-500"
						type="submit"
					>
						{isModifying ? 'Updating...' : mode === 'delete' ? 'Delete' : 'Update'}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<!-- <nav class="flex justify-center space-x-4">
	<ul class="flex w-full">
		<li class="flex-1">
			<a
				href="/"
				class="block rounded-t-lg border-b-2 border-transparent px-4 py-2 text-center hover:border-blue-500 hover:text-blue-500"
			>
				Check In
			</a>
		</li>
		<li class="flex-1">
			<a
				href="/update"
				class="block rounded-t-lg border-b-2 border-blue-500 px-4 py-2 text-center text-blue-500"
			>
				Update
			</a>
		</li>
	</ul>
</nav> -->

<!-- wait for data to be poulated and then print table -->
{#await data}
	<p>Loading...</p>
{:then}
	<Datatable basic {table}>
		<table>
			<thead>
				<tr>
					<ThSort {table} field="name">Name</ThSort>
					<ThSort {table} field="chakra">Chakra</ThSort>
					<ThSort {table} field="mobile">Mobile</ThSort>
					<ThSort {table} field="plate">Plate</ThSort>
					<ThSort {table} field="people">No. of People</ThSort>
				</tr>
				<tr>
					<ThFilter {table} field="name" />
					<ThFilter {table} field="chakra" />
					<ThFilter {table} field="mobile" />
					<ThFilter {table} field="plate" />
					<ThFilter {table} field="people" />
				</tr>
			</thead>
			<tbody>
				{#each table.rows as row (row.id)}
					<tr>
						<td>{row.name}</td>
						<td>{row.chakra}</td>
						<td>{row.mobile}</td>
						<td>{row.plate}</td>
						<td>{row.adults}-A{row.kids ? `, ${row.kids}-K` : ''}</td>
						<td class="flex space-x-2">
							<button
								class="rounded-full border border-red-500 p-1 text-sm text-red-500"
								onclick={() => {
									showDelete(row);
									currentPage = table.currentPage;
								}}
							>
								<Trash2 />
							</button>
							<button
								class="rounded-full border border-blue-500 p-1 text-sm text-blue-500"
								onclick={() => {
									showEdit(row);
									currentPage = table.currentPage;
								}}
							>
								<Pencil />
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</Datatable>
{:catch error}
	<p>{error.message}</p>
{/await}

<div class="mt-4 flex justify-center space-x-4">
	<div class="rounded-lg border p-4 shadow-lg">
		<p class="text-lg font-semibold">Total People</p>
		<p class="text-2xl">{sum_people}</p>
	</div>
	<div class="rounded-lg border p-4 shadow-lg">
		<p class="text-lg font-semibold">Total Adults</p>
		<p class="text-2xl">{sum_adults}</p>
	</div>
	<div class="rounded-lg border p-4 shadow-lg">
		<p class="text-lg font-semibold">Total Kids</p>
		<p class="text-2xl">{sum_kids}</p>
	</div>
</div>

<!-- card to display Registrations per chakra -->
<div class="mt-4 rounded-lg border p-4 shadow-lg">
	<p class="text-lg font-semibold">Registrations per Chakra</p>
	<div class="mb-5 text-sm italic">A - Actual, R - Registered</div>
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
		{#each mod_chakraList as chakra}
			<div
				class={`rounded-lg border p-4 shadow-lg ${
					(chakrasSum[chakra]?.total ?? 0) > (reg_data[chakra]?.total ?? 0)
						? 'bg-red-400 text-white'
						: ''
				}`}
			>
				<p class="text-lg font-semibold">{chakra}</p>

				<p class="text-lg">
					A :
					{chakrasSum[chakra]?.total ?? 0} ({chakrasSum[chakra]?.adults ?? 0}-A, {chakrasSum[chakra]
						?.kids ?? 0}-K)
				</p>
				<p class="text-lg">
					R :
					{reg_data[chakra]?.total ?? 0} ({reg_data[chakra]?.adults ?? 0}-A, {reg_data[chakra]
						?.kids ?? 0}-K)
				</p>
			</div>
		{/each}
	</div>
</div>
