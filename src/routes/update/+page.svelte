<script lang="ts">
	import { TableHandler, Datatable, ThSort, ThFilter, type Row } from '@vincjo/datatables';

	let { data }: { data: { rows: Row[] } } = $props();
	const table = new TableHandler(data.rows, { rowsPerPage: 10 });
	$inspect(data);
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
				href="/update"
				class="block rounded-t-lg border-b-2 border-blue-500 px-4 py-2 text-center text-blue-500"
			>
				Update
			</a>
		</li>
	</ul>
</nav>

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
						<td>{row.people}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</Datatable>
{:catch error}
	<p>{error.message}</p>
{/await}
