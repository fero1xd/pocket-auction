<script lang="ts">
	import AuctionSlider from '$lib/auction/auctionSlider.svelte';
	import type { Auction } from '$lib/types';

	export let data: { isAuth: boolean; items: Auction[] };
	const { isAuth, items } = data;
</script>

<div class="flex-1 w-full bg-base-100 flex items-center justify-center flex-col">
	<div
		class="w-full hero-content flex-col lg:flex-row lg:justify-between px-6 lg:px-3  mt-10 lg:mt-0"
	>
		<div>
			<h1 class="text-5xl font-bold">Welcome To Pocket Auction</h1>
			<p class="py-6 mb-5 prose">
				Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
				quasi. In deleniti eaque aut repudiandae et a id nisi.
			</p>
			<div class="flex gap-2">
				{#if isAuth}
					<a href="/home" class="btn btn-primary normal-case w-20">Home</a>
				{:else}
					<a href="/register" class="btn btn-primary normal-case">Get Started</a>
				{/if}
				<a href="/about" class="btn btn-neutral normal-case">About Us</a>
			</div>

			<div class="divider lg:hidden" />
		</div>

		<AuctionSlider {items} />
	</div>
</div>
