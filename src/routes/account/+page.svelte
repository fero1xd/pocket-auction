<script lang="ts">
	import MyPage from '$lib/account/my/myPage.svelte';
	import Navigation from '$lib/account/navigation.svelte';
	import PasswordPage from '$lib/account/password/passwordPage.svelte';
	import PaymentPage from '$lib/account/payment/paymentPage.svelte';
	import Sidebar from '$lib/account/sidebar.svelte';
	let currentPage = 'my';

	export let data: { user: User };
	const { user } = data;
</script>

<div class="flex-1 w-full bg-base-100 flex items-center justify-center flex-col">
	<div class="container mx-auto flex-1 pt-5 pb-12 px-10 flex flex-col gap-10">
		<Navigation {currentPage} />

		<div class="w-full flex-1 flex items-stretch">
			<Sidebar bind:currentPage />
			<div class="divider divider-horizontal opacity-20" />

			{#if currentPage === 'my'}
				<MyPage {user} />
			{:else if currentPage === 'password'}
				<PasswordPage />
			{:else if currentPage === 'payment'}
				<PaymentPage />
			{/if}
		</div>
	</div>
</div>
