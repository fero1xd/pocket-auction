<script lang="ts">
	import type { Auction } from '$lib/types';

	export let auction: Auction;

	const categories = auction.categories.split(',');
	const name = auction.item_name;
	const image = auction.item_images[0];
	const description = auction.item_description;
	const now = new Date();
	const nowTime = now.getTime();
	const [startTime, endTime] = [
		new Date(auction.start_time).getTime(),
		new Date(auction.end_time).getTime()
	];

	const isLive = nowTime >= startTime && nowTime <= endTime;
	const inFuture = nowTime < startTime;
	const hasEnded = nowTime > endTime;
</script>

<div class="card card-compact lg:card-normal flex-shrink-0 w-full bg-base-100 h-full">
	<img src={image} alt={name} class="object-scale-down shrink-0 card_image" />
	<div class="card-body">
		<h2 class="card-title">
			{name}
			{#if isLive}
				<div class="badge badge-primary">Live</div>
			{:else if inFuture}
				<div class="badge badge-secondary">Not Started</div>
			{:else if hasEnded}
				<div class="badge badge-neutral">Ended</div>
			{/if}
		</h2>
		<p class="max-h-20 overflow-y-scroll prose mb-4">
			{description}
		</p>
		<div class="card-actions justify-end pb-2">
			{#each categories as category}
				<div class="badge badge-outline">{category}</div>
			{/each}
		</div>
	</div>
</div>
