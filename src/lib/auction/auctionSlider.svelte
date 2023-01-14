<script lang="ts">
	import type { Auction } from '$lib/types';
	import AuctionCard from './auctionCard.svelte';
	import { Swiper, SwiperSlide } from 'swiper/svelte';
	import { Pagination, Autoplay, Navigation } from 'swiper';
	export let items: Auction[];
</script>

<div class="flex relative">
	<Swiper
		pagination={{
			clickable: true,
			dynamicBullets: true
		}}
		modules={[Autoplay, Pagination]}
		slidesPerView={1}
		loop={true}
		autoplay={{
			delay: 2000,
			disableOnInteraction: false
		}}
		class="shadow-2xl rounded-xl w-[350px] h-[440px] lg:w-[400px] lg:h-[455px]"
	>
		<SwiperSlide class="bg-base-100 ">
			<AuctionCard auction={items[0]} />
		</SwiperSlide>
		<SwiperSlide class="bg-base-100 ">
			<AuctionCard auction={items[1]} />
		</SwiperSlide>
		<SwiperSlide class="bg-base-100 ">
			<AuctionCard auction={items[2]} />
		</SwiperSlide>
	</Swiper>
</div>
