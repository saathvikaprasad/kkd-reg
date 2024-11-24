<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<!-- Add tabs to switch between two pages 'register' & 'checkout' -->
<div class="mx-auto max-w-4xl">
	{@render children()}
</div>
