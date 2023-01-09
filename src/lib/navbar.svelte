<!-- svelte-ignore a11y-label-has-associated-control -->
<script lang="ts">
	import { page } from '$app/stores';
	import Link from './link.svelte';
	export let user: import('pocketbase').default['authStore']['model'];

	const handleLogout = (e: MouseEvent) => {
		e.preventDefault();
	};
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->

<nav class="navbar bg-base-100 shadow-md py-2 px-6 md:px-3 lg:px-2">
	<div class="container mx-auto">
		<div class="flex-1 ">
			<a
				href="/"
				class="btn normal-case text-sm md:text-md lg:text-lg font-bold {$page.route.id !== '/'
					? 'btn-ghost'
					: ''}">Pocket Auction</a
			>
		</div>

		<ul class="px-1 gap-3 items-center hidden md:flex lg:flex mr-3">
			<Link path={'/home'} active="primary">Home</Link>

			{#if !user}
				<li>
					<Link path={'/login'} active="primary">Login</Link>
				</li>
				<li>
					<Link path={'/register'} active="primary">Register</Link>
				</li>
			{/if}
			<Link path={'/about'} active="primary">About</Link>
		</ul>

		{#if user}
			<button class="dropdown dropdown-end">
				<label for="#" class="btn btn-ghost btn-circle avatar online">
					<div class="w-10 rounded-full">
						<img src={user?.avatarUrl} alt={user?.username} />
					</div>
				</label>

				<ul
					class="menu dropdown-content p-2 shadow-lg bg-base-100 rounded-box w-52 mt-5 normal-case menu-compact"
				>
					<li class="p-1">
						<a href="/account" class={$page.route.id === '/account' ? 'active' : ''}> Account </a>
					</li>
					<li class="p-1">
						<a href="/my-auctions" class={$page.route.id === '/my-auctions' ? 'active' : ''}
							>My Auctions</a
						>
					</li>
					<li class="p-1">
						<label for="my-modal">Logout</label>
					</li>
				</ul>
			</button>
		{:else}
			<div class="dropdown dropdown-end md:hidden lg:hidden">
				<label tabindex="0" class="btn btn-ghost m-1">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block w-5 h-5 stroke-current"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
						/></svg
					>
				</label>

				<ul
					tabindex="0"
					class="dropdown-content menu menu-compact p-2 shadow bg-base-100 rounded-box w-52 mt-2"
				>
					<li class="p-1">
						<a href="/login" class={$page.route.id === '/login' ? 'active' : ''}>Login</a>
					</li>
					<li class="p-1">
						<a href="/register" class={$page.route.id === '/register' ? 'active' : ''}>Register</a>
					</li>
					<li class="p-1">
						<a href="/home" class={$page.route.id === '/home' ? 'active' : ''}>Home</a>
					</li>
					<li class="p-1">
						<a href="/about" class={$page.route.id === '/about' ? 'active' : ''}>About</a>
					</li>
				</ul>
			</div>
		{/if}
	</div>
</nav>
