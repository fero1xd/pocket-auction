<script lang="ts">
	import type { LayoutServerData, PageData } from './$types';

	export let data: LayoutServerData;
</script>

<div class="flex-1 w-full flex flex-col items-center justify-center">
	<h1>Home Page</h1>

	{#if data?.user}
		<h1 class="font-bold text-xl text-center">Your email is : {data?.user.email}</h1>
	{/if}
</div>
