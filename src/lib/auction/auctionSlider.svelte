<script lang="ts">
	import type { Auction } from '$lib/types';
	import AuctionCard from './auctionCard.svelte';

	let current = 0;

	const prevSlide = () => {
		const isFirstSlide = current === 0;
		const newIndex = isFirstSlide ? items.length - 1 : current - 1;
		current = newIndex;
	};
	const nextSlide = () => {
		const isLastSlide = current === items.length - 1;
		const newIndex = isLastSlide ? 0 : current + 1;
		current = newIndex;
	};

	export let items: Auction[];
</script>

<div class="flex relative p-5 lg:p-0">
	{#if current === 0}
		<AuctionCard auction={items[current]} />
	{:else if current === 1}
		<AuctionCard auction={items[current]} />
	{:else}
		<AuctionCard auction={items[current]} />
	{/if}
	<button
		class="btn btn-circle btn-sm lg:btn-md absolute top-[50%] -left-3 lg:-left-14 opacity-60 hover:opacity-100"
		on:click={prevSlide}>❮</button
	>
	<button
		class="btn btn-circle btn-sm lg:btn-md absolute top-[50%] -right-3 lg:-right-14 opacity-60 hover:opacity-100"
		on:click={nextSlide}>❯</button
	>
</div>
