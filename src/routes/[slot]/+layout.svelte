<script lang="ts">
	import '../../app.css';
	import { Toaster } from 'svelte-sonner';
	let { children } = $props();
</script>

<!-- Add tabs to switch between two pages 'register' & 'checkout' -->
<!-- header with full width, dark bg, title: Event Registration in center -->
<header class="bg-gray-800 py-4 text-white shadow-lg">
	<h1 class="mx-auto max-w-4xl px-4 text-xl font-semibold">KKD - Event Registration</h1>
</header>
<Toaster position="top-center" />
<div class="mx-auto max-w-4xl p-4">
	{@render children()}
</div>
