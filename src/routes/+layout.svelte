<script lang="ts">
	import '../app.css';
	import '../nprogress.css';

	import NProgress from 'nprogress';
	import Navbar from '../lib/navbar.svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;

	import { navigating } from '$app/stores';
	import LogoutModal from '$lib/logoutModal.svelte';

	NProgress.configure({});

	$: {
		if ($navigating) {
			NProgress.start();
		}
		if (!$navigating) {
			NProgress.done();
		}
	}
</script>

<main class="flex flex-col min-h-screen">
	<SvelteToast options={{ reversed: true, intro: { y: 192 } }} />
	<Navbar user={data?.user} />
	<slot />

	<LogoutModal />
</main>

<style>
	:root {
		--toastContainerTop: auto;
		--toastContainerRight: auto;
		--toastContainerBottom: 8rem;
		--toastContainerLeft: calc(50vw - 8rem);
	}
</style>
