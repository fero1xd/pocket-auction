<script lang="ts">
	import { page } from '$app/stores';

	export let path: string;
	export let active: string;
</script>

<a
	href={path}
	class="btn btn-sm md:btn-sm lg:btn-sm normal-case  {$page.route.id === path
		? `btn-${active}`
		: 'btn-ghost'}"
>
	<slot />
</a>
